<script setup>
import { ref } from 'vue'
import axios from 'axios';
import AdminLayout from '@/components/layout/AdminLayout.vue';
import TableTemplate from '@/components/tables/tableTemplate.vue';
import { Building2 } from 'lucide-vue-next';

const columns = [
  { key: 'building', label: 'Building Name' },
  { key: 'name', label: 'Room Name' },
  { key: 'type', label: 'Type' },
  { key: 'work_station', label: 'WorkStation' },
  { key: 'price', label: 'Price' },
  { key: 'status_room', label: 'Status Room' }
]

const room = ref([])
const pagination = ref({})
const currentPage = ref(1)

const roomLoadData = (page = 1, search = "") => {
  axios.get(`/rooms?page=${page}&search=${search}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => {
    room.value = res.data.data.data
    pagination.value = res.data.data
    currentPage.value = res.data.data.current_page
    console.log(res.data.data.data)
  })
}

roomLoadData()

const keyword = ref('')

const roomSearch = (val) => {
  keyword.value = val
  roomLoadData(1, keyword.value)
}

</script>
<template>
  <AdminLayout>
    <TableTemplate title="Room" :icon="Building2" @search="roomSearch" :onPageChange="roomLoadData"
      :pagination="pagination" :columns="columns" :rows="room" options="Update | Delete" />
  </AdminLayout>
</template>