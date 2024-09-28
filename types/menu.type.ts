export interface ISidebarMenuItem {
  title: string
  to: string
  prependIcon?: string
  appendIcon?: string
  children?: ISidebarMenuItem[]
}

export interface ISidebarItem {
  header?: string
  items: ISidebarMenuItem[]
}
