export const SIDEBAR_MENU_ITEMS = ref([
  {
    header: '',
    items: [
      {
        title: 'Dashboard',
        to: 'home',
        prependIcon: 'tabler:layout-grid',
      },
      {
        title: 'Orders',
        to: 'orders',
        prependIcon: 'mingcute:bill-2-line',
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
