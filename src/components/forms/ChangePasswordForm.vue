<template>
  <div class="card">
    <div class="body">
      <form class="" v-on:submit.prevent="changePassword">
        <div class="row clearfix">
          <div class="col-lg-8 col-md-8 col-sm-12">
            <h6>Change Password</h6>
            <br /><br />

            <div class="form-group c_form_group">
              <transition name="fade">
                <p
                  style="
                    color: red !important;
                    font-size: 13px !important;
                    margin-top: 15px;
                  "
                  v-if="passwordError"
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
                  {{ passwordMessage }}
                </p>
              </transition>
            </div>
            <div class="form-group c_form_group">
              <label><b>Old password</b></label>
              <input
                class="form-control"
                placeholder="Enter old Password"
                :type="showCurrentpassword ? 'text' : 'password'"
                @input="checkInputform"
                v-model.trim="currentPassword"
              />
              <span
                toggle="#password-field"
                @click="toggleShowCurrentPassword"
                :class="showCurrentpassword && 'fa-eye-slash'"
                class="fa fa-fw fa-eye field-icon"
              ></span>
            </div>
            <div class="form-group c_form_group">
              <label><b>New password</b></label>
              <input
                :type="showpassword ? 'text' : 'password'"
                class="form-control"
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
            </div>
          </div>
          <div class="col-sm-12 m-t-20 text-md-right text-sm-center">
            <button
              type="button"
              class="oxfordvest_buttons"
              @click="changePassword"
            >
              {{ formText }}
              <span
                class="spinner-border spinner-border-sm ml-2"
                role="status"
                aria-hidden="true"
                v-if="processing"
              ></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "@/mixins";
import axios from "axios";

import { mapActions } from "vuex";
export default {
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
      formText: "Change password",
      showCurrentpassword: false,
      showConfirmPassword: false,
      hasError: true,
    };
  },

  methods: {
    ...mapActions([
      "setActionLoading",
      "login",
      "setAlertModalStatus",
      "fetchBankNames",
      "saveUserData",
    ]),
    checkCurrentpassword: function () {
      if (!this.currentPassword) {
        this.emptyFields = true;
      } else {
        this.emptyFields = false;
      }
    },

    toggleShowCurrentPassword: function () {
      this.showCurrentpassword = !this.showCurrentpassword;
    },
    toggleShowPassword: function () {
      this.showpassword = !this.showpassword;
    },

    checkInputform: function () {
      if (!this.currentPassword || !this.password) {
        this.passwordError = true;
        this.passwordMessage = "P;ease fill out these fields";
        this.emptyFields = true;
        return false;
      }

      if (this.password && this.password.length < 8) {
        this.passwordError = true;
        this.passwordMessage = "Passwords must be at least 8 characters.";
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      this.passwordError = false;
      this.formError = false;
      return true;
    },

    changePassword: function () {
      if (this.emptyFields == false) {
        this.submitForm();
        return true;
      } else {
        this.checkInputform();
      }
    },

    submitForm: function () {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";

      const url = `${this.hrmURL}/v1.0/OAuth/changePassword`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.user.email,
        CurrentPassword: this.currentPassword,
        NewPassword: this.password,
        ConfirmNewPassword: this.password,
      };

      // console.log(data);

      axios
        .post(url, data)
        .then((response) => {
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Change password";
          let payload;

          if (response.data.success == true) {
            payload = {
              status: true,
              type: "success",
              message: "Password changed successfully!!",
            };

            this.currentPassword = "";
            this.password = "";
          } else {
            payload = {
              status: true,
              type: "error",
              message: response.data.message,
            };
          }
          this.setAlertModalStatus(payload);
        })
        .catch((err) => {
          err;
          this.emptyFields = true;
          this.processing = false;
          this.formText = "Change password";

          this.serverErrorMessage();
        });
    },
  },
};
</script>

<style scoped>
.field-icon {
  margin-top: -29px;
}
</style>
