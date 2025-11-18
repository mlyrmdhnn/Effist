<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { ref } from 'vue'
import axios from 'axios';
import TableTemplate from '@/components/tables/tableTemplate.vue';

const inquiry = ref([])
const pagination = ref({})
const currentPage = ref(1)

const buttons = [
  { label: 'My Inquiry' },
  { label: 'All Inquiries' }
]

const columns = [
  { key: 'product_type', label: 'Product Type' },
  { key: 'building', label: 'Building' },
  { key: 'date', label: 'Date' },
  { key: 'customer', label: 'Customer' },
  { key: 'status', label: 'Status' },
  { key: 'description', label: 'Description' },
  { key: 'last_update', label: 'Last Update' }
]

const inquiryLoadData = (page = 1) => {
  axios.get(`/inquiry?page=${page}`).then(res => {
    inquiry.value = res.data.data.data
    pagination.value = res.data.data
    currentPage.value = res.data.data.current_page
  })
}

inquiryLoadData()

</script>
<template>
  <AdminLayout>
    <TableTemplate :pagination="pagination" title="Inquiry" :onPageChange="inquiryLoadData" :columns="columns"
      :rows="inquiry"
      options="Create CIF | Update | Send Introduction | Transfer Inquiry | Delete Inquiry & Funnel | Delete Inquiry " />
  </AdminLayout>
</template>