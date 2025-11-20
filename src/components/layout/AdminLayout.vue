<template>
  <div class="min-h-screen xl:flex">
    <app-sidebar />
    <Backdrop />
    <div class="flex-1 transition-all duration-300 ease-in-out"
      :class="[isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']">
      <app-header />
      <div class="py-4 mx-auto max-w-(--breakpoint-2xl)">
        <slot></slot>
      </div>
      <!-- Footer -->
      <!-- <footer>
        <div class="text-center py-2">
          Copyright <a target="_blank" href="https://effist.com/" class="text-blue-500 hover:underline">
            Effist Suite Office</a> 2025.
          All
          Rights Reserved.
        </div>
      </footer> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSidebar } from '@/composables/useSidebar'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'
import Backdrop from './Backdrop.vue'
const { isExpanded, isHovered } = useSidebar()
</script>
