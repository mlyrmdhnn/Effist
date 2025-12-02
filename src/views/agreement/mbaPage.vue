<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import TableTemplate from '@/components/tables/tableTemplate.vue';
import { ref } from 'vue';
import axios from 'axios';
import { Building2 } from 'lucide-vue-next';


// ntr bisa ganti jadi kokasButtons
const gancitButtons = [
  { label: "My MBA" },
  { label: "All MBA" },
  { label: "MBA" },
]

const columnsGancit = [
  { key: "refer_number", label: "Refer Number" },
  { key: 'date_agreement', label: 'Date Agreement' },
  { key: 'customer', label: 'Customer' },
  { key: 'created_by', label: 'Created By' },
  { key: 'status_mba', label: 'Status MBA' },
]

// data dari api, ntr bisa berubah
const hasilGancit = ref([])
const pagination = ref({})
const currentPage = ref(1)

const gancitLoadData = (page = 1, search = "") => {
  axios.get(`/mba?page=${page}&search=${search}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    hasilGancit.value = res.data.data.data
    pagination.value = res.data.data
    currentPage.value = res.data.data.current_page
  })
}

gancitLoadData()

const keyword = ref('')

const searchGancit = (val) => {
  keyword.value = val
  gancitLoadData(1, keyword.value)
}

</script>
<template>
  <AdminLayout>
    <TableTemplate title="Gandaria City Office Tower" :icon="Building2" :buttons="gancitButtons"
      :columns="columnsGancit" :pagination="pagination" @search="searchGancit" :onPageChange="gancitLoadData"
      :rows="hasilGancit" options="Detail MBA" />
    <TableTemplate title="Kota Kasablanka" :icon="Building2" @search="searchGancit" :buttons="gancitButtons"
      :columns="columnsGancit" :pagination="pagination" :onPageChange="gancitLoadData" :rows="hasilGancit"
      options="Detail MBA" />
  </AdminLayout>
</template>