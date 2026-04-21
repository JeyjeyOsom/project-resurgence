<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { guidelinesApi } from '@/api'
import type { BrandGuideline } from '@/types'

const props = defineProps<{ brandId?: string }>()
const route = useRoute()
const brandId = props.brandId ?? (route.params.id as string)

const tone = ref('professional')
const bannedWords = ref<string[]>([])
const preferredPhrases = ref<string[]>([])
const newBanned = ref('')
const newPreferred = ref('')
const saving = ref(false)
const saved = ref(false)
const error = ref<string | null>(null)

const toneOptions = ['professional', 'formal', 'playful', 'friendly', 'casual', 'bold', 'empathetic']

onMounted(async () => {
  try {
    const guidelines: BrandGuideline = await guidelinesApi.get(brandId)
    tone.value = guidelines.tone
    bannedWords.value = guidelines.bannedWords
    preferredPhrases.value = guidelines.preferredPhrases
  } catch {
    // Guidelines don't exist yet — start with defaults
  }
})

function addBanned() {
  const word = newBanned.value.trim()
  if (word && !bannedWords.value.includes(word)) {
    bannedWords.value.push(word)
  }
  newBanned.value = ''
}

function removeBanned(word: string) {
  bannedWords.value = bannedWords.value.filter((w) => w !== word)
}

function addPreferred() {
  const phrase = newPreferred.value.trim()
  if (phrase && !preferredPhrases.value.includes(phrase)) {
    preferredPhrases.value.push(phrase)
  }
  newPreferred.value = ''
}

function removePreferred(phrase: string) {
  preferredPhrases.value = preferredPhrases.value.filter((p) => p !== phrase)
}

async function save() {
  saving.value = true
  error.value = null
  saved.value = false
  try {
    await guidelinesApi.upsert(brandId, {
      tone: tone.value,
      bannedWords: bannedWords.value,
      preferredPhrases: preferredPhrases.value,
    })
    saved.value = true
    setTimeout(() => (saved.value = false), 2500)
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-xl p-6 max-w-2xl">
    <h2 class="text-base font-semibold text-gray-800 mb-6">Brand Guidelines</h2>

    <!-- Tone -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Tone of Voice</label>
      <select
        v-model="tone"
        class="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option v-for="t in toneOptions" :key="t" :value="t">
          {{ t.charAt(0).toUpperCase() + t.slice(1) }}
        </option>
      </select>
    </div>

    <!-- Banned words -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Banned Words</label>
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="word in bannedWords"
          :key="word"
          class="inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 rounded-full px-3 py-0.5 text-xs"
        >
          {{ word }}
          <button class="ml-1 hover:text-red-900" @click="removeBanned(word)">×</button>
        </span>
        <span v-if="!bannedWords.length" class="text-xs text-gray-400">No banned words yet</span>
      </div>
      <div class="flex gap-2">
        <input
          v-model="newBanned"
          type="text"
          placeholder="Add a banned word…"
          class="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500"
          @keyup.enter="addBanned"
        />
        <button
          class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors"
          @click="addBanned"
        >
          Add
        </button>
      </div>
    </div>

    <!-- Preferred phrases -->
    <div class="mb-8">
      <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Phrases</label>
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="phrase in preferredPhrases"
          :key="phrase"
          class="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-0.5 text-xs"
        >
          {{ phrase }}
          <button class="ml-1 hover:text-green-900" @click="removePreferred(phrase)">×</button>
        </span>
        <span v-if="!preferredPhrases.length" class="text-xs text-gray-400">No preferred phrases yet</span>
      </div>
      <div class="flex gap-2">
        <input
          v-model="newPreferred"
          type="text"
          placeholder="Add a preferred phrase…"
          class="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500"
          @keyup.enter="addPreferred"
        />
        <button
          class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors"
          @click="addPreferred"
        >
          Add
        </button>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-4">
      <button
        class="bg-indigo-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        :disabled="saving"
        @click="save"
      >
        {{ saving ? 'Saving…' : 'Save Guidelines' }}
      </button>
      <span v-if="saved" class="text-sm text-green-600">✓ Saved</span>
      <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
    </div>
  </div>
</template>
