/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <PageHeader :topPageName="topPageName" />
        <div class="row clearfix" v-if="user">
          <div class="col-md-12">
            <div>
              <router-link
                to="/referral"
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
                  <div class="mr-3">
                    <img
                      :src="referral.photo"
                      v-if="referral.photo"
                      class="rounded"
                      alt=""
                    />
                    <img
                      src="@/assets/images/user.png"
                      v-else
                      class="rounded"
                      alt=""
                    />
                  </div>
                  <div class="details">
                    <h5 class="mb-0">
                      {{ referral.firstName }} {{ referral.lastName }}
                    </h5>
                    <span class="text-dark">{{ referral.groupName }}</span>
                    <!-- <div>+123 456 789</div> -->
                  </div>
                </div>
                <div>
                  <!-- <button class="btn btn-default btn-sm">View Profile</button>
                  <button class="btn btn-default btn-sm">Message</button> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-5">
            <div class="card">
              <div class="body">
                <small class="text-muted">Address: </small>
                <p>{{ referral.homeAddress }}</p>
                <hr />
                <small class="text-muted">Email address: </small>
                <p>{{ referral.email }}</p>
                <hr />
                <small class="text-muted">Mobile: </small>
                <p>{{ referral.phoneNumber }}</p>
              </div>
            </div>
          </div>
          <div class="col-xl-8 col-lg-8 col-md-7">
            <div class="card">
              <div class="body">
                <small class="text-muted">Date of birth: </small>
                <p>{{ removeTimeZone(referral.dateOfBirth) }}</p>
                <hr />
                <small class="text-muted">subsidiary Name: </small>
                <p>{{ referral.subsidiaryName }}</p>
                <hr />
                <small class="text-muted">Country: </small>
                <p class="m-b-0">{{ referral.countryName }}</p>
                <!-- {{ referral }} -->
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
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";
import "@/mixins";

import { mapActions } from "vuex";

export default {
  name: "Referral",
  props: ["id"],
  components: {
    PageLoadingOverlay,
    PageHeader,
  },

  data() {
    return {
      topPageName: "Referral",
    };
  },
  computed: {
    referral() {
      let referralCode = this.id;
      return this.$store.getters.referralByCode(referralCode);
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
