<script setup lang="ts">
import Fullscreen from '@/layout/Navbar/components/Fullscreen.vue';
import Github from '@/layout/Navbar/components/Github.vue';
import Reload from '@/layout/Navbar/components/Reload.vue';
import logoPath from '@/assets/images/logo.jpg';

</script>

<template>
  <div class="flex items-center justify-between px-20px">
    <div class="flex items-center">
      <h1 class="flex items-center">
        <img
          class="size-28px rounded-5px hidden md:inline-block align-text-top"
          :src="logoPath"
          alt="Blink"
        />
        <span class="ml-8px font-size-20px">
          <span>Blink</span>
        </span>
      </h1>
    </div>
    <div class="flex items-center">
      <a-space class="hidden lg:flex font-size-18px" :size="32">
        <Github />
        <Reload />
        <Fullscreen />
      </a-space>
    </div>
  </div>
</template>
