export interface Brand {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  guidelines?: BrandGuideline
  assets?: Asset[]
  complianceChecks?: ComplianceCheck[]
}

export interface BrandGuideline {
  id: string
  brandId: string
  tone: string
  bannedWords: string[]
  preferredPhrases: string[]
  createdAt: string
  updatedAt: string
}

export interface Asset {
  id: string
  brandId: string
  fileName: string
  filePath: string
  fileType: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface ComplianceCheck {
  id: string
  brandId: string
  inputText: string
  toneScore: number
  flaggedInconsistencies: string[]
  suggestions: string[]
  createdAt: string
}

export interface ComplianceCheckRequest {
  inputText: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
  }
}
