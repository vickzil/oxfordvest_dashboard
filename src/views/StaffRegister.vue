<template>
  <div class="signin">
    <div class="sign_wrapper forsignup">
      <Logo />

      <div class="sign_header">
        <h4
          class="font-weight-bold"
          style="color: rgb(44, 37, 37); font-weight: 900"
        >
          Staff Registration
        </h4>
        <p style="color: rgb(51, 18, 18)">
          All Oxford staffs are required to complete this process.
        </p>
      </div>

      <div class="well" style="margin-top: 4%; width: 100%"></div>
      <StaffRegisterForm />
      <!-- <p class="signupp">
        Forget it,
        <router-link to="/login" class="font-weight-bold">
          Send me Back
        </router-link>
        to the Login.
      </p> -->
    </div>
  </div>
</template>
<script>
import Logo from "../components/extras/Logo";
import StaffRegisterForm from "../components/forms/StaffRegisterForm";

// import AccountSocialIcons from "../components/extras/AccountSocialIcons";

export default {
  name: "StaffRegister",
  components: {
    Logo,
    StaffRegisterForm,
    // AccountSocialIcons
  },
};
</script>
<style></style>
