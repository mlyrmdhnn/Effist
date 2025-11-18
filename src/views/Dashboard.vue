<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12 space-y-6 ">
        <div class="grid xl:grid-cols-2 gap-2">
          <TourGraph />
          <Deal />
        </div>
      </div>
      <div class="col-span-12">
        <statistics-chart />
      </div>
      <div class="col-span-12 space-y-6 ">
        <div class="grid xl:grid-cols-2 gap-2">
          <Inquiry />
          <InquiryLost />
        </div>
      </div>



    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '../components/layout/AdminLayout.vue'
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics.vue'
import TourGraph from '../components/ecommerce/TourGraph.vue'
import Deal from '@/components/ecommerce/Deal.vue'
import Inquiry from '@/components/ecommerce/Inquiry.vue'
import InquiryLost from '@/components/ecommerce/InquiryLost.vue'
import MonthlySale from '../components/ecommerce/TourGraph.vue'
import CustomerDemographic from '../components/ecommerce/CustomerDemographic.vue'
import StatisticsChart from '../components/ecommerce/StatisticsChart.vue'
import RecentOrders from '../components/ecommerce/RecentOrders.vue'
export default {
  components: {
    Inquiry,
    InquiryLost,
    AdminLayout,
    EcommerceMetrics,
    TourGraph,
    MonthlySale,
    CustomerDemographic,
    StatisticsChart,
    RecentOrders,
    Deal
  },
  name: 'Ecommerce',
}
</script>
