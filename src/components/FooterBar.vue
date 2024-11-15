<script setup>
  const links = ["About", "How it works", "Careers", "Feedback", "Terms", "Privacy"]
</script>

<template>
  <footer class="flex justify-center">
    <div class="flex max-w-[960px] flex-1 flex-col">
      <footer class="flex flex-col gap-6 px-5 py-10 text-center @container">
        <div class="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
          <a v-for="link in links" :key="link" class="text-[#8a7360] text-base font-normal leading-normal min-w-40" href="#">{{ link }}</a>
        </div>
      </footer>
    </div>
  </footer>
</template>


