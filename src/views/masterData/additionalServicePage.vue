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

const loadData = (page = 1, search = "") => {
  axios.get(`/additional_service?page=${page}&search=${search}`, {
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

const keyword = ref('')

const search = (val) => {
  keyword.value = val
  loadData(1, keyword.value)
}

</script>
<template>
  <AdminLayout>
    <TableTemplate title="Additional Services" @search="search" :icon="Building2" :onPageChange="loadData"
      :pagination="pagination" :columns="columns" :rows="hasil" options="Update | Delete" />
  </AdminLayout>
</template>