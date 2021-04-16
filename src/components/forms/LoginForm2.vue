<template>
  <form class="form c" v-on:submit.prevent="loginUser">
    <transition name="fade">
      <p
        style="
          color: red !important;
          font-size: 13px !important;
          margin-bottom: 8px;
        "
        v-if="emailError"
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
          style="color: red !important; margin-right: 10px"
          fill="red"
        >
          <path
            d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"
          ></path>
        </svg>
        {{ emailMessage }}
      </p>
    </transition>
    <input
      type="email"
      v-model.trim="email"
      class="account_input"
      @input="processForm"
      placeholder="your email"
    />

    <input
      class="account_input"
      :type="showpassword ? 'text' : 'password'"
      @input="processForm"
      v-model.trim="password"
      placeholder="your password"
    />
    <span
      toggle="#password-field"
      @click="toggleShowPassword"
      :class="showpassword && 'fa-eye-slash'"
      class="fa fa-fw fa-eye field-icon"
    ></span>
    <transition name="fade">
      <p class="errors my-2 text-danger" v-if="passwordError">
        {{ formMessage }}
      </p>
    </transition>

    <div class="col-md-12 text-right">
      <p class="fgpass">
        <router-link to="/forgot-password" class="font-weight-bold">
          Forgot Password?
        </router-link>
      </p>
    </div>
    <div class="text-center">
      <button
        type="submit"
        v-bind:disabled="emptyFields"
        class="btn-sm filled-button"
        style="text-align: center"
      >
        {{ formText }}
      </button>
    </div>

    <p class="signupp text-center" v-if="formStatus">
      <router-link to="/confirm" class="font-weight-bold">
        Resend email confirmation link
      </router-link>
    </p>

    <!-- <div class="row">
      <div class="form-group col-md-12">
        <input
          type="email"
          v-model.trim="email"
          class="form_input"
          name="email"
          value=""
          placeholder="E-mail Address"
          @input="processForm"
        />

        <transition name="fade">
          <p
            style="
              color: red !important;
              font-size: 13px !important;
              margin-top: 15px;
            "
            v-if="emailError"
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
              style="color: red !important; margin-right: 10px"
              fill="red"
            >
              <path
                d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"
              ></path>
            </svg>
            {{ emailMessage }}
          </p>
        </transition>
      </div>
      <div class="form-group col-md-12">
        <input
          id="password-field"
          :type="showpassword ? 'text' : 'password'"
          class="form_input"
          @input="processForm"
          v-model.trim="password"
          placeholder="Password"
        />
        <span
          toggle="#password-field"
          @click="toggleShowPassword"
          :class="showpassword && 'fa-eye-slash'"
          class="fa fa-fw fa-eye field-icon"
        ></span>
        <transition name="fade">
          <p class="errors my-2 text-danger" v-if="passwordError">
            {{ formMessage }}
          </p>
        </transition>
      </div>
      <div class="col-md-12 text-right">
        <p class="fgpass">
          <router-link to="/forgot-password" class="font-weight-bold">
            Forgot Password?
          </router-link>
        </p>
      </div>
      <div class="col-md-10 mx-md-auto">
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
      <div class="col-md-12 mt-3 text-center" v-if="formStatus">
        <p class="signupp">
          <router-link to="/confirm" class="font-weight-bold">
            Resend email confirmation link
          </router-link>
        </p>
      </div>
    </div> -->
  </form>
</template>
<script>
import axios from "axios";
import "@/mixins";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      formStatus: false,
      processing: false,
      emailError: false,
      passwordError: false,
      emailMessage: "defgtgvt gewtrgt wgwers",
      formMessage: "",
      statusMessage: "",
      formText: "Login",
      emptyFields: true,
      formError: false,
      showpassword: false,
      userCode: null,
      UserToken: null,
    };
  },
  computed: {
    expiresAt: {
      get: function () {
        return sessionStorage.getItem("appexrat");
      },
      set: function (expiresIn) {
        return sessionStorage.setItem("appexrat", expiresIn);
      },
    },
  },
  methods: {
    ...mapActions([
      "setActionLoading",
      "login",
      "setAlertModalStatus",
      "fetchBankNames",
      "saveUserData",
      "getPaymentFeeInfo",
      "setTwoFactorModal",
      "sendLoginDetailsToState",
    ]),
    loginUser: function () {
      if (this.formError == false && this.emptyFields == false) {
        this.saveData();
        return true;
      } else {
        this.processForm();
      }
    },

    processForm: function () {
      if (!this.email) {
        this.emptyFields = true;
        this.emailError = true;
        this.emailMessage = "E-mail Address is Required";
        return false;
      }

      if (!this.validEmail(this.email)) {
        this.emptyFields = true;
        this.emailError = true;
        this.emailMessage = "Invalid E-mail Address";
        return false;
      }

      if (!this.email || !this.validEmail(this.email) || !this.password) {
        this.emptyFields = true;
        return false;
      }

      this.emailMessage = "";
      this.emptyFields = false;
      this.emailError = false;
      this.formError = false;
      return true;
    },
    saveData: function () {
      this.formStatus = false;

      this.setActionLoading(true);

      const url = `${this.hrmURL}/v1.0/OAuth/login`;

      let email = this.email;
      let password = this.password;

      var data = {
        Email: email,
        RequestId: this.RequestId,
        Password: password,
        AppId: this.AppId,
      };

      axios
        .post(url, data)
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            if (response.data.data.emailConfirmed) {
              const twoFactor = response.data.data.token.twoFactorToken;
              const data = response.data.data;
              const token = response.data.data.token.token;
              const expireTo = response.data.data.token.expireTo;
              if (twoFactor) {
                this.setActionLoading(false);

                let loginPayload = {
                  token: twoFactor,
                  code: data.code,
                  expiresAt: expireTo,
                };
                this.sendLoginDetailsToState(loginPayload);
                this.setTwoFactorModal(true);
              } else {
                this.expiresAt = expireTo;
                this.userCode = data.code;
                this.UserToken = token;

                this.login(data);

                this.fetchUserData(data.code);
              }
            } else {
              setTimeout(() => {
                this.$router.push({ path: "/confirm" });
              }, 1500);
            }
          } else {
            // console.log(response);
            this.formStatus = true;
            this.formMessage = response.data.message;
            this.formText = "Login";
            this.emptyFields = true;
            this.processing = false;

            let payload = {
              type: "error",
              status: true,
              message: response.data.message,
            };

            this.setActionLoading(false);
            setTimeout(() => {
              this.setAlertModalStatus(payload);
            }, 200);

            this.clearMsg();
          }
        })
        .catch((err) => {
          console.log(err);
          this.formText = "Login";
          this.emailError = false;
          this.passwordError = false;
          this.emptyFields = true;
          this.processing = false;
          this.clearMsg();
          this.serverErrorMessage();
        });
    },
    clearMsg: function () {
      this.email = "";
      this.password = "";
    },
    toggleShowPassword: function () {
      this.showpassword = !this.showpassword;
    },
    // email validation
    validEmail: function (email) {
      var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test(email);
    },

    fetchUserData: function (code) {
      var bankData = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Country: "NG",
      };

      this.fetchBankNames(bankData);

      let data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: code,
      };
      const url = `${this.hrmURL}/v1.0/Dashboard/getDashboardInfo`;

      axios
        .post(url, data)
        .then((response) => {
          if (response.data.success) {
            const data = response.data.data;
            console.log(data);

            let userRole = data.userInfo.user.roles;

            let adminRole;

            if (userRole) {
              adminRole = userRole.includes("systemadmin");
            }

            if (adminRole) {
              // console.log(adminRole);
              sessionStorage.setItem("draggerability", "expandedCol");
            }

            let payload;

            this.setActionLoading(false);
            payload = {
              status: true,
              type: "success",
              message: "Login Successfull",
            };
            this.setAlertModalStatus(payload);

            sessionStorage.setItem("appUserThemeSettingsCode", this.UserToken);
            sessionStorage.setItem("activeformations", this.userCode);
            axios.defaults.headers.common["Authorization"] = this.UserToken;

            // setTimeout(() => {
            //   payload = {
            //     status: true,
            //     type: "success",
            //     message: "Redirecting, Please wait ...",
            //   };
            //   this.$store.dispatch("setAlertModalStatus", payload);
            // }, 1500);

            setTimeout(() => {
              this.saveUserData(data);
              payload = {
                status: false,
                type: "",
                message: "",
              };
              this.setAlertModalStatus(payload);
              this.$router.push({ path: "/dashboard" });
            }, 1500);

            setTimeout(() => {
              this.getPaymentFeeInfo();
            }, 2500);

            this.formStatus = false;
            this.formText = "Login";

            this.emptyFields = true;
            this.processing = false;
          }
        })
        .catch((err) => {
          this.formStatus = false;
          this.formText = "Login";

          this.emptyFields = true;
          this.processing = false;

          this.serverErrorMessage();
          console.log(err);
        });
    },
  },
};
</script>
<style></style>
