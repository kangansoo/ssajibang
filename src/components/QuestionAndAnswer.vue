<script setup>
const questions = [
      { id: 1, avatar: "https://cdn.usegalileo.ai/stability/a7f41980-fa9b-48a9-8701-76906f01f828.png", text: "Is this property pet friendly?", askedBy: "Jessica", date: "10/12/2023" },
      { id: 2, avatar: "https://cdn.usegalileo.ai/stability/9f9d170f-b50b-4f1e-a90a-c00e4ab50e19.png", text: "What are the nearby schools?", askedBy: "Michael", date: "10/11/2023" },
      { id: 3, avatar: "https://cdn.usegalileo.ai/stability/2d343623-8434-4f2c-8a1a-d355ad63d951.png", text: "How is the traffic around this area?", askedBy: "Lisa", date: "10/10/2023" },
      { id: 4, avatar: "https://cdn.usegalileo.ai/stability/2c9e2cb1-7262-4674-b4a5-6af398d4f508.png", text: "What are the crime rates in this neighborhood?", askedBy: "David", date: "10/09/2023" },
    ]
</script>


<template>
  <div>
    <h2 class="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Questions & Answers</h2>
    <div v-for="question in questions" :key="question.id" class="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
      <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit" :style="{ backgroundImage: `url('${question.avatar}')` }"></div>
      <div class="flex flex-col justify-center">
        <p class="text-[#181411] text-base font-medium leading-normal line-clamp-1">{{ question.text }}</p>
        <p class="text-[#8a7360] text-sm font-normal leading-normal line-clamp-2">Asked by {{ question.askedBy }} on {{ question.date }}</p>
      </div>
    </div>
  </div>
</template>

