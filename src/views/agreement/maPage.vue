<!-- eslint-disable vue/block-lang -->
<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import TableTemplate from '@/components/tables/tableTemplate.vue';
import { ref } from 'vue';
import axios from 'axios';
import { Building2 } from 'lucide-vue-next';

const gancitButtons = [
  { label: "My MA" },
  { label: "All MA" },
  { label: "MA" },
]

const columnsGancit = [
  { key: 'refer_number', label: "Refer Number" },
  { key: 'date_agreement', label: 'Date Agreement' },
  { key: 'customer', label: 'Customer' },
  { key: 'membership', label: 'Membership' },
  { key: 'created_by', label: 'Created By' },
  { key: 'status_ma', label: 'Status MA' }
]

const hasilGancit = ref([])
const pagination = ref({})
const currentPage = ref(1)

const gancitLoadData = (page = 1, search = "") => {
  axios.get(`/ma?page=${page}&search=${search}`, {
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

const keyword = ref('')

const searchGancit = (val) => {
  keyword.value = val
  gancitLoadData(1, keyword.value)
}

</script>
<template>
  <AdminLayout>
    <TableTemplate title="Gandaria City Office Tower" :icon="Building2" :columns="columnsGancit"
      :buttons="gancitButtons" :pagination="pagination" @search="searchGancit" :onPageChange="gancitLoadData"
      :rows="hasilGancit" options="Detail MA" />
    <TableTemplate title="Kota Kasablanka" :pagination="pagination" @search="searchGancit"
      :onPageChange="gancitLoadData" :icon="Building2" :columns="columnsGancit" :buttons="gancitButtons"
      :rows="hasilGancit" options="Detail MA" />
  </AdminLayout>
</template>