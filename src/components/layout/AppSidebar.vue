<template>
  <aside :class="[
    'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-gradient-to-r from-indigo-100 via-white to-purple-100 dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-99999 border-r border-gray-200',
    {
      'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
      'lg:w-[90px]': !isExpanded && !isHovered,
      'translate-x-0 w-[290px]': isMobileOpen,
      '-translate-x-full': !isMobileOpen,
      'lg:translate-x-0': true,
    },
  ]" @mouseenter="!isExpanded && (isHovered = true)" @mouseleave="isHovered = false">
    <div :class="[
      'py-8 flex',
      !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
    ]">
      <router-link to="/">
        <img v-if="isExpanded || isHovered || isMobileOpen" class="dark:hidden hidden md:flex"
          src="/images/logo/logo.png" alt="Logo" width="150" height="40" />
        <!-- <img v-if="isExpanded || isHovered || isMobileOpen" class="hidden dark:block" src="/images/logo/logo-dark.svg"
          alt="Logo" width="150" height="40" /> -->

      </router-link>
    </div>
    <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <div v-for="(menuGroup, groupIndex) in menuGroups" :key="groupIndex">
            <h2 :class="[
              'mb-4 text-xs uppercase flex leading-[20px] text-gray-400',
              !isExpanded && !isHovered
                ? 'lg:justify-center'
                : 'justify-start',
            ]">
              <template v-if="isExpanded || isHovered || isMobileOpen">
                {{ menuGroup.title }}
              </template>
              <HorizontalDots v-else />
            </h2>
            <ul class="flex flex-col gap-4">
              <li v-for="(item, index) in menuGroup.items" :key="item.name">
                <button v-if="item.subItems" @click="toggleSubmenu(groupIndex, index)" :class="[
                  'menu-item group w-full',
                  {
                    'menu-item-active': isSubmenuOpen(groupIndex, index),
                    'menu-item-inactive': !isSubmenuOpen(groupIndex, index),
                  },
                  !isExpanded && !isHovered
                    ? 'lg:justify-center'
                    : 'lg:justify-start',
                ]">
                  <span :class="[
                    isSubmenuOpen(groupIndex, index)
                      ? 'menu-item-icon-active'
                      : 'menu-item-icon-inactive',
                  ]">
                    <component :is="item.icon" />
                  </span>
                  <span v-if="isExpanded || isHovered || isMobileOpen" class="menu-item-text">{{ item.name }}</span>
                  <ChevronDownIcon v-if="isExpanded || isHovered || isMobileOpen" :class="[
                    'ml-auto w-5 h-5 transition-transform duration-200',
                    {
                      'rotate-180 text-brand-500': isSubmenuOpen(
                        groupIndex,
                        index
                      ),
                    },
                  ]" />
                </button>
                <router-link v-else-if="item.path" :to="item.path" :class="[
                  'menu-item group',
                  {
                    'menu-item-active': isActive(item.path),
                    'menu-item-inactive': !isActive(item.path),
                  },
                ]">
                  <span :class="[
                    isActive(item.path)
                      ? 'menu-item-icon-active'
                      : 'menu-item-icon-inactive',
                  ]">
                    <component :is="item.icon" />
                  </span>
                  <span v-if="isExpanded || isHovered || isMobileOpen" class="menu-item-text">{{ item.name }}</span>
                </router-link>
                <transition @enter="startTransition" @after-enter="endTransition" @before-leave="startTransition"
                  @after-leave="endTransition">
                  <div v-show="isSubmenuOpen(groupIndex, index) &&
                    (isExpanded || isHovered || isMobileOpen)
                    ">
                    <ul class="mt-2 space-y-1 ml-9">
                      <li v-for="subItem in item.subItems" :key="subItem.name">
                        <router-link :to="subItem.path" :class="[
                          'menu-dropdown-item',
                          {
                            'menu-dropdown-item-active': isActive(
                              subItem.path
                            ),
                            'menu-dropdown-item-inactive': !isActive(
                              subItem.path
                            ),
                          },
                        ]">
                          {{ subItem.name }}
                          <span class="flex items-center gap-1 ml-auto">
                            <span v-if="subItem.new" :class="[
                              'menu-dropdown-badge',
                              {
                                'menu-dropdown-badge-active': isActive(
                                  subItem.path
                                ),
                                'menu-dropdown-badge-inactive': !isActive(
                                  subItem.path
                                ),
                              },
                            ]">
                              new
                            </span>
                            <span v-if="subItem.pro" :class="[
                              'menu-dropdown-badge',
                              {
                                'menu-dropdown-badge-active': isActive(
                                  subItem.path
                                ),
                                'menu-dropdown-badge-inactive': !isActive(
                                  subItem.path
                                ),
                              },
                            ]">
                              pro
                            </span>
                          </span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";


