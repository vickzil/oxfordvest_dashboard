/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <!-- Page header section  -->
        <PageHeader :topPageName="topPageName" />

        <div class="row clearfix" v-if="user">
          <div class="col-lg-4 col-md-12">
            <ProfileCard />
          </div>
          <div class="col-lg-8 col-md-12">
            <ProfileForm />
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
import ProfileCard from "../components/extras/profile/ProfileCard";
import ProfileForm from "../components/extras/profile/ProfileForm";
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";

import "@/mixins";

import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    PageLoadingOverlay,
    PageHeader,
    ProfileCard,
    ProfileForm,
  },

  data() {
    return {
      topPageName: "Profile",
    };
  },

  methods: {
    ...mapActions(["currentSitePage", "closePageLoading", "showPageLoading","fetchUserData"]),
    removeOffcanvas: function () {
      document.body.classList.remove("offcanvas-active");
    },

    getUserData: function() {
      let userCode = this.user.userInfo.user.code;
      this.fetchUserData(userCode);
    }
  },

  mounted() {
    this.currentSitePage(this.$router.history.current.path);
    this.closePageLoading();
  },
  beforeRouteLeave(to, from, next) {
    this.showPageLoading();
    this.removeOffcanvas();
    this.getUserData();
    next();
  },
};
</script>
<style scoped></style>
