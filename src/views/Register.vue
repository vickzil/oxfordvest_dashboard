<template>
  <!-- <div class="signin">
    <div class="sign_wrapper forsignup">

      <Logo />

      <div class="sign_header">
        <h4
          class="font-weight-bold"
          style="color: rgb(44, 37, 37); font-weight: 900;"
        >Sign Up</h4>
        <p style="color: rgb(51, 18, 18);">Create a secured Account</p>
      </div>

      <RegistrationForm />
      <p class="signupp text-center">
        <br> Already have an account?
        <router-link
          to="/login"
          class="font-weight-bold"
        >
          Login
        </router-link>
      </p>
    </div>
  </div> -->

  <div class="account_body">
    <div class="more-info just_register">
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
          <h2 class="right-content-title" style="text-align: center">
            Register
          </h2>
          <span style="text-align: center; margin-bottom: 20px"
            >Create a secured Account</span
          >
          <RegisterForm />
        </div>
        <AccountLeft />
      </div>
      <AccountCircles />
    </div>
  </div>
</template>
<script>
import "@/assets/css/account.css";
import Logo from "../components/extras/Logo";
import RegisterForm from "../components/forms/RegisterForm";
import AccountLeft from "../components/extras/AccountLeft";
import AccountCircles from "../components/extras/AccountCircles";

export default {
  components: {
    RegisterForm,
    Logo,
    AccountLeft,
    AccountCircles,
  },

  methods: {},
};
</script>
