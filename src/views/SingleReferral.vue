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
                      v-if="referral.photo !== ''"
                      class="rounded"
                      style="width: 70px; height: 70px; object-fit: cover"
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
                <p v-if="referral.homeAddress">{{ referral.homeAddress }}</p>
                <p v-else>
                  <span class="badge badge-default">None</span>
                </p>
                <hr />
                <small class="text-muted">Email address: </small>
                <p v-if="referral.email">{{ referral.email }}</p>
                <p v-else>
                  <span class="badge badge-default">None</span>
                </p>
                <hr />
                <small class="text-muted">Mobile: </small>
                <p v-if="referral.phoneNumber">{{ referral.phoneNumber }}</p>
                <p v-else>
                  <span class="badge badge-default">None</span>
                </p>
              </div>
            </div>
          </div>
          <div class="col-xl-8 col-lg-8 col-md-7">
            <div class="card">
              <div class="body">
                <small class="text-muted">Date of birth: </small>
                <p v-if="referral.dateOfBirth">
                  {{ removeTimeZone(referral.dateOfBirth) }}
                </p>
                <p v-else>
                  <span class="badge badge-default">None</span>
                </p>
                <hr />
                <small class="text-muted">subsidiary Name: </small>
                <p v-if="referral.subsidiaryName">
                  {{ referral.subsidiaryName }}
                </p>
                <p v-else>
                  <span class="badge badge-default">None</span>
                </p>
                <hr />
                <small class="text-muted">Country: </small>
                <p v-if="referral.countryName" class="m-b-0">
                  {{ referral.countryName }}
                </p>
                <p v-else>
                  <span class="badge badge-default">None</span>
                </p>
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
  // props: ["id"],
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
      let referralCode = this.$route.query.code;
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
