<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useBrandStore } from '@/stores/brand'

const brandStore = useBrandStore()
const newName = ref('')
const editingId = ref<string | null>(null)
const editName = ref('')
const showCreate = ref(false)

onMounted(() => brandStore.fetchBrands())

async function handleCreate() {
  if (!newName.value.trim()) return
  await brandStore.createBrand(newName.value.trim())
  newName.value = ''
  showCreate.value = false
}

function startEdit(id: string, name: string) {
  editingId.value = id
  editName.value = name
}

async function handleUpdate() {
  if (!editingId.value || !editName.value.trim()) return
  await brandStore.updateBrand(editingId.value, editName.value.trim())
  editingId.value = null
}

async function handleDelete(id: string, name: string) {
  if (!confirm(`Delete brand "${name}"? This cannot be undone.`)) return
  await brandStore.deleteBrand(id)
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Brands</h1>
      <button
        class="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        @click="showCreate = !showCreate"
      >
        + New Brand
      </button>
    </div>

    <!-- Create form -->
    <div v-if="showCreate" class="bg-white border border-gray-200 rounded-xl p-5 mb-6">
      <h2 class="text-sm font-semibold text-gray-700 mb-3">Create brand</h2>
      <form class="flex gap-3" @submit.prevent="handleCreate">
        <input
          v-model="newName"
          type="text"
          placeholder="Brand name"
          class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          autofocus
        />
        <button
          type="submit"
          class="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Create
        </button>
        <button
          type="button"
          class="text-sm text-gray-500 hover:text-gray-700"
          @click="showCreate = false"
        >
          Cancel
        </button>
      </form>
    </div>

    <!-- Error -->
    <div v-if="brandStore.error" class="text-sm text-red-600 mb-4">{{ brandStore.error }}</div>

    <!-- Loading -->
    <div v-if="brandStore.loading" class="text-center py-12 text-gray-400">Loading…</div>

    <!-- List -->
    <div v-else-if="brandStore.brands.length" class="space-y-3">
      <div
        v-for="brand in brandStore.brands"
        :key="brand.id"
        class="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
      >
        <!-- Edit inline -->
        <div v-if="editingId === brand.id" class="flex gap-2 flex-1">
          <input
            v-model="editName"
            type="text"
            class="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500"
            @keyup.escape="editingId = null"
          />
          <button class="text-sm text-indigo-600 hover:text-indigo-800" @click="handleUpdate">
            Save
          </button>
          <button class="text-sm text-gray-400 hover:text-gray-600" @click="editingId = null">
            Cancel
          </button>
        </div>

        <template v-else>
          <div>
            <p class="font-medium text-gray-900">{{ brand.name }}</p>
            <p class="text-xs text-gray-400 mt-0.5">
              Created {{ new Date(brand.createdAt).toLocaleDateString() }}
            </p>
          </div>

          <div class="flex items-center gap-3">
            <RouterLink
              :to="`/brands/${brand.id}/guidelines`"
              class="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Open →
            </RouterLink>
            <RouterLink
              :to="`/brands/${brand.id}/check`"
              class="text-sm text-gray-500 hover:text-gray-700"
            >
              Check
            </RouterLink>
            <button
              class="text-sm text-gray-400 hover:text-gray-600"
              @click="startEdit(brand.id, brand.name)"
            >
              Rename
            </button>
            <button
              class="text-sm text-red-400 hover:text-red-600"
              @click="handleDelete(brand.id, brand.name)"
            >
              Delete
            </button>
          </div>
        </template>
      </div>
    </div>

    <div v-else class="text-center py-16 text-gray-400">
      <p class="text-lg mb-2">No brands yet.</p>
      <p class="text-sm">Click "New Brand" to get started.</p>
    </div>
  </div>
</template>
