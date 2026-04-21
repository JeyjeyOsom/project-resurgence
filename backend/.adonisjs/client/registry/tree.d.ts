/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  listBrands: typeof routes['list_brands']
  createBrand: typeof routes['create_brand']
  retrieveBrand: typeof routes['retrieve_brand']
  updateBrand: typeof routes['update_brand']
  deleteBrand: typeof routes['delete_brand']
  retrieveGuideline: typeof routes['retrieve_guideline']
  upsertGuideline: typeof routes['upsert_guideline']
  listAssets: typeof routes['list_assets']
  uploadAsset: typeof routes['upload_asset']
  downloadAsset: typeof routes['download_asset']
  updateAsset: typeof routes['update_asset']
  deleteAsset: typeof routes['delete_asset']
  listComplianceChecks: typeof routes['list_compliance_checks']
  createComplianceCheck: typeof routes['create_compliance_check']
}
