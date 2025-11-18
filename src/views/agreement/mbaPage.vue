<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue';
import TableTemplate from '@/components/tables/tableTemplate.vue';
import { ref } from 'vue';
import axios from 'axios';
import { Building2 } from 'lucide-vue-next';


// ntr bisa ganti jadi kokasButtons
const gancitButtons = [
  { label: "My MBA" },
  { label: "All MBA" },
  { label: "MBA" },
]

const columnsGancit = [
  { key: "refer_number", label: "Refer Number" },
  { key: 'date_agreement', label: 'Date Agreement' },
  { key: 'customer', label: 'Customer' },
  { key: 'created_by', label: 'Created By' },
  { key: 'status_mba', label: 'Status MBA' },
]

// data dari api, ntr bisa berubah
const hasilGancit = ref([])

// ini api nya juga nanti ada 2 dari gancit dan juga kokas, ini baru make cnth aja
axios.get('http://127.0.0.1:8000/api/mba')
  .then(res => hasilGancit.value = res.data.data)

</script>
<template>
  <AdminLayout>
    <TableTemplate title="Gandaria City Office Tower" :icon="Building2" :buttons="gancitButtons"
      :columns="columnsGancit" :rows="hasilGancit" options="Detail MBA" />
    <TableTemplate title="Kota Kasablanka" :icon="Building2" :buttons="gancitButtons" :columns="columnsGancit"
      :rows="hasilGancit" options="Detail MBA" />
  </AdminLayout>
</template>