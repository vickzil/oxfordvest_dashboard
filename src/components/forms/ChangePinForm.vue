<template>
  <div class="card">
    <div class="body">
      <form class="" v-on:submit.prevent="changePin">
        <div class="row clearfix">
          <div class="col-lg-8 col-md-8 col-sm-12">
            <h6>Change Pin</h6>
            <br /><br />
            <div class="form-group">
              <div class="text-md-left">
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="resendPin"
                >
                  Resend Pin <i class="fa fa-repeat ml-2"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <transition name="fade">
                <p
                  style="
                    color: red !important;
                    font-size: 13px !important;
                    margin-top: 15px;
                  "
                  v-if="pinError"
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
                  {{ pinMessage }}
                </p>
              </transition>
            </div>
            <div class="form-group c_form_group">
              <label><b>Old Pin</b></label>
              <input
                class="form-control"
                placeholder="Enter old pin"
                :type="showCurrentPin ? 'text' : 'password'"
                @input="checkInputform"
                v-model.trim="currentPin"
              />
              <span
                toggle="#password-field"
                @click="toggleshowCurrentPin"
                :class="showCurrentPin && 'fa-eye-slash'"
                class="fa fa-fw fa-eye field-icon"
              ></span>
            </div>
            <div class="form-group c_form_group">
              <label><b>New Pin</b></label>
              <input
                :type="showpin ? 'text' : 'password'"
                class="form-control"
                @input="checkInputform"
                placeholder="Enter new pin"
                v-model.trim="pin"
              />
              <span
                toggle="#pin-field"
                @click="toggleshowpin"
                :class="showpin && 'fa-eye-slash'"
                class="fa fa-fw fa-eye field-icon"
              ></span>
            </div>

            <div class="form-group mt-4 text-md-right text-sm-center">
              <button type="submit" class="oxfordvest_buttons">
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
      pin: "",
      formStatus: false,
      processing: false,
      pinError: false,
      formMessage: "",
      statusMessage: "",
      emptyFields: true,
      formError: false,
      showpin: false,
      currentPin: "",
      cpin: "",
      formText: "Change pin",
      showCurrentPin: false,
      showConfirmpin: false,
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
    checkcurrentPin: function () {
      if (!this.currentPin) {
        this.emptyFields = true;
      } else {
        this.emptyFields = false;
      }
    },

    toggleshowCurrentPin: function () {
      this.showCurrentPin = !this.showCurrentPin;
    },
    toggleshowpin: function () {
      this.showpin = !this.showpin;
    },

    checkInputform: function () {
      if (!this.currentPin || !this.pin) {
        this.pinError = true;
        this.pinMessage = "Please fill out these fields";
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      this.pinError = false;
      this.formError = false;
      return true;
    },

    changePin: function () {
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

      const url = `${this.hrmURL}/v1.0/OAuth/changePin`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.user.email,
        OldPIN: this.currentPin,
        NewPIN: this.pin,
        ConfirmNewPIN: this.pin,
      };

      // console.log(data);

      axios
        .post(url, data)
        .then((response) => {
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Change pin";
          let payload;

          if (response.data.success == true) {
            payload = {
              status: true,
              type: "success",
              message: "pin changed successfully!!",
            };

            this.currentPin = "";
            this.pin = "";
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
          this.formText = "Change pin";

          this.serverErrorMessage();
        });
    },

    resendPin: function () {
      this.setActionLoading(true);

      const url = `${this.hrmURL}/v1.0/OAuth/resendTransactionPIN`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.user.userInfo.user.code,
      };

      axios
        .post(url, data)
        .then((response) => {
          this.setActionLoading(false);

          let payload;

          if (response.data.success == true) {
            payload = {
              status: true,
              type: "success",
              message: "Request Successfull. Please Check your email ",
            };
          } else {
            payload = {
              status: true,
              type: "error",
              message: response.data.message,
            };
          }

          console.log(response);

          this.setAlertModalStatus(payload);
        })
        .catch((error) => {
          error;
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
