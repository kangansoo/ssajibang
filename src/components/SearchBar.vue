<script setup>

</script>

<template>
  <label class="flex flex-col min-w-40 !h-10 max-w-64">
    <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
      <div class="text-[#8a7360] flex border-none bg-[#f5f2f0] items-center justify-center pl-4 rounded-l-xl border-r-0">
        <!-- Search icon -->
      </div>
      <input placeholder="Search" class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181411] focus:outline-0 focus:ring-0 border-none bg-[#f5f2f0] focus:border-none h-full placeholder:text-[#8a7360] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" v-model="searchQuery" />
    </div>
  </label>
</template>

<style scoped></style>
