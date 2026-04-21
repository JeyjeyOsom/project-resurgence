import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { brandsApi } from '@/api'
import type { Brand } from '@/types'

export const useBrandStore = defineStore('brand', () => {
  const brands = ref<Brand[]>([])
  const activeBrandId = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const activeBrand = computed(() => brands.value.find((b) => b.id === activeBrandId.value) ?? null)

  async function fetchBrands() {
    loading.value = true
    error.value = null
    try {
      brands.value = await brandsApi.list()
      if (!activeBrandId.value && brands.value.length > 0) {
        activeBrandId.value = brands.value[0].id
      }
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  async function fetchBrand(id: string) {
    loading.value = true
    error.value = null
    try {
      const brand = await brandsApi.get(id)
      const index = brands.value.findIndex((b) => b.id === id)
      if (index !== -1) {
        brands.value[index] = brand
      } else {
        brands.value.push(brand)
      }
      return brand
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  async function createBrand(name: string) {
    loading.value = true
    error.value = null
    try {
      const brand = await brandsApi.create({ name })
      brands.value.push(brand)
      activeBrandId.value = brand.id
      return brand
    } catch (err) {
      error.value = (err as Error).message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateBrand(id: string, name: string) {
    error.value = null
    try {
      const brand = await brandsApi.update(id, { name })
      const index = brands.value.findIndex((b) => b.id === id)
      if (index !== -1) brands.value[index] = brand
      return brand
    } catch (err) {
      error.value = (err as Error).message
      throw err
    }
  }

  async function deleteBrand(id: string) {
    error.value = null
    try {
      await brandsApi.remove(id)
      brands.value = brands.value.filter((b) => b.id !== id)
      if (activeBrandId.value === id) {
        activeBrandId.value = brands.value[0]?.id ?? null
      }
    } catch (err) {
      error.value = (err as Error).message
      throw err
    }
  }

  function setActiveBrand(id: string) {
    activeBrandId.value = id
  }

  return {
    brands,
    activeBrandId,
    activeBrand,
    loading,
    error,
    fetchBrands,
    fetchBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    setActiveBrand,
  }
})
