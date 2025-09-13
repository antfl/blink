<script setup lang="ts">
import {QrcodeOutlined} from '@ant-design/icons-vue'
import groupChart from '@/assets/images/group-chart.png'
</script>

<template>
  <a-popover>
    <template #content>
      <a href="https://qm.qq.com/q/mRoVzmHej6" target="_blank">
        <img class="w-200px" :src="groupChart" alt="群号：557974166"/>
      </a>
    </template>
    <QrcodeOutlined/>
  </a-popover>
</template>