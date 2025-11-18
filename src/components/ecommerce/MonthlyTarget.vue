<template>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DropdownMenu from '../common/DropdownMenu.vue'
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  value: {
    type: Number,
    default: 75.55,
  },
})

const series = computed(() => [props.value])

const chartOptions = {
  colors: ['#465FFF'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: {
        size: '80%',
      },
      track: {
        background: '#E4E7EC',
        strokeWidth: '100%',
        margin: 5,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: '36px',
          fontWeight: '600',
          offsetY: 60,
          color: '#1D2939',
          formatter: function (val: number) {
            return val.toFixed(2) + '%'
          },
        },
      },
    },
  },
  fill: {
    type: 'solid',
    colors: ['#465FFF'],
  },
  stroke: {
    lineCap: 'round',
  },
  labels: ['Progress'],
}
</script>

<style scoped>
.radial-bar-chart {
  width: 100%;
  max-width: 330px;
  margin: 0 auto;
}
</style>
