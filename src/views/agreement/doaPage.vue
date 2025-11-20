<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { ref } from "vue"
import { Building2 } from 'lucide-vue-next';
import axios from 'axios';
import TableTemplate from '@/components/tables/tableTemplate.vue';

const gancitButtons = [
  { label: "My DOA" },
  { label: "All DOA" },
  { label: "DOA" }
]

const gancitColumns = [
  { key: 'refer_number', label: 'Refer Number' },
  { key: 'date_agreement', label: 'Date Agreement' },
  { key: 'customer', label: 'Customer' },
  { key: 'created_by', label: 'Created By' },
  { key: 'status_doa', label: 'Status' }
]

const hasilGancit = ref([])
const pagination = ref({})
const currentPage = ref(1)

const gancitLoadData = (page = 1) => {
  axios.get(`/doa?page=${page}`, {
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



</script>
<template>
  <AdminLayout>
    <TableTemplate title="Gandaria City Office Tower" :icon="Building2" :columns="gancitColumns"
      :buttons="gancitButtons" :pagination="pagination" :onPageChange="gancitLoadData" :rows="hasilGancit"
      options="Detail DOA | Send DOA | Update" />
    <TableTemplate title="Kota Kasablanka" :icon="Building2" :columns="gancitColumns" :buttons="gancitButtons"
      :rows="hasilGancit" :pagination="pagination" :onPageChange="gancitLoadData"
      options="Detail DOA | Send DOA | Update" />
  </AdminLayout>
</template>