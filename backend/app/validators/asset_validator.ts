import vine from '@vinejs/vine'

export const storeAssetValidator = vine.compile(
  vine.object({
    fileType: vine.string().trim().optional(),
  })
)

export const updateAssetValidator = vine.compile(
  vine.object({
    tags: vine.array(vine.string().trim()).optional(),
    fileType: vine.string().trim().optional(),
  })
)
