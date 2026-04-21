<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ uploading?: boolean }>()
const emit = defineEmits<{ 'file-selected': [file: File] }>()

const fileInput = ref<HTMLInputElement | null>(null)
const dragOver = ref(false)

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  dragOver.value = true
}

function handleDragLeave() {
  dragOver.value = false
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  dragOver.value = false
  const files = e.dataTransfer?.files
  if (files?.length) emit('file-selected', files[0])
}

function handleFileInput(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files?.length) {
    emit('file-selected', files[0])
    ;(e.target as HTMLInputElement).value = ''
  }
}
</script>

<template>
  <div
    class="border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-colors cursor-pointer"
    :class="dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    @click="fileInput?.click()"
  >
    <input ref="fileInput" type="file" class="hidden" accept="*/*" @change="handleFileInput" />
    <div v-if="uploading" class="text-indigo-600 text-sm">Uploading…</div>
    <div v-else>
      <p class="text-gray-500 text-sm">
        <span class="text-indigo-600 font-medium">Click to upload</span> or drag & drop
      </p>
      <p class="text-xs text-gray-400 mt-1">Logos, typography, documents, color swatches</p>
    </div>
  </div>
</template>
