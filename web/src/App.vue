<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import Layout from "@/layout/Layout.vue";
const themeConfig = {
  borderRadius: 2,
}
</script>

<template>
  <a-config-provider :theme="themeConfig" :locale="zhCN">
    <Layout/>
  </a-config-provider>
</template>
