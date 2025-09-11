import { defineStore } from 'pinia'
import request from '@/utils/request'

interface Paste {
    id: string
    content: string
    created: string
    expires: string
}

interface PasteState {
    currentPaste: Paste | null
    loading: boolean
    error: string | null
}

export const usePasteStore = defineStore('paste', {
    state: (): PasteState => ({
        currentPaste: null,
        loading: false,
        error: null
    }),
    actions: {
        async createPaste(content: string, expiresIn: number) {
            this.loading = true
            this.error = null

            try {
                const response = await request.post('/api/create', {
                    content,
                    expiresIn
                })

                if (response.data.success) {
                    this.currentPaste = {
                        id: response.data.id,
                        content,
                        created: new Date().toISOString(),
                        expires: new Date(Date.now() + expiresIn * 1000).toISOString()
                    }
                } else {
                    this.error = response.data.error || '创建失败'
                }
            } catch (error: any) {
                this.error = error.response?.data?.error || error.message || '创建失败'
            } finally {
                this.loading = false
            }
        },

        async fetchPaste(id: string) {
            this.loading = true
            this.error = null

            try {
                const response = await request.get(`/api/raw/${id}`)
                this.currentPaste = response.data
            } catch (error: any) {
                this.error = error.response?.data?.error || error.message || '获取失败'
            } finally {
                this.loading = false
            }
        },

        clearPaste() {
            this.currentPaste = null
        }
    }
})