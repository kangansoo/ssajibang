<script setup>
  const listings = [
      { id: 1, image: "https://cdn.usegalileo.ai/sdxl10/be2cccbe-3272-4116-b725-2cd5cbc9a8f5.png", details: "$1.5M • 3bd • 2ba • 1,800 sqft" },
      { id: 2, image: "https://cdn.usegalileo.ai/sdxl10/ed3a249d-88e7-4a52-b504-9dd9ba7378f6.png", details: "$2.1M • 4bd • 3ba • 2,200 sqft" },
      { id: 3, image: "https://cdn.usegalileo.ai/sdxl10/1ebf5af0-a85a-47fb-a8b4-80053664e92a.png", details: "$1.2M • 2bd • 1ba • 1,200 sqft" },
      { id: 4, image: "https://cdn.usegalileo.ai/sdxl10/7597cd39-e530-4ff9-abb0-100dcfc428e8.png", details: "$1.8M • 5bd • 4ba • 3,000 sqft" },
    ]
</script>


<template>
  <div>
    <h2 class="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Featured Listings</h2>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
      <div v-for="listing in listings" :key="listing.id" class="flex flex-col gap-3 pb-3">
        <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl" :style="{ backgroundImage: `url('${listing.image}')` }"></div>
        <p class="text-[#181411] text-base font-medium leading-normal">{{ listing.details }}</p>
      </div>
    </div>
    <div class="flex px-4 py-3 justify-end">
      <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f5f2f0] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em]">
        <span class="truncate">View all listings</span>
      </button>
    </div>
  </div>
</template>

