<script setup lang="ts">
import type { Brand } from '@/types'

defineProps<{ brands: Brand[]; modelValue: string | null }>()
const emit = defineEmits<{ 'update:modelValue': [id: string] }>()
</script>

<template>
  <select
    class="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    :value="modelValue"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-for="b in brands" :key="b.id" :value="b.id">{{ b.name }}</option>
  </select>
</template>
