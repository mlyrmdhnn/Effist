<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import TableTemplate from '@/components/tables/tableTemplate.vue';
import axios from 'axios';
import { ref } from 'vue'
import { Building2 } from 'lucide-vue-next';

const columns = [
  { key: 'building', label: 'Building' },
  { key: 'ext_no', label: 'Ext No' },
  { key: 'status', label: 'Status' }
]

const hasil = ref([])
const pagination = ref({})
const currentPage = ref(1)

const loadData = (page = 1, search = '') => {
  axios.get(`/extention?page=${page}&search=${search}`, {
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
    <TableTemplate :icon="Building2" label="Extention" @search="search" :columns="columns" :rows="hasil"
      :pagination="pagination" :onPageChange="loadData" options="Update | Delete" />
  </AdminLayout>
</template>