<script setup lang="ts">
import Navbar from '@/layout/Navbar/index.vue'
import ViewFooter from '@/layout/ViewFooter/index.vue'
</script>

<template>
  <a-layout>
    <a-layout-header>
      <Navbar/>
    </a-layout-header>
    <a-layout>
      <a-layout-content>
        <div class="h-[calc(100vh_-_var(--header-height))] overflow-x-hidden overflow-y-auto">
          <RouterView/>
          <ViewFooter/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
