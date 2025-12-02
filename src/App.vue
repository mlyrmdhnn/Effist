<template>
  <ThemeProvider>
    <SidebarProvider>
      <RouterView />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup lang="ts">
import ThemeProvider from './components/layout/ThemeProvider.vue'
import SidebarProvider from './components/layout/SidebarProvider.vue'
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

let timeout: any = null



const idle_time = 10 * 60 * 1000

const autoLogout = () => {
  localStorage.removeItem('token')
  router.push('/')
}

const resetTimer = () => {
  clearTimeout(timeout)
  timeout = setTimeout(autoLogout, idle_time)
}

onMounted(() => {

  window.addEventListener('mousemove', resetTimer)
  window.addEventListener('keydown', resetTimer)
  window.addEventListener('click', resetTimer)
  window.addEventListener('scroll', resetTimer)

  resetTimer()
})

onUnmounted(() => {

  window.removeEventListener('mousemove', resetTimer)
  window.removeEventListener('keydown', resetTimer)
  window.removeEventListener('click', resetTimer)
  window.removeEventListener('scroll', resetTimer)
  clearTimeout(timeout)
})

</script>
