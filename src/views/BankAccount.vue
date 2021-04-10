/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <!-- Page header section  -->
        <PageHeader :topPageName="topPageName" />

        <div class="row clearfix">
          <div class="col-lg-12 col-md-12">
            <div class="oxfordvest_tabs">
              <br />
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    data-toggle="tab"
                    href="#bankAccount"
                    >Bank Account</a
                  >
                </li>
                <!-- <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#bankCard"
                    >Card</a
                  >
                </li> -->
              </ul>
            </div>

            <div class="tab-content padding-0">
              <div class="tab-pane active" id="bankAccount">
                <UserBankAccount />
              </div>
              <div class="tab-pane" id="bankCard">
                <BankCard />
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
// import Navbar from "@/components/navbar/Navbar";
import PageHeader from "../components/header/PageHeader";
import UserBankAccount from "../components/extras/banks/UserBankAccount";
import BankCard from "../components/extras/banks/BankCard";
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";
import "@/mixins";

import { mapActions } from "vuex";
export default {
  name: "BankAccount",
  components: {
    PageLoadingOverlay,
    PageHeader,
    UserBankAccount,
    BankCard,
  },

  data() {
    return {
      topPageName: "Bank Account",
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
    this.showPageLoading();
    this.removeOffcanvas();
    next();
  },
};
</script>
<style scoped></style>
