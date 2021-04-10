/* eslint-disable */
<template>
  <div class="account_body">
    <div class="more-info for_landing">
      <div class="top_image">
        <img src="@/assets/images/oxfordvest.png" width="70" alt="logo" />
      </div>

      <div class="more_info_grid">
        <div class="right-content">
          <img
            class="rtc_image"
            src="@/assets/images/oxfordvest.png"
            width="120"
            height="45"
            alt="logo"
          />
          <h2 class="right-content-title" style="text-align: center">
            Welcome to <em>Oxfordvest</em>
          </h2>
          <span style="text-align: center; margin-bottom: 20px"
            >A multi investment platform that leverages on technology for a
            seamless investment experience</span
          >
          <a
            href="javascript:void(0)"
            class="btn-sm filled-button"
            @click="goToLoginPage"
            style="text-align: center"
            >Login</a
          >
          <a
            href="javascript:void(0)"
            @click="goToRegisterPage"
            class="btn-sm filled-button last_button"
            style="text-align: center"
            >Register</a
          >
        </div>
        <AccountLeft />
      </div>
      <AccountCircles />
    </div>
  </div>
</template>
<script>
import AccountLeft from "../components/extras/AccountLeft";
import AccountCircles from "../components/extras/AccountCircles";
export default {
  name: "LandingPage",
  components: {
    AccountLeft,
    AccountCircles,
  },
  computed: {},

  methods: {
    goToLoginPage: function () {
      this.$router.push({ path: "/login" });
    },
    goToRegisterPage: function () {
      this.$router.push({ path: "/register" });
    },
  },
};
</script>
<style scoped></style>
