import vine from '@vinejs/vine'

export const createBrandValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
  })
)

export const updateBrandValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
  })
)
