<script setup lang="ts">
import { ref } from 'vue'
import FileUploadDropzone from '@/components/FileUploadDropzone.vue'

defineProps<{ visible: boolean; uploading: boolean }>()
const emit = defineEmits<{
  close: []
  submit: [payload: { file: File; tags: string[] }]
}>()

const selectedFile = ref<File | null>(null)
const tagsInput = ref('')

function handleFileSelected(file: File) {
  selectedFile.value = file
}

function handleSubmit() {
  if (!selectedFile.value) return
  const tags = tagsInput.value
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
  emit('submit', { file: selectedFile.value, tags })
}

function handleClose() {
  selectedFile.value = null
  tagsInput.value = ''
  emit('close')
}

function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) handleClose()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') handleClose()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        @click="handleBackdropClick"
        @keydown="handleKeydown"
      >
        <div
          class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <!-- Header -->
          <div class="flex items-center justify-between">
            <h2 id="modal-title" class="text-base font-semibold text-gray-800">Add Asset</h2>
            <button
              class="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
              @click="handleClose"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Dropzone (no auto-upload — we intercept the event) -->
          <div>
            <FileUploadDropzone :uploading="false" @file-selected="handleFileSelected" />
            <div
              v-if="selectedFile"
              class="mt-2 flex items-center gap-2 text-sm text-indigo-700 bg-indigo-50 rounded-lg px-3 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="truncate">{{ selectedFile.name }}</span>
              <button
                class="ml-auto shrink-0 text-indigo-400 hover:text-indigo-600"
                aria-label="Remove selected file"
                @click="selectedFile = null"
              >
                ×
              </button>
            </div>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-xs text-gray-500 mb-1">
              Tags (comma-separated, optional)
            </label>
            <input
              v-model="tagsInput"
              type="text"
              placeholder="e.g. logo, dark-mode, web"
              class="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 w-full"
              @keyup.enter="handleSubmit"
            />
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-3 pt-1">
            <button
              class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              @click="handleClose"
            >
              Cancel
            </button>
            <button
              :disabled="!selectedFile || uploading"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              @click="handleSubmit"
            >
              {{ uploading ? 'Uploading…' : 'Upload' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.15s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
