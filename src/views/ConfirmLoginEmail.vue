<template>
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
          <h2 class="right-content-title" style="text-align: center">
            Resend confirmation email
          </h2>
          <span style="text-align: center; margin-bottom: 20px"
            >Please type your email to resend your email confirmation
            link.</span
          >
          <ConfirmEmailForm />

          <p class="signupp">
            Forget it,
            <router-link to="/login" class="font-weight-bold">
              Send me Back
            </router-link>
            to the Login.
          </p>
        </div>
        <AccountLeft />
      </div>
      <AccountCircles />
    </div>
  </div>

  <!-- <div class="signin">
    <div class="sign_wrapper forsignup">
      <Logo />

      <div class="sign_header">
        <h4
          class="font-weight-bold"
          style="color: rgb(44, 37, 37); font-weight: 900"
        >
          Confirm Your E-mail
        </h4>
        <p style="color: rgb(51, 18, 18); text-align: center">
          Please type your email to resend your email confirmation link.
        </p>
      </div>

      <div class="well" style="margin-top: 4%; width: 100%">
        <ConfirmEmailForm />
      </div>

      <p class="signupp">
        Forget it,
        <router-link to="/login" class="font-weight-bold">
          Send me Back
        </router-link>
        to the Login.
      </p>
    </div>
  </div> -->
</template>
<script>
import Logo from "../components/extras/Logo";
import ConfirmEmailForm from "../components/forms/ConfirmEmailForm";

import AccountLeft from "../components/extras/AccountLeft";
import AccountCircles from "../components/extras/AccountCircles";

import "@/mixins";

// import AccountSocialIcons from "../components/extras/AccountSocialIcons";

export default {
  name: "ConfirmEmail",
  components: {
    AccountLeft,
    AccountCircles,
    Logo,
    ConfirmEmailForm,
    // AccountSocialIcons
  },
};
</script>
<style></style>
