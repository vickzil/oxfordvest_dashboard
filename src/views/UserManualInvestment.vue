/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <!-- Page header section  -->
        <PageHeader :topPageName="topPageName" />

        <div class="row clearfix" v-if="user">
          <div class="col-lg-12 col-md-12 mt-4">
            <ManualRegisteration />
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
import ManualRegisteration from "../components/extras/users/ManualRegisteration";
import "@/mixins";

import { mapActions } from "vuex";

export default {
  name: "UserManualInvestment",
  components: {
    PageLoadingOverlay,
    PageHeader,
    ManualRegisteration,
  },

  data() {
    return {
      topPageName: "Manual Reg & Investment",
    };
  },

  methods: {
    ...mapActions(["currentSitePage", "closePageLoading", "showPageLoading"]),
    removeOffcanvas: function () {
      document.body.classList.remove("offcanvas-active");
    },

    clearData: function () {
      this.$store.state.manualUserReg.userFirstName = "";
      this.$store.state.manualUserReg.this.$store.state.manualUserReg.userLastName =
        "";
      this.$store.state.manualUserReg.this.$store.state.manualUserReg.userMiddleName =
        "";
      this.$store.state.manualUserReg.this.$store.state.manualUserReg.userEmail =
        "";
      this.$store.state.manualUserReg.this.$store.state.manualUserReg.userPhone =
        "";
      this.$store.state.manualUserReg.this.$store.state.manualUserReg.userAddress =
        "";
      this.$store.state.manualUserReg.this.$store.state.manualUserReg.userDob =
        "";
      this.$store.state.manualUserReg.this.$store.state.manualUserReg.userCountry =
        "";
      this.$store.state.manualUserReg.this.$store.state.manualUserReg.userGroups =
        "";
      this.$store.state.manualUserReg.this.$store.state.manualUserReg.userSubsidaiary =
        "";
      this.$store.state.manualUserReg.userBvn = "";
      this.$store.state.manualUserReg.userGender = "";
      this.$store.state.manualUserReg.userAcctMgtCode = "";
      this.$store.state.manualUserReg.userPassword = "";
      this.$store.state.manualUserReg.userAvailableInvestmentCode = "";
      this.$store.state.manualUserReg.userAmountInvested = 0;
      this.$store.state.manualUserReg.userDuration = null;
      this.$store.state.manualUserReg.userCurrentInvestment = null;
      this.$store.state.manualUserReg.userReturnsToOilInvest = false;
      this.$store.state.manualUserReg.hasVerifiedManager = false;
      this.$store.state.manualUserReg.formError = false;
      this.$store.state.manualUserReg.emptyFields = true;
      this.$store.state.manualUserReg.userFrequency = "";
      this.$store.state.manualUserReg.userStatus = "offline";
    },
  },

  mounted() {
    this.currentSitePage(this.$router.history.current.path);
    this.closePageLoading();
  },
  beforeRouteLeave(to, from, next) {
    // this.showPageLoading();
    this.removeOffcanvas();
    // this.clearData();
    next();
  },
};
</script>
<style scoped></style>
