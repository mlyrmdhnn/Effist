<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { ref } from 'vue'
import { Building2 } from 'lucide-vue-next';
import TableTemplate from '@/components/tables/tableTemplate.vue';
import axios from 'axios';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'company_name', label: 'Company' },
  { key: 'phone', label: 'Phone' },
  { key: 'service', label: 'Sercice' },
  { key: 'status', label: 'Status' }
]

const hasilGancit = ref([])
const paginationGancit = ref({})
const currentPageGancit = ref(1)

const loadDataGancit = (page = 1) => {
  axios.get(`/customers?page=${page}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    hasilGancit.value = res.data.data.data
    paginationGancit.value = res.data.data
    currentPageGancit.value = res.data.data.current_page
  })
}

loadDataGancit()

</script>
<template>
  <AdminLayout>
    <TableTemplate :icon="Building2" title="Customers Gandaria 8 Office Tower" :columns="columns"
      options="Delete | Detail | Update" :pagination="paginationGancit" :onPageChange="loadDataGancit"
      :rows="hasilGancit" />
    <TableTemplate :icon="Building2" title="Customers Kota Kasablanka Tower" :columns="columns"
      options="Delete | Detail | Update" :pagination="paginationGancit" :onPageChange="loadDataGancit"
      :rows="hasilGancit" />
  </AdminLayout>
</template>