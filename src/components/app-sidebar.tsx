import * as React from 'react'
import {
  IconHelp,
  IconInnerShadowTop,
  // IconSearch,
  IconSettings,
  IconPhoto,
  IconPlus,
} from '@tabler/icons-react'

import { NavSecondary } from '@/components/nav-secondary'
// import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
} from '@/components/ui/sidebar'
import { FolderManagerDialog } from '@/components/FolderManagerDialog'

const data = {
  // user: {
  //   name: 'shadcn',
  //   email: 'm@example.com',
  //   avatar: '/avatars/shadcn.jpg',
  // },
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Library group */}
        <SidebarGroup>
          <SidebarGroupLabel>Library</SidebarGroupLabel>
          {/* Plus icon opens folder manager */}
          <FolderManagerDialog>
            <SidebarGroupAction asChild>
              <button type="button">
                <IconPlus className="size-4" />
              </button>
            </SidebarGroupAction>
          </FolderManagerDialog>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="All Photos">
                  <IconPhoto />
                  <span>All Photos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings & Help */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  )
}
