import {createRouter, createWebHistory} from 'vue-router'
import Editor from '@/views/editor/index.vue'
import Viewer from '@/views/viewer/index.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Editor',
            component: Editor
        },
        {
            path: '/view/:id',
            name: 'Viewer',
            component: Viewer,
            props: true
        }
    ]
})

export default router