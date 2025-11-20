<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { Building2 } from 'lucide-vue-next';

import AdminLayout from '@/components/layout/AdminLayout.vue';
import TableTemplate from '@/components/tables/tableTemplate.vue';

const gancitButtons = [
  { label: 'My SOA' },
  { label: 'All SOA' }
]

const columns = [
  { key: 'refer_number', label: 'Refer Number' },
  { key: 'date_agreement', label: 'Date Agreement' },
  { key: 'customer', label: 'Customer' },
  { key: 'type', label: 'Type' },
  { key: 'created_by', label: 'Created By' },
  { key: 'status_soa', label: 'Status SOA' },
  { key: 'office', label: 'Office' }
]

const hasilGancit = ref([])
const pagination = ref({})
const currentPage = ref(1)

const gancitLoadData = (page = 1) => {
  axios.get(`/soa?page=${page}`, {
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
    <TableTemplate title="Gandaria 8 Office Tower" :icon="Building2" :columns="columns" :buttons="gancitButtons"
      :rows="hasilGancit" :pagination="pagination" :onPageChange="gancitLoadData" options="
	Detail SOA | Send SOA | | Update | Cancel | Delete SOA | Change Payment Method" />

    <TableTemplate title="Kota Kasablanka Tower" :icon="Building2" :columns="columns" :buttons="gancitButtons"
      :rows="hasilGancit" :pagination="pagination" :onPageChange="gancitLoadData" options="
	Detail SOA | Send SOA | | Update | Cancel | Delete SOA | Change Payment Method" />
  </AdminLayout>
</template>