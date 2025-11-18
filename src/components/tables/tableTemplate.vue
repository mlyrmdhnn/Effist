<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String, // judul header ex : VOA Gandaria City
  icon: Object, // icon dari lucide
  buttons: Array, // daftar tombol, example (My VOA, All VOA, VOA)
  columns: Array, // header tabel
  rows: Array, // data dari api
  options: String,
  pagination: Object,
  onPageChange: Function
})

const handleClick = (link) => {
  if (!link.url) return;

  const page = new URL(link.url).searchParams.get("page");
  props.onPageChange(page);
};


</script>
<template>

  <section class="bg-gray-100 dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4">
      <!-- Start coding here -->
      <div class="bg-blue-100 w-full h-10 flex items-center p-2 rounded-t gap-2">
        <span class="text-blue-400">
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
          <div
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">

            <div class="flex items-center space-x-3 w-full md:w-auto">
              <button v-for="(b, i) in buttons" :key="i"
                class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                type="button">
                {{ b.label }}
              </button>

            </div>
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
              <tr v-for="(d, i) in (Array.isArray(rows) ? rows : [])" :key="i">


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
        <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation">
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.from }}</span>
            -
            <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.to }}</span>
            of
            <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.total }}</span>
          </span>

          <ul class="inline-flex items-stretch -space-x-px">
            <li v-for="(link, i) in pagination.links" :key="i">
              <button :disabled="!link.url" @click="handleClick(link)" class="px-3 py-2 text-sm border" :class="[
                link.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-700',
                !link.url && 'text-gray-400 cursor-not-allowed'
              ]" v-html="link.label" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</template>