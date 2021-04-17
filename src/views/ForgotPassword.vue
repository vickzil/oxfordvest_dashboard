<template>
  <div class="account_body">
    <div class="more-info">
      <Logo />

      <div class="more_info_grid">
        <div class="right-content">
          <form class="form small_form" v-on:submit.prevent="recoverPassword">
            <img
              class="rtc_image"
              src="@/assets/images/oxfordvest.png"
              width="120"
              height="45"
              alt="logo"
            />
            <h2 class="right-content-title" style="text-align: center">
              Forgot Password
            </h2>
            <span style="text-align: center; margin-bottom: 20px"
              >Enter your email address and we'll send you an email with
              instructions to reset your password.</span
            >
            <input
              type="email"
              class="account_input"
              placeholder="your email"
              v-model.trim="email"
              @input="processForm"
            />
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

          <div class="text-center">
            <p class="signupp">
              Forget it,
              <router-link to="/login" class="font-weight-bold">
                Send me Back
              </router-link>
              to the Login.
            </p>
          </div>
          <!-- <LoginForm2 /> -->
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
          Recover Password
        </h4>
        <p style="color: rgb(51, 18, 18)">
          Enter your email address and we'll send you an email with instructions
          to reset your password.
        </p>
      </div>

      <div class="well" style="margin-top: 4%; width: 100%">
        <form class="form" v-on:submit.prevent="recoverPassword">
          <div class="row">
            <div class="form-group col-md-12">
              <input
                type="email"
                class="form_input"
                v-model.trim="email"
                placeholder="E-mail Address"
                @input="processForm"
                style="margin-bottom: 15px"
              />
            </div>
            <button
              type="submit"
              class=""
              :class="
                emptyFields ? 'btn btn-dark d-block btn-block' : 'sign_button'
              "
              v-bind:disabled="emptyFields"
            >
              {{ formText }}
            </button>
          </div>
        </form>
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
      processing: false,
      email: "",
      formText: "Recover Password",
      emptyFields: true,
      formError: false,
      hasError: true,
      formMessage: "",
      successForm: false,
      formMessageHead: "",
      formMessageBody: "",
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

          // console.log(resp);
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
<style></style>
