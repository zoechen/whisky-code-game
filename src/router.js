import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path: "/", name: "Game", component: () => import("@/pages/Game.vue")},
  {path: "/rank", name: "Rank", component: () => import("@/pages/Rank.vue")},
  {path: "/match", name: "Match", component: () => import("@/pages/Match.vue")},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router