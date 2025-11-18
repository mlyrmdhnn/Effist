<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { ref } from 'vue'
import axios from 'axios';
import { Building2 } from 'lucide-vue-next';
import TableTemplate from '@/components/tables/tableTemplate.vue';

const gancitButtons = [
  { label: 'My VOA' },
  { label: 'All VOA' },
  { label: 'VOA Review' }
]


const gancitColumns = [
  { key: 'refer_number', label: 'Refer Number' },
  { key: 'date_agreement', label: 'Date Agreement' },
  { key: 'customer', label: "Customer" },
  { key: 'service', label: 'Service' },
  { key: 'created_by', label: 'Created By' },
  { key: 'status_voa', label: 'Status VOA' }
]

const hasilGancit = ref([])
const pagination = ref({})
const currentPage = ref(1)

const gancitLoadData = (page = 1) => {
  axios.get(`/voa?page=${page}`).then(res => {
    hasilGancit.value = res.data.data.data
    pagination.value = res.data.data
    currentPage.value = res.data.data.current_page
  })
}

gancitLoadData()

</script>
<template>
  <AdminLayout>
    <TableTemplate title="Gandaria 8 Office Tower" :buttons="gancitButtons" :columns="gancitColumns" :rows="hasilGancit"
      :pagination="pagination" :onPageChange="gancitLoadData" :icon="Building2"
      options="Detail VOA | Stop Service | Expand | Renewal | Cancel" />
    <TableTemplate title="Kota Kasablanka Tower" :buttons="gancitButtons" :columns="gancitColumns" :rows="hasilGancit"
      :pagination="pagination" :onPageChange="gancitLoadData" :icon="Building2"
      options="Detail VOA | Stop Service | Expand | Renewal | Cancel" />
  </AdminLayout>
</template>