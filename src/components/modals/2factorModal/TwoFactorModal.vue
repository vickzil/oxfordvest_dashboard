<template>
  <transition name="fade">
    <div class="page_processing_modal" v-if="twoFactorModal">
      <div class="page_processing_card">
        <h4>Verify Two Factor Authentication(2FA) Code</h4>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group c_form_group">
              <label><b>Authentication Code</b></label>
              <input
                class="form-control"
                placeholder="Enter code"
                autofocus
                type="text"
                @input="processForm"
                v-model.trim="authCode"
              />
            </div>
          </div>
        </div>
        <div class="for_flex">
          <button
            class="btn btn-light btn-sm mr-3"
            @click="closeTwoFactorModal"
            :disabled="processing"
            style="border: 1px solid #ced4da !important"
          >
            Cancel
          </button>

          <button
            :disabled="emptyField"
            class="btn btn-success btn-sm"
            @click="SubmitForm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
import "@/mixins";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "twoFactorModal",
      "loginToken",
      "loginUserCode",
      "loginUserExpiry",
    ]),
    expiresAt: {
      get: function () {
        return sessionStorage.getItem("appexrat");
      },
      set: function (expiresIn) {
        return sessionStorage.setItem("appexrat", expiresIn);
      },
    },
  },

  data() {
    return {
      authCode: "",
      emptyField: true,
      processing: false,
    };
  },

  methods: {
    ...mapActions([
      "setTwoFactorModal",
      "setActionLoading",
      "setAlertModalStatus",
      "saveUserData",
      "getPaymentFeeInfo",
      "fetchBankNames",
      "sendLoginDetailsToState",
    ]),

    closeTwoFactorModal: function () {
      if (!this.processing) {
        this.setTwoFactorModal(false);
        this.authCode = "";
        this.emptyField = true;
        this.processing = false;
      }
    },
    processForm: function () {
      if (!this.authCode) {
        this.emptyField = true;
        this.processing = false;

        return;
      }

      this.emptyField = false;
      this.processing = true;
    },

    SubmitForm: function () {
      this.setActionLoading(true);
      this.emptyField = true;

      this.send2FactorCodeToDb();
    },

    send2FactorCodeToDb: function () {
      const url = `${this.hrmURL}/v1.0/OAuth/validate2FATokenAsync`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.loginUserCode,
        Token: this.authCode,
      };

      // console.log(data);

      axios
        .post(url, data)
        .then((response) => {
          console.log(response);

          this.emptyField = false;
          this.processing = false;

          if (response.data.success == true) {
            this.fetchUserData();
          } else {
            let payload = {
              status: true,
              type: "error",
              message: response.data.message,
            };
            this.setActionLoading(false);
            this.setAlertModalStatus(payload);
            this.authCode = "";
          }
        })
        .catch((err) => {
          err;
          this.emptyField = false;
          this.processing = false;
          this.serverErrorMessage();
        });
    },

    fetchUserData: function () {
      this.setActionLoading(true);

      var bankData = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Country: "NG",
      };

      this.fetchBankNames(bankData);

      let data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.loginUserCode,
      };
      const url = `${this.hrmURL}/v1.0/Dashboard/getDashboardInfo`;

      axios
        .post(url, data)
        .then((response) => {
          this.setTwoFactorModal(false);
          this.authCode = "";
          if (response.data.success) {
            const data = response.data.data;

            let loginPayload = {
              token: null,
              code: null,
              expiresAt: null,
            };
            this.sendLoginDetailsToState(loginPayload);
            // console.log(data);

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
              message: "Two Factor Code Verified!!",
            };
            this.setAlertModalStatus(payload);
            this.expiresAt = this.loginUserExpiry;
            sessionStorage.setItem("appUserThemeSettingsCode", this.loginToken);
            sessionStorage.setItem("activeformations", this.loginUserCode);
            axios.defaults.headers.common["Authorization"] = this.loginToken;

            setTimeout(() => {
              this.saveUserData(data);
              let payload = {
                status: false,
                type: "",
                message: "",
              };
              this.setAlertModalStatus(payload);
              this.$router.push({ path: "/dashboard" });
            }, 1500);

            setTimeout(() => {
              this.getPaymentFeeInfo();
              // this.inactivityTime();
            }, 2500);
          }
        })
        .catch((err) => {
          this.serverErrorMessage();
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15 ease-out !important;
}

.fade-enter,
.fade-leave-to {
  opacity: 0 !important;
}
.page_processing_modal {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: rgba(99, 94, 94, 0.699);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 110000000000000000000000000000000000000000000 !important;
  transition: 800ms ease;
}

.page_processing_card {
  background: rgb(255, 255, 255);
  width: 500px;
  height: 300px;
  padding: 20px;

  border-radius: 3%;
  box-shadow: 3px 6px 10px 0 rgb(0 102 245 / 7%);
  text-align: center;
}

.for_flex {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 450px;
  margin: 20px auto 0px;
}

.page_processing_card h4 {
  font-weight: bold;
  font-size: 17px;
  /* margin-top: 20px; */
  margin-bottom: 20px;
}

.page_processing_card p {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 19px;
}

.page_processing_card .form-group {
  width: 70% !important;
  margin: 30px auto;
}

.page_processing_card button {
  /* width: 38%; */
  font-weight: bold;
  cursor: pointer;
}
.page_processing_card img {
  width: 50px;
}

@media screen and (max-width: 550px) {
  .page_processing_card {
    width: 95%;
    margin: auto;
  }

  .page_processing_card .form-group {
    width: 90% !important;
    margin: 30px auto;
  }
  .for_flex {
    width: 100%;
  }
}
</style>
