<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {usePasteStore} from '@/store/pasteStore'
import {MdViewer} from "@/components/Markdown";

const route = useRoute()
const pasteId = route.params.id as string
const pasteStore = usePasteStore()

const paste = computed(() => pasteStore.currentPaste)
const loading = computed(() => pasteStore.loading)
const error = computed(() => pasteStore.error)

onMounted(async () => {
  await pasteStore.fetchPaste(pasteId)
})

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString()
}
</script>

<template>
  <div class="m-8px min-h-500px">
    <div class="m-16px" v-if="paste">
      <a-tag :bordered="false" color="processing">生效中</a-tag>
      <span>创建时间：</span>
      <span class="color-#999">{{ formatDate(paste.created) }}</span>
      <span class="ml-16px">过期时间：</span>
      <span class="color-#999">{{ formatDate(paste.expires) }}</span>
    </div>
    <a-alert v-if="error" :message="error" type="error" show-icon/>
    <a-card class="min-h-100px" :loading="loading">
      <MdViewer v-if="paste" :content="paste.content"/>
    </a-card>
  </div>
</template>