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
            Reset Password
          </h2>
          <span style="text-align: center; margin-bottom: 20px"
            >Enter your new password and we'll reset your password.</span
          >

          <form class="form" v-on:submit.prevent="recoverPassword">
            <input
              :type="showpassword ? 'text' : 'password'"
              class="account_input"
              @input="checkInputform"
              placeholder="Enter New Password"
              v-model.trim="password"
            />
            <span
              toggle="#password-field"
              @click="toggleShowPassword"
              :class="showpassword && 'fa-eye-slash'"
              class="fa fa-fw fa-eye field-icon"
            ></span>
            <input
              class="account_input"
              placeholder="Confrim new Password"
              :type="showConfirmPassword ? 'text' : 'password'"
              @input="checkInputform"
              v-model.trim="cpassword"
            />
            <span
              toggle="#password-field"
              @click="toggleShowConfirmPassword"
              :class="showConfirmPassword && 'fa-eye-slash'"
              class="fa fa-fw fa-eye field-icon"
            ></span>
            <div class="text-center">
              <button
                type="submit"
                v-bind:disabled="emptyFields"
                class="btn-sm filled-button"
              >
                {{ formText }}
              </button>
            </div>
          </form>

          <p class="signupp">
            Forget it,
            <router-link to="/login" class="font-weight-bold">
              Send me Back
            </router-link>
            to the Login.
          </p>
          <!-- <LoginForm2 /> -->
        </div>
        <AccountLeft />
      </div>
      <AccountCircles />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Logo from "../components/extras/Logo";
import "@/mixins";

import { mapActions } from "vuex";
// import AccountSocialIcons from "../components/extras/AccountSocialIcons";
import AccountLeft from "../components/extras/AccountLeft";
import AccountCircles from "../components/extras/AccountCircles";
export default {
  name: "ForgotPassword",
  components: {
    Logo,
    AccountLeft,
    AccountCircles,
    // AccountSocialIcons
  },
  data() {
    return {
      password: "",
      formStatus: false,
      processing: false,
      passwordError: false,
      formMessage: "",
      statusMessage: "",
      emptyFields: true,
      formError: false,
      showpassword: false,
      currentPassword: "",
      cpassword: "",
      formText: "Reset password",
      showCurrentpassword: false,
      showConfirmPassword: false,
      hasError: true,
    };
  },

  methods: {
    ...mapActions(["setAlertModalStatus", "setActionLoading"]),
    recoverPassword: function () {
      if (this.formError == false && this.emptyFields == false) {
        this.saveData();
        return true;
      } else {
        this.processForm();
      }
    },

    toggleShowConfirmPassword: function () {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    toggleShowPassword: function () {
      this.showpassword = !this.showpassword;
    },

    processForm: function () {
      if (!this.email || !this.validEmail(this.email)) {
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      this.formError = false;
      return true;
    },

    saveData: function () {
      this.emptyFields = true;
      this.setActionLoading(true);

      const url = `${this.hrmURL}/v1.0/OAuth/forgotPassword`;

      var data = {
        Email: this.email,
        UserName: "string",
      };

      axios
        .post(url, data)
        .then((resp) => {
          if (resp.data.success) {
            this.formError = false;
            this.emptyFields = true;

            let payload;

            this.setActionLoading(false);

            payload = {
              status: true,
              type: "success",
              message: resp.data.message,
            };
            this.setAlertModalStatus(payload);

            setTimeout(() => {
              payload = {
                status: false,
                type: "",
                message: "",
              };
              this.setAlertModalStatus(payload);
              this.$router.push({ path: "/login" });
            }, 3000);
          } else {
            this.formError = true;
            this.hasError = true;
            this.formMessage = resp.data.message;
            this.emptyFields = false;
            this.successForm = false;
            this.formMessageHead = "";
            this.formMessageBody = "";

            this.setActionLoading(false);
            setTimeout(() => {
              let payload = {
                status: true,
                type: "error",
                message: resp.data.message,
              };
              this.setAlertModalStatus(payload);
            }, 200);
          }

          this.email = "";

          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
          this.serverErrorMessage();
        });
    },

    // email validation
    validEmail: function (email) {
      var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test(email);
    },
  },
};
</script>
<style scoped>
body {
  margin: 0px !important;
}
</style>
