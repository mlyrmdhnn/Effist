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
  { key: 'customer', label: 'Customer' }
]

const hasilGancit = ref([])
const paginationGancit = ref({})
const currentPageGancit = ref(1)

const loadDataGancit = (page = 1, search = '') => {
  axios.get(`/invoice_voa?page=${page}&search=${search}`, {
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

const keyword = ref('')

const searchGancit = (val) => {
  keyword.value = val
  loadDataGancit(1, keyword.value)
}


</script>
<template>
  <AdminLayout>
    <TableTemplate :icon="Building2" title="Invoice VOA Gandaria 8 Office Tower" :columns="columns" :rows="hasilGancit"
      @search="searchGancit" options="Print | Payment | Delete" :pagination="paginationGancit"
      :onPageChange="loadDataGancit" />
    <TableTemplate :icon="Building2" title="Invoice VOA Kota Kasablanka Tower" :columns="columns" :rows="hasilGancit"
      @search="searchGancit" options="Print | Payment | Delete" :pagination="paginationGancit"
      :onPageChange="loadDataGancit" />
  </AdminLayout>
</template>