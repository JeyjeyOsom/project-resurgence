/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ListBrandsController = () => import('#controllers/brands/list_controller')
const CreateBrandController = () => import('#controllers/brands/create_controller')
const RetrieveBrandController = () => import('#controllers/brands/retrieve_controller')
const UpdateBrandController = () => import('#controllers/brands/update_controller')
const DeleteBrandController = () => import('#controllers/brands/delete_controller')

const RetrieveGuidelineController = () => import('#controllers/guidelines/retrieve_controller')
const UpsertGuidelineController = () => import('#controllers/guidelines/update_controller')

const ListAssetsController = () => import('#controllers/assets/list_controller')
const UploadAssetController = () => import('#controllers/assets/upload_controller')
const DownloadAssetController = () => import('#controllers/assets/download_controller')
const UpdateAssetController = () => import('#controllers/assets/update_controller')
const DeleteAssetController = () => import('#controllers/assets/delete_controller')

const ListComplianceChecksController = () =>
  import('#controllers/compliance_checks/list_controller')
const CreateComplianceCheckController = () =>
  import('#controllers/compliance_checks/create_controller')

router.get('/', () => ({ status: 'ok', service: 'brand-ai-api' }))

router
  .group(() => {
    // ── Brands ───────────────────────────────────────────────
    router.get('/brands', [ListBrandsController])
    router.post('/brands', [CreateBrandController])
    router.get('/brands/:id', [RetrieveBrandController])
    router.put('/brands/:id', [UpdateBrandController])
    router.delete('/brands/:id', [DeleteBrandController])

    // ── Guidelines (upsert + read) ────────────────────────────
    router.get('/brands/:brandId/guidelines', [RetrieveGuidelineController])
    router.post('/brands/:brandId/guidelines', [UpsertGuidelineController])

    // ── Assets ────────────────────────────────────────────────
    router.get('/brands/:brandId/assets', [ListAssetsController])
    router.post('/brands/:brandId/assets', [UploadAssetController])
    router.get('/assets/:id/download', [DownloadAssetController])
    router.put('/assets/:id', [UpdateAssetController])
    router.delete('/assets/:id', [DeleteAssetController])

    // ── Compliance Checks (append-only) ──────────────────────
    router.get('/brands/:brandId/checks', [ListComplianceChecksController])
    router.post('/brands/:brandId/check', [CreateComplianceCheckController])
  })
  .prefix('/api')
