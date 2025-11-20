<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <FullScreenLayout>
    <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900">
        <div class="flex flex-col flex-1 w-full lg:w-1/2">

          <!-- Form -->
          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <section class="bg-gray-50 dark:bg-gray-900 border">
              <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                <span class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  <img class="w-45 h-20 mr-2" src="/images/logo/logo.png" alt="logo">

                </span>
                <span :class="textColor">
                  {{ msg }}
                </span>
                <div
                  class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                      class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                    </h1>
                    <form @submit.prevent="handleSubmit" class="space-y-4 md:space-y-6" action="#">
                      <div>
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                          Username</label>
                        <input v-model="username" type="text" name="username" id="username"
                          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Username" required>
                      </div>
                      <div>
                        <label for="password"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                          class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required>
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox"
                              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                        </div>
                      </div>
                      <button type="submit"
                        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                        in</button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="relative items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div class="flex items-center justify-center z-1">
            <common-grid-shape />
            <div class="flex flex-col items-center max-w-xs">
              <!-- <router-link to="" class="block mb-4"> -->
              <img width="{231}" height="{48}" src="/images/logo/logo.png" alt="Logo" />
              <!-- </router-link> -->
              <p class="text-center text-gray-400 dark:text-white/60">
                Provide adaptable workspaces and customized office solutions for your evolving business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>

<script setup lang="ts">
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import CommonGridShape from '@/components/common/CommonGridShape.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import router from '@/router'

const username = ref('')
const password = ref('')
const msg = ref('')
const textColor = ref('')
const showPassword = ref(false)
const agreeToTerms = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const redirectToDashboard = () => {
  router.push('/dashboard')
}


const handleSubmit = () => {
  axios.post('/login', { username: username.value, password: password.value })
    .then(res => {
      textColor.value = 'text-green-500'
      msg.value = res.data.msg
      localStorage.setItem('token', res.data.token)
      setTimeout(() => {
        redirectToDashboard()
      }, 200);
    }).catch(e => {
      textColor.value = 'text-red-500'
      msg.value = e.response.data.msg
    })
}
</script>
