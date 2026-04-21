import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import BrandsView from '@/views/BrandsView.vue'
import BrandDetailView from '@/views/BrandDetailView.vue'
import ComplianceTesterView from '@/views/ComplianceTesterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/brands',
      name: 'brands',
      component: BrandsView,
    },
    {
      path: '/brands/:id',
      name: 'brand-detail',
      component: BrandDetailView,
      children: [
        {
          path: '',
          redirect: (to) => ({ path: `/brands/${to.params.id}/guidelines` }),
        },
        {
          path: 'guidelines',
          name: 'brand-guidelines',
          component: () => import('@/views/tabs/GuidelinesTab.vue'),
        },
        {
          path: 'assets',
          name: 'brand-assets',
          component: () => import('@/views/tabs/AssetsTab.vue'),
        },
        {
          path: 'checks',
          name: 'brand-checks',
          component: () => import('@/views/tabs/ChecksTab.vue'),
        },
      ],
    },
    {
      path: '/brands/:id/check',
      name: 'compliance-tester',
      component: ComplianceTesterView,
    },
  ],
})

export default router
