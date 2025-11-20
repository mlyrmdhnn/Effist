<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import TableTemplate from '@/components/tables/tableTemplate.vue';
import { ref } from 'vue'
import { Building2 } from 'lucide-vue-next';
import axios from 'axios';

const columns = [
  { key: 'invoice_no', label: 'Invoce No' },
  { key: 'date_invoice', label: 'Date Invoice' },
  { key: 'due_date', label: 'Due Date' },
  { key: 'customer', label: 'Customer' },
  { key: 'status', label: 'Status' }
]

const hasilGancit = ref([])
const paginationGancit = ref({})
const currentPageGancit = ref(1)

const loadDataGancit = (page = 1) => {
  axios.get(`/invoice_doa?page=${page}`, {
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

    <TableTemplate :pagination="paginationGancit" :onPageChange="loadDataGancit" :rows="hasilGancit" :columns="columns"
      :icon="Building2" title="Invoice  Gandaria 8 Office Tower" options="Print | Payment | Update" />
    <TableTemplate :pagination="paginationGancit" :onPageChange="loadDataGancit" :rows="hasilGancit" :columns="columns"
      :icon="Building2" title="Invoice DOA Kota Kasablanka Tower" options="Print | Payment | Update" />
  </AdminLayout>
</template>