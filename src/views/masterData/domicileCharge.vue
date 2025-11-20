<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import TableTemplate from '@/components/tables/tableTemplate.vue';
import axios from 'axios';
import { ref } from 'vue'
import { Building2 } from 'lucide-vue-next';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'building', label: 'Building' },
  { key: 'price', label: 'Price' }
]

const hasil = ref([])
const pagination = ref({})
const currentPage = ref(1)

const loadData = (page = 1) => {
  axios.get(`/domicile_charge?page=${page}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    hasil.value = res.data.data.data
    pagination.value = res.data.data
    currentPage.value = res.data.data.current_page
  })
}

loadData()

</script>
<template>
  <AdminLayout>
    <TableTemplate :icon="Building2" label="Domicile Charge" :pagination="pagination" :onPageChange="loadData"
      :columns="columns" :rows="hasil" options="Update | Delete" />
  </AdminLayout>
</template>