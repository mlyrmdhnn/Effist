<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { ref } from 'vue'
import { Building2 } from 'lucide-vue-next';
import axios from 'axios';
import TableTemplate from '@/components/tables/tableTemplate.vue';

const columns = [
  { key: 'building', label: 'Building' },
  { key: 'meeting_room', label: 'Meeting Room' },
  { key: 'type', label: 'Type' },
  { key: 'price', label: 'Price' }
]

const hasil = ref([])
const pagination = ref({})
const currentPage = ref(0)

const loadData = (page = 1) => {
  axios.get(`/meeting_room?page=${page}`, {
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
    <TableTemplate title="Meeting Room" :icon="Building2" :pagination="pagination" :onPageChange="loadData"
      :columns="columns" :rows="hasil" options="Update | Delete" />

  </AdminLayout>
</template>