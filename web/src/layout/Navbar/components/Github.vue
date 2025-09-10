<script setup lang="ts">
import { GithubOutlined } from '@ant-design/icons-vue';

// 定义代码仓库地址常量
const gitPathList = [
  {
    name: 'Github - Blink',
    path: 'https://github.com/antfl/blink',
  },
  {
    name: 'Gitee - Blink',
    path: 'https://gitee.com/antfl/blink',
  },
];

const handleMenuClick = (url: string) => {
  window.open(url, '_blank');
};
</script>

<template>
  <div class="flex items-center">
    <a-dropdown>
      <GithubOutlined class="text-lg cursor-pointer" />
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="item in gitPathList"
            :key="item.name"
            @click="handleMenuClick(item.path)"
          >
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
