export const SIDEBAR_MENU_ITEMS = ref([
  {
    header: '',
    items: [
      {
        title: 'Dashboard',
        to: 'home',
        prependIcon: 'tabler:layout-grid',
      },
    ],
  },
  {
    header: 'Master Data',
    items: [
      {
        title: 'Products',
        to: 'products',
        prependIcon: 'tabler:coffee',
      },
    ],
  },
] as ISidebarItem[])
