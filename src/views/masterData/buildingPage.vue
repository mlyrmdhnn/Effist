<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import TableTemplateNp from '@/components/tables/tableTemplateNp.vue';
import { Building2 } from 'lucide-vue-next';
import axios from 'axios';
import { ref } from 'vue'

const columns = [
  { key: 'name', label: 'Building Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'fax', label: 'Fax' },
  { key: 'address', label: 'Address' }
]

const dataApi = ref([])

axios.get('/building').then(res => {
  dataApi.value = res.data.data
  console.log(res.data)
})

</script>
<template>
  <AdminLayout>
    <tableTemplateNp title="Building" :columns="columns" :rows="dataApi" options="Update | Delete" :icon="Building2" />
  </AdminLayout>
</template>