<!-- components/ToggleMenu.vue -->
<template>
  <div class="toggle-menu h-full bg-white p-4 shadow-lg">
    <!-- 메뉴 아이템들 -->
    <ul>
      <li class="py-2">메뉴 항목 1</li>
      <li class="py-2">메뉴 항목 2</li>
      <li class="py-2">메뉴 항목 3</li>
    </ul>
  </div>
</template>

<script setup>
// 필요한 로직 추가
</script>

<style scoped>
.toggle-menu {
  width: 300px;
  transition: transform 0.3s ease;
}
</style>
