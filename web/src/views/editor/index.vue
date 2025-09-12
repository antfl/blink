<script setup lang="ts">
import {ref, computed} from 'vue'
import {usePasteStore} from '@/store/pasteStore'
import {message} from "ant-design-vue";
import {MdEditor} from "@/components/Markdown";

const content = ref('')
const expiresIn = ref(86400)
const pasteStore = usePasteStore()

const paste = computed(() => pasteStore.currentPaste)
const loading = computed(() => pasteStore.loading)

const pasteUrl = computed(() => {
  return paste.value ? `${window.location.origin}/view/${paste.value.id}` : ''
})

const expiryText = computed(() => {
  const seconds = parseInt(expiresIn.value.toString())
  if (seconds < 60) return `${seconds}秒`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时`
  return `${Math.floor(seconds / 86400)}天`
})

async function createPaste() {
  if (!content.value.trim()) {
    message.error('请输入要分享的内容')
    return
  }
  await pasteStore.createPaste(content.value, expiresIn.value)
}

function copyUrl() {
  navigator.clipboard.writeText(pasteUrl.value)
  message.success('链接已复制到剪贴板')
}

function reset() {
  content.value = ''
  pasteStore.clearPaste()
}
</script>

<template>
  <div class="editor-container bg-#f9f9f9 p-10px">
    <MdEditor v-model="content"/>
    <a-flex class="mt-10px" justify="space-between">
      <div>
        <a-space v-if="paste">
          <a-input type="text" :value="pasteUrl" readonly/>
          <a-button type="dashed" @click="copyUrl">复制链接</a-button>
          <a-button @click="reset" type="primary" ghost>重新创建</a-button>
          <div class="color-#999 ml-16px">
            <span>提示：此链接将在</span>
            <a-tag :bordered="false" color="processing" class="mx-8px">{{ expiryText }}</a-tag>
            <span>后过期</span>
          </div>
        </a-space>
      </div>
      <a-space>
        <a-select class="w-100px" v-model:value="expiresIn">
          <a-select-option :value="3600">1小时</a-select-option>
          <a-select-option :value="86400">24小时</a-select-option>
          <a-select-option :value="604800">7天</a-select-option>
        </a-select>
        <a-button type="primary" @click="createPaste" :loading="loading">
          生成链接
        </a-button>
      </a-space>
    </a-flex>
  </div>
</template>

<style scoped lang="less">
.editor-container {
  :deep(.bytemd) {
    min-height: calc(100vh - 110px);
    z-index: 100;
  }
}
</style>