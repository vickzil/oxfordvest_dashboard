<template>
  <!-- <div class="signin">
    <div class="sign_wrapper">
      <div class="card">
        <div class="card-body">
          <Logo />

          <div class="sign_header">
            <h4
              class="font-weight-bold"
              style="color: rgb(44, 37, 37); font-weight: 900"
            >
              Login
            </h4>
            <p style="color: rgb(51, 18, 18)" class="text-center">
              login to your oxfordvest account
            </p>
          </div>

          <div class="well" style="margin-top: 4%">
            <LoginForm />
          </div>

          <p class="signupp text-center">
            Don't have an account?
            <router-link to="/register" class="font-weight-bold">
              Sign Up
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div> -->
  <div class="account_body">
    <div class="more-info">
      <Logo />

      <div class="more_info_grid">
        <div class="right-content">
          <img
            class="rtc_image"
            src="@/assets/images/oxfordvest.png"
            width="120"
            height="45"
            alt="logo"
          />
          <h2 class="right-content-title" style="text-align: center">Login</h2>
          <span style="text-align: center; margin-bottom: 20px"
            >Securely login to your Oxfordvest Account</span
          >
          <LoginForm2 />

          <p class="signupp text-center">
            Don't have an account?
            <router-link to="/register" class="font-weight-bold">
              Sign Up
            </router-link>
          </p>
        </div>
        <AccountLeft />
      </div>
      <AccountCircles />
    </div>
  </div>
</template>
<script>
import LoginForm2 from "../components/forms/LoginForm2";
import Logo from "../components/extras/Logo";

import AccountLeft from "../components/extras/AccountLeft";
import AccountCircles from "../components/extras/AccountCircles";
export default {
  components: {
    LoginForm2,
    Logo,
    AccountLeft,
    AccountCircles,
  },
  mounted() {},
};
</script>
