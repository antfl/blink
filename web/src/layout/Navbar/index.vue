<script setup lang="ts">
import logoPath from '@/assets/images/logo.jpg';

import Fullscreen from '@/layout/Navbar/components/Fullscreen.vue';
import Github from '@/layout/Navbar/components/Github.vue';
import Reload from '@/layout/Navbar/components/Reload.vue';
import GroupChat from "@/layout/Navbar/components/GroupChat.vue";

</script>

<template>
  <div class="flex items-center justify-between px-20px">
    <div class="flex items-center">
      <h1 class="flex items-center font-500">
        <img
          class="size-24px rounded-3px align-text-top"
          :src="logoPath"
          alt="Blink"
        />
        <span class="ml-12px font-size-20px">
          <span>Blink</span>
        </span>
      </h1>
    </div>
    <div class="flex items-center">
      <a-space class="hidden lg:flex font-size-16px" :size="32">
        <GroupChat />
        <Github />
        <Reload />
        <Fullscreen />
      </a-space>
    </div>
  </div>
</template>
