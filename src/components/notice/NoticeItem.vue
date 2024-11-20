<script setup>
defineProps({
  notice: {
    type: Object,
    required: true
  }
});

defineEmits(['toggle']);
</script>

<template>
  <div class="notice-item">
    <div
      class="notice-header flex justify-between items-center cursor-pointer py-3 px-5 border-b border-gray-200"
      @click="$emit('toggle')"
    >
      <span class="notice-title text-m font-semibold text-gray-700">{{ notice.title }}</span>
      <span class="notice-date text-sm text-gray-500 pr-8">{{ notice.date }}</span>
    </div>
    <div
      v-if="notice.isOpen"
      class="notice-content text-sm text-gray-600 px-7 bg-[#fafafa] py-5"
    >
      {{ notice.content }}
    </div>
  </div>
</template>
