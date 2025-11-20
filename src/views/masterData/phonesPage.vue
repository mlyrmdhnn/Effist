<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import axios from 'axios';
import { ref } from 'vue'
import { Building2 } from 'lucide-vue-next';
import TableTemplate from '@/components/tables/tableTemplate.vue';

const columns = [
  { key: 'building', label: 'Building' },
  { key: 'phone_no', label: 'Phone No' }
]

const hasil = ref([])
const pagination = ref({})
const currentPage = ref(1)

const laodData = (page = 1) => {
  axios.get(`/phones?page=${page}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    hasil.value = res.data.data.data
    pagination.value = res.data.data
    currentPage.value = res.data.data.current_page
  })
}

laodData()

</script>
<template>
  <AdminLayout>
    <TableTemplate :icon="Building2" label="Phones" :columns="columns" :rows="hasil" options="Update | Delete"
      :onPageChange="laodData" :pagination="pagination" />
  </AdminLayout>
</template>