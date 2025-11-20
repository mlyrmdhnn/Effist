<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import TableTemplate from '@/components/tables/tableTemplate.vue';
import axios from 'axios';
import { Building2 } from 'lucide-vue-next';
import { ref } from 'vue'

const columns = [
  { key: 'service_name', label: 'Service Name' },
  { key: 'price', label: 'Price' },
  { key: 'remark', label: 'Remark' }
]

const hasil = ref([])
const pagination = ref({})
const currentPage = ref(1)

const loadData = (page = 1) => {
  axios.get(`/additional_service?page=${page}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    hasil.value = res.data.data.data
    pagination.value = res.data.data
    currentPage.value = res.data.data.current_page
    // console.log(res.data.data.data)

  })
}

loadData()

</script>
<template>
  <AdminLayout>
    <TableTemplate title="Additional Services" :icon="Building2" :onPageChange="loadData" :pagination="pagination"
      :columns="columns" :rows="hasil" options="Update | Delete" />
  </AdminLayout>
</template>