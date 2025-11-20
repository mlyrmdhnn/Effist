<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import axios from 'axios';
import { ref } from 'vue'
import { Building2 } from 'lucide-vue-next';
import TableTemplate from '@/components/tables/tableTemplate.vue';

const columns = [
  { key: 'invoice_no', label: 'Invoce No' },
  { key: 'date_invoice', label: 'Date Invoice' },
  { key: 'due_date', label: 'Due Date' },
  { key: 'customer', label: 'Customer' }
]

const hasilGancit = ref([])
const paginationGancit = ref({})
const currentPageGancit = ref(1)

const loadDataGancit = (page = 1) => {
  axios.get(`/invoice_soa?page=${page}`, {
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
    <TableTemplate :icon="Building2" title="Invoice SOA Gandaria 8 Office Tower" :pagination="paginationGancit"
      :onPageChange="loadDataGancit" :columns="columns" :rows="hasilGancit" options="Print | Payment | update" />

    <TableTemplate :icon="Building2" title="Invoice SOA Kota Kasablanka Tower" :pagination="paginationGancit"
      :onPageChange="loadDataGancit" :columns="columns" :rows="hasilGancit" options="Print | Payment | update" />
  </AdminLayout>
</template>