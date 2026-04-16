import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import type { Schema } from '@google/generative-ai'
import env from '#start/env'
import type BrandGuideline from '#models/brand_guideline'

interface ComplianceResult {
  toneScore: number
  flaggedInconsistencies: string[]
  suggestions: string[]
}

const responseSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    toneScore: {
      type: SchemaType.NUMBER,
      description: 'Brand tone compliance score from 0 to 100',
    },
    flaggedInconsistencies: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'List of specific issues found in the text',
    },
    suggestions: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'Actionable suggestions to improve brand compliance',
    },
  },
  required: ['toneScore', 'flaggedInconsistencies', 'suggestions'],
}

export default class GeminiService {
  private readonly model

  constructor() {
    const genAI = new GoogleGenerativeAI(env.get('GEMINI_API_KEY'))
    this.model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema,
      },
    })
  }

  async checkCompliance(
    inputText: string,
    guidelines: BrandGuideline | null
  ): Promise<ComplianceResult> {
    const guidelinesContext = guidelines
      ? `Brand Guidelines:
- Desired tone: ${guidelines.tone}
- Banned words (must NOT appear): ${guidelines.bannedWords.length ? guidelines.bannedWords.join(', ') : 'none'}
- Preferred phrases (should use): ${guidelines.preferredPhrases.length ? guidelines.preferredPhrases.join(', ') : 'none'}`
      : 'No brand guidelines configured. Evaluate for general professional tone and clarity.'

    const prompt = `You are a brand compliance expert. Evaluate the following content against brand guidelines.

${guidelinesContext}

Content to evaluate:
"""
${inputText}
"""

Instructions:
1. Score the tone compliance from 0-100 (100 = perfectly on-brand)
2. Flag any specific inconsistencies (use of banned words, tone mismatches, etc.)
3. Provide 2-4 actionable, specific suggestions to improve brand alignment

Respond with a JSON object matching the schema.`

    const maxRetries = 3
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.model.generateContent(prompt)
        const text = result.response.text()
        const parsed = JSON.parse(text) as ComplianceResult

        // Clamp score between 0 and 100
        parsed.toneScore = Math.min(100, Math.max(0, Math.round(parsed.toneScore)))

        return parsed
      } catch (err) {
        lastError = err as Error
        const isRateLimit = lastError.message.includes('429') || lastError.message.includes('quota')

        if (isRateLimit && attempt < maxRetries) {
          // Exponential backoff: 1s, 2s, 4s
          await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** (attempt - 1)))
          continue
        }
        break
      }
    }

    // Fallback when Gemini is unavailable — return neutral result
    console.error('GeminiService error:', lastError?.message)
    return {
      toneScore: 50,
      flaggedInconsistencies: ['AI analysis unavailable — please try again later.'],
      suggestions: ['Ensure your content aligns with the configured brand tone and guidelines.'],
    }
  }
}
