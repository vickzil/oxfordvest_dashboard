/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <!-- Page header section  -->
        <!-- <PageHeader :topPageName="topPageName" /> -->
        <br />
        <ReferralCard v-if="user" />
        <br />

        <UserReferrals v-if="user" class="card" />
        <br /><br /><br />
      </div>
    </div>
  </div>
</template>
<script>
// import Map from "../components/charts/Map";
// import Navbar from "@/components/navbar/Navbar";
// import PageHeader from "../components/header/PageHeader";
import UserReferrals from "../components/extras/referral/UserReferrals";
import ReferralCard from "../components/extras/referral/ReferralCard";
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";

import "@/mixins";

import { mapActions } from "vuex";
export default {
  name: "Referral",
  components: {
    PageLoadingOverlay,
    // PageHeader,
    UserReferrals,
    ReferralCard,
  },

  data() {
    return {
      topPageName: "Referral",
    };
  },

  methods: {
    ...mapActions(["currentSitePage", "closePageLoading", "showPageLoading"]),
    removeOffcanvas: function () {
      document.body.classList.remove("offcanvas-active");
    },
  },

  mounted() {
    this.currentSitePage(this.$router.history.current.path);
    this.closePageLoading();
  },
  beforeRouteLeave(to, from, next) {
    // this.showPageLoading();
    this.removeOffcanvas();
    next();
  },
};
</script>
<style scoped></style>
