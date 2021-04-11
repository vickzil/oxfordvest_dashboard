<template>
  <form class="form small_form" v-on:submit.prevent="confirmEmail">
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
      >Please type your email to resend your email confirmation link.</span
    >
    <input
      type="email"
      class="account_input"
      v-model.trim="email"
      @input="checkform"
      placeholder="E-mail Address"
    />
    <transition name="fade">
      <p
        v-if="emailError"
        style="
          color: red !important;
          font-size: 13px !important;
          margin-top: 15px;
          text-align: center;
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 20 20"
          svg-inline=""
          role="presentation"
          focusable="false"
          tabindex="-1"
          style="color: red !important"
          fill="red"
        >
          <path
            d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"
          ></path>
        </svg>
        {{ emailMessage }}
      </p>
    </transition>
    <div class="text-center">
      <button
        type="submit"
        class="btn-sm filled-button"
        v-bind:disabled="emptyFields"
      >
        {{ formText }}
      </button>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import "@/mixins";
import { mapActions } from "vuex";
export default {
  name: "ConfirmEmailForm",
  data() {
    return {
      email: "",
      formError: false,
      processing: false,
      emailError: false,
      emptyFields: true,
      formMessage: "",
      emailMessage: "",
      statusMessage: "",
      formText: "Re-send E-mail",
      hasError: true,
      response: null,
    };
  },

  methods: {
    ...mapActions(["setActionLoading", "setAlertModalStatus"]),
    confirmEmail: function () {
      if (this.formError == false && this.emptyFields == false) {
        this.submitForm();
        return true;
      } else {
        this.checkform();
      }
    },

    checkform: function () {
      if (!this.validEmail(this.email)) {
        this.emailError = true;
        this.emptyFields = true;
        this.emailMessage = "Invalide Email Address";
        return false;
      }

      if (!this.email || !this.validEmail(this.email)) {
        this.emailError = true;
        this.emptyFields = true;
        this.emailMessage = "This field cannot be empty";
        return false;
      }

      this.emailError = false;
      this.emptyFields = false;
      this.emailMessage = "";
      this.formError = false;
      return true;
    },

    validEmail: function (email) {
      var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test(email);
    },

    submitForm: function () {
      this.emptyFields = true;
      this.setActionLoading(true);

      const url = `${this.hrmURL}/v1.0/OAuth/generateEmailToken`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.email,
      };

      axios
        .post(url, data)
        .then((response) => {
          if (response.data.success) {
            let payload;

            this.setActionLoading(false);
            setTimeout(() => {
              payload = {
                status: true,
                type: "success",
                message: "Login Successfull",
              };
              this.setAlertModalStatus(payload);
            }, 200);

            setTimeout(() => {
              payload = {
                status: false,
                type: "",
                message: "",
              };
              this.setAlertModalStatus(payload);
              this.$router.push({ path: "/dashboard" });
            }, 3000);
          } else {
            this.formError = true;
            this.hasError = true;
            this.emptyFields = true;
            let payload = {
              type: "error",
              status: true,
              message: response.data.message,
            };

            this.setActionLoading(false);
            setTimeout(() => {
              this.setAlertModalStatus(payload);
            }, 200);
          }

          console.log(response);

          this.processing = false;
          this.formText = "Re-send Email";
          this.email = "";
        })
        .catch((err) => {
          console.log(err);
          this.processing = false;
          this.serverErrorMessage();
          this.email = "";
        });
    },
  },
};
</script>
<style></style>
