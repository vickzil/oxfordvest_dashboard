/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <!-- <PageHeader :topPageName="topPageName" /> -->
        <div class="row clearfix" v-if="user">
          <div class="col-md-12">
            <div>
              <router-link
                to="/bank-account"
                class="btn btn-default btn-sm hrm_button"
                ><i class="fa fa-arrow-left mr-2"></i>Go back</router-link
              >
            </div>
            <br />
            <div class="card social">
              <div
                class="profile-header d-flex justify-content-between justify-content-center bg-white text-dark gradient"
              >
                <div class="d-flex">
                  <div class="details">
                    <h5 class="mb-0">
                      {{ card.cardBankName }}
                    </h5>
                    <span class="badge badge-success mt-3">{{
                      card.status
                    }}</span>
                    <!-- <div>+123 456 789</div> -->
                  </div>
                </div>
                <div>
                  <button class="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-md-auto col-sm-12">
            <div class="card">
              <div class="body">
                <small class="text-muted">Card Name: </small>
                <p v-if="card.cardFirstName">
                  {{ card.cardFirstName }} {{ card.cardLastName }}
                </p>
                <p v-else class="badge badge-default">None</p>
                <hr />
                <small class="text-muted">Card number: </small>
                <p v-if="card.cardLast4">**** **** ****{{ card.cardLast4 }}</p>
                <p v-else class="badge badge-default">None</p>
                <hr />
                <small class="text-muted">Card Type: </small>
                <p v-if="card.cardType">{{ card.cardType }}</p>
                <p v-else class="badge badge-default">None</p>
                <hr />
                <small class="text-muted">Card Expiry: </small>
                <p v-if="card.cardExpireMonth">
                  {{ card.cardExpireMonth }}/{{ card.cardExpireYear }}
                </p>
                <p v-else class="badge badge-default">None</p>
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
// import PageHeader from "../components/header/PageHeader";
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";
import "@/mixins";

import { mapActions } from "vuex";

export default {
  name: "Card",
  props: ["id"],
  components: {
    PageLoadingOverlay,
    // PageHeader,
  },

  data() {
    return {
      topPageName: "Card",
    };
  },
  computed: {
    card() {
      let cardCode = this.id;
      return this.$store.getters.cardByCode(cardCode);
    },
  },

  methods: {
    ...mapActions(["currentSitePage", "closePageLoading", "showPageLoading"]),
    removeOffcanvas: function () {
      document.body.classList.remove("offcanvas-active");
    },
    hasHistory: function () {
      return window.history.length > 2;
    },
  },

  mounted() {
    this.currentSitePage("/referral");
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
