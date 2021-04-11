/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <!-- Page header section  -->
        <PageHeader :topPageName="topPageName" />

        <div class="row clearfix">
          <div class="col-lg-12 col-md-12 mt-4">
            <div class="oxfordvest_tabs">
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    data-toggle="tab"
                    href="#AllWithdrawals"
                    >Withdrawals</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#Deposits"
                    >Deposits</a
                  >
                </li>
              </ul>
            </div>

            <div class="tab-content padding-0" v-if="user">
              <div class="tab-pane active" id="AllWithdrawals">
                <UserWithdrawals />
              </div>
              <div class="tab-pane" id="Deposits">
                <UserDeposit />
              </div>
            </div>
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
import PageHeader from "../components/header/PageHeader";
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";
import UserDeposit from "../components/extras/Deposits/UserDeposit";
import UserWithdrawals from "../components/extras/withdrawals/UserWithdrawals";
import "@/mixins";

import { mapActions } from "vuex";

export default {
  name: "Transaction",
  components: {
    PageLoadingOverlay,
    PageHeader,
    UserDeposit,
    UserWithdrawals,
  },

  data() {
    return {
      topPageName: "Transaction",
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
