/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <!-- Page header section  -->
        <!-- <PageHeader :topPageName="topPageName" /> -->

        <div class="row clearfix" v-if="user">
          <div class="col-lg-12 col-md-12 mt-4">
            <CustomerUser />
          </div>
        </div>
        <br /><br /><br />
      </div>
    </div>
  </div>
</template>
<script>
// import Map from "../components/charts/Map";
// import Navbar from "@/components/navbar/Navbar";
// import PageHeader from "../components/header/PageHeader";
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";
import CustomerUser from "../components/extras/users/CustomerUser";
import "@/mixins";

import { mapActions } from "vuex";

export default {
  name: "RegisteredUser",
  components: {
    PageLoadingOverlay,
    // PageHeader,
    CustomerUser,
  },

  data() {
    return {
      topPageName: "Registered Users",
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
