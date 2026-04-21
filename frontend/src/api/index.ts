import axios from 'axios'
import type {
  Brand,
  BrandGuideline,
  Asset,
  ComplianceCheck,
  ComplianceCheckRequest,
  PaginatedResponse,
} from '@/types'

const client = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

import type { AxiosResponse, AxiosError } from 'axios'

client.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status
    const url = error.config?.url ?? ''
    if ((status === 503 || status === 500) && url.includes('/check')) {
      return Promise.reject(new Error('AI service is currently busy. Please try again in a moment.'))
    }
    const message = error.response?.data?.message ?? error.message ?? 'An unexpected error occurred'
    return Promise.reject(new Error(message))
  },
)

// ── Brands ──────────────────────────────────────────────────────────────────

export const brandsApi = {
  list: () => client.get<Brand[]>('/brands').then((r) => r.data),

  get: (id: string) => client.get<Brand>(`/brands/${id}`).then((r) => r.data),

  create: (payload: { name: string }) =>
    client.post<Brand>('/brands', payload).then((r) => r.data),

  update: (id: string, payload: { name: string }) =>
    client.put<Brand>(`/brands/${id}`, payload).then((r) => r.data),

  remove: (id: string) => client.delete(`/brands/${id}`),
}

// ── Guidelines ──────────────────────────────────────────────────────────────

export const guidelinesApi = {
  get: (brandId: string) =>
    client.get<BrandGuideline>(`/brands/${brandId}/guidelines`).then((r) => r.data),

  upsert: (
    brandId: string,
    payload: Pick<BrandGuideline, 'tone' | 'bannedWords' | 'preferredPhrases'>,
  ) => client.post<BrandGuideline>(`/brands/${brandId}/guidelines`, payload).then((r) => r.data),
}

// ── Assets ──────────────────────────────────────────────────────────────────

export const assetsApi = {
  list: (brandId: string, tag?: string) =>
    client
      .get<Asset[]>(`/brands/${brandId}/assets`, { params: tag ? { tag } : undefined })
      .then((r) => r.data),

  upload: (brandId: string, formData: FormData) =>
    client
      .post<Asset>(`/brands/${brandId}/assets`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data),

  update: (assetId: string, payload: { tags?: string[]; fileType?: string }) =>
    client.put<Asset>(`/assets/${assetId}`, payload).then((r) => r.data),

  remove: (assetId: string) => client.delete(`/assets/${assetId}`),

  downloadUrl: (assetId: string) => `/api/assets/${assetId}/download`,
}

// ── Compliance Checks ────────────────────────────────────────────────────────

export const checksApi = {
  run: (brandId: string, payload: ComplianceCheckRequest) =>
    client.post<ComplianceCheck>(`/brands/${brandId}/check`, payload).then((r) => r.data),

  history: (brandId: string, page = 1) =>
    client
      .get<PaginatedResponse<ComplianceCheck>>(`/brands/${brandId}/checks`, {
        params: { page },
      })
      .then((r) => r.data),
}
