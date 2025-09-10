<script setup lang="ts">
import { SyncOutlined } from '@ant-design/icons-vue';

const reload = () => {
  window.location.reload();
};
</script>

<template>
  <SyncOutlined @click="reload" />
</template>