import {
  CalenderIcon,
  ChevronDownIcon,
  HorizontalDots,
  FlagIcon,
  UserGroupIcon,
} from "../../icons";

import { useSidebar } from "@/composables/useSidebar";
import HomeIcon from "@/icons/HomeIcon.vue";
import FolderIcon from "@/icons/FolderIcon.vue";
import BankNoteIcon from "@/icons/BankNoteIcon.vue";

const route = useRoute();

const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar();

const menuGroups = [{
  title: "Menu",
  items: [
    {
      icon: HomeIcon,
      name: "Dashboard",
      path: '/dashboard'
    },
    {
      icon: FlagIcon,
      name: "Inquiry",
      path: "/inquiry"
    },
    {
      icon: CalenderIcon,
      name: "Agreement",
      subItems: [
        { name: "Serviced Offices", path: '/admin/soa', pro: false },
        { name: "Virtual Offices", path: '/admin/voa', pro: false },
        { name: "Meeting Room", path: '/admin/mba', pro: false },
        { name: "Membership", path: '/admin/ma', pro: false },
        { name: "Day Office", path: '/admin/doa', pro: false },
      ]
    },
    {
      icon: FolderIcon,
      name: "Master Data",
      subItems: [
        { name: "Building", path: '/admin/building', pro: false },
        { name: "Rooms", path: '/admin/room', pro: false },
        { name: "Additional Service", path: '/admin/additional_service', pro: false },
        { name: 'Meeting Room', path: '/admin/meeting_room', pro: false },
        { name: 'Phone', path: '/admin/phones', pro: false },
        { name: 'Extention', path: '/admin/extention', pro: false },
        { name: 'Domicile Charge', path: '/admin/domicile_charge', pro: false }
      ]
    },
    {
      name: "Invoices",
      icon: BankNoteIcon,
      subItems: [
        { name: 'Invoice Serviced Office', path: '/admin/invoice_soa', pro: false },
        { name: 'Invoice Virtual Office', path: '/admin/invoice_voa', pro: false },
        { name: 'Invoice Meeting Room', path: '/admin/invoice_mba', pro: false },
        { name: 'Invoice Day Office', path: '/admin/invoice_doa', pro: false },
        { name: 'Invoice Charger Slip', path: '/admin/invoice_charger_slip', pro: false }
      ],
    },
    {
      name: "Customers",
      icon: UserGroupIcon,
      path: '/admin/customers',
      meta: {
        title: 'Admin - Customers',
        requiresAuth: true
      }

    },

  ],
},
];

const isActive = (path) => route.path === path;

const toggleSubmenu = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`;
  openSubmenu.value = openSubmenu.value === key ? null : key;
};

const isAnySubmenuRouteActive = computed(() => {
  return menuGroups.some((group) =>
    group.items.some(
      (item) =>
        item.subItems && item.subItems.some((subItem) => isActive(subItem.path))
    )
  );
});

const isSubmenuOpen = (groupIndex, itemIndex) => {
  const key = `${groupIndex}-${itemIndex}`;
  return (
    openSubmenu.value === key ||
    (isAnySubmenuRouteActive.value &&
      menuGroups[groupIndex].items[itemIndex].subItems?.some((subItem) =>
        isActive(subItem.path)
      ))
  );
};

const startTransition = (el) => {
  el.style.height = "auto";
  const height = el.scrollHeight;
  el.style.height = "0px";
  el.offsetHeight;
  el.style.height = height + "px";
};

const endTransition = (el) => {
  el.style.height = "";
};



</script>
