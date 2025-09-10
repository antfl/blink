<script setup lang="ts">
import { ExpandOutlined, CompressOutlined } from '@ant-design/icons-vue';
import { useFullscreen } from '@vueuse/core';

const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <component @click="toggle" :is="isFullscreen ? CompressOutlined : ExpandOutlined" />
</template>
