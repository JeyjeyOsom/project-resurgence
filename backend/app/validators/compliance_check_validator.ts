import vine from '@vinejs/vine'

export const createComplianceCheckValidator = vine.compile(
  vine.object({
    inputText: vine.string().trim().minLength(1).maxLength(10000),
  })
)
