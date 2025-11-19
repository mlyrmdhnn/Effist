<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String, // judul header ex : VOA Gandaria City
  icon: Object, // icon dari lucide
  columns: Array, // header tabel
  rows: Array, // data dari api
  options: String
})

</script>
<template>
  <section class="bg-gray-100 dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4">
      <!-- Start coding here -->
      <div class="bg-blue-100 w-full h-10 flex items-center p-2 rounded-t gap-2">
        <span class="text-blue-400">
          <!-- <building2 /> -->
          <component :is="icon" />
        </span>
        <span class="text-blue-500">
          {{ title }}
        </span>
      </div>
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="w-full md:w-1/2">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                    viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
                <input type="text" id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search" required>
              </div>
            </form>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>

                <th scope="col" class="px-4 py-3">No</th>
                <th v-for="(c, i) in columns" :key="i" scope="col" class="px-4 py-3">
                  {{ c.label }}
                </th>
                <th class="px-4 py-3">Options</th>

              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-gray-700" v-for="(d, i) in rows" :key="i">
                <td class="px-4 py-3">{{ i + 1 }}</td>
                <th v-for="(c, x) in columns" :key="x" scope="row" class="px-4 py-3">
                  {{ d[c.key] }}
                </th>

                <td class="px-4 py-2">
                  {{ options }}</td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  </section>
</template>