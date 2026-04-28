import vine from '@vinejs/vine'

export const updateGuidelineValidator = vine.compile(
  vine.object({
    tone: vine.string().trim().minLength(1).maxLength(100),
    bannedWords: vine.array(vine.string().trim()).optional(),
    preferredPhrases: vine.array(vine.string().trim()).optional(),
  })
)
