import { createHashRouter } from '@vkontakte/vk-mini-apps-router'

const routers = [
  {
    path: '/',
    panel: 'main_panel',
    view: 'main_view',
  },
  {
    path: '/category/:alias',
    panel: 'category_panel',
    view: 'main_view',
  },
  {
    path: '/admin',
    panel: 'admin_panel',
    view: 'main_view',
  },
  {
    path: '/admin/categories',
    panel: 'admin_categories_panel',
    view: 'main_view',
  },
  {
    path: '/admin/sounds',
    panel: 'admin_sounds_panel',
    view: 'main_view',
  },
  {
    path: '/admin/sounds/:id',
    panel: 'admin_sound_item_panel',
    view: 'main_view',
  },
]

const router = createHashRouter(routers)

export default router
