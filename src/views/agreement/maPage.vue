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
axios.get('http://127.0.0.1:8000/api/ma').then(res => {
  hasilGancit.value = res.data.data
  console.log(res.data.data)
})

</script>
<template>
  <AdminLayout>
    <TableTemplate title="Gandaria City Office Tower" :icon="Building2" :columns="columnsGancit"
      :buttons="gancitButtons" :rows="hasilGancit" options="Detail MA" />
    <TableTemplate title="Kota Kasablanka" :icon="Building2" :columns="columnsGancit" :buttons="gancitButtons"
      :rows="hasilGancit" options="Detail MA" />
  </AdminLayout>
</template>