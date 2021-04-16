<template>
  <div class="card">
    <div class="body">
      <h6><b>Account Protection</b></h6>
      <div class="row clearfix" v-if="showTwoFactorForm">
        <div class="col-lg-5 col-md-5 col-sm-12">
          <br /><br />
          <div class="form-group">
            <!-- <div class="row">
              <div class="col-md-8 mt-md-3 mb-3">
                <h5>Bank Verification Number (BVN)</h5>
              </div>
              <div class="col-md-4 text-md-right mt-2">
                <div>
                  <p
                    class="text-secondary"
                    v-if="user.userInfo.user.bvn !== 'null'"
                  >
                    {{ user.userInfo.user.bvn }}
                    {{ getHiddenBvn }}
                  </p>
                  <button
                    v-else
                    class="btn btn-danger oxfordvest_button"
                    @click="showBvnModal"
                  >
                    Add Bvn
                  </button>
                </div>
              </div>
            </div>
            <br /><br /> -->
            <div class="row">
              <div class="col-md-7">
                <h5>
                  Two-Factor Authentication
                  <i
                    class="fa fa-question-circle ml-4"
                    @click="showTwoFactorMessageInfo"
                    style="
                      cursor: pointer;
                      display: inline-block;
                      font-size: 14px;
                      color: #626569;
                    "
                  ></i>
                </h5>
                <p class="mb-3">
                  Protect your Oxfordvest account from unauthorized transactions
                  using a software token.
                </p>
              </div>
              <div class="col-md-5 text-md-right mt-md-4 mt-sm-4">
                <div class="d-flex justify-content-center align-items-center">
                  <label class="switch dark_mode">
                    <input
                      type="checkbox"
                      :checked="twoFactorEnable"
                      @change="showAuthForms()"
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-7">
                <h5>
                  Anti-phishing
                  <i
                    class="fa fa-question-circle ml-4"
                    @click="showTwoFactorMessageInfo"
                    style="
                      cursor: pointer;
                      display: inline-block;
                      font-size: 14px;
                      color: #626569;
                    "
                  ></i>
                </h5>
                <p class="mb-3">
                  Protect your Oxfordvest account from unauthorized Emails.
                </p>
              </div>
              <div class="col-md-5 text-md-right mt-md-4 mt-sm-4">
                <div class="d-flex justify-content-center align-items-center">
                  <a
                    href="javascript:void(0)"
                    @click="showPhishingModal"
                    class="btn btn-danger btn-sm oxfordvest_button"
                    >Set Up</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <TwoFactorAuthForm v-else /> -->
    </div>
  </div>
</template>

<script>
import "@/mixins";
// import TwoFactorAuthForm from "../../forms/TwoFactorAuthForm";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    // TwoFactorAuthForm,
  },
  computed: {
    getHiddenBvn() {
      let initialBVn = this.user.userInfo.user.bvn;
      let firstThreeWord = initialBVn.slice(0, 3);
      let LastThreeWord = initialBVn.slice(initialBVn.length - 3);

      return firstThreeWord + "******" + LastThreeWord;
    },
  },
  data() {
    return {
      showTwoFactorForm: true,
      twoFactorEnable: false,
    };
  },

  methods: {
    ...mapActions([
      "setBvnModal",
      "setActionLoading",
      "login",
      "setAlertModalStatus",
      "fetchBankNames",
      "saveUserData",
      "setPhishingModal",
    ]),
    showAuthForms: function () {
      // event.preventDefault();
      // console.log(event.target.value);
      this.twoFactorEnable = !this.twoFactorEnable;

      // console.log(this.twoFactorEnable);
      this.setActionLoading(true);

      this.send2FactorToDb();
    },
    showPhishingModal: function () {
      this.setActionLoading(true);

      setTimeout(() => {
        this.setActionLoading(false);
        this.setPhishingModal(true);
      }, 1800);
    },

    showTwoFactorMessageInfo: function () {
      let payload = {
        status: true,
        type: "success",
        message:
          "2FA adds an extra layer of security to your account by generating a secure code on your device for approving transactions.",
      };
      this.setAlertModalStatus(payload);
    },
    showBvnModal: function () {
      this.setBvnModal(true);
    },
    send2FactorToDb: function () {
      const url = `${this.hrmURL}/v1.0/OAuth/updateTwoFactorAuthentication`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.user.userInfo.user.code,
        TwoFactorEnabled: this.twoFactorEnable,
      };

      // console.log(data);

      axios
        .post(url, data)
        .then((response) => {
          // console.log(response);
          this.setActionLoading(false);

          if (response.data.success == true) {
            let newMessage;
            let type;

            if (this.twoFactorEnable) {
              newMessage = "Two Factor Authentication Enabled";
              type = "success";
            } else {
              newMessage = "Two Factor Authentication disabled";
              type = "error";
            }

            let payload = {
              status: true,
              type: type,
              message: newMessage,
            };

            this.setAlertModalStatus(payload);
          }

          // this.setAlertModalStatus(payload);
        })
        .catch((err) => {
          err;
          this.serverErrorMessage();
        });
    },
  },

  mounted() {
    this.showTwoFactorForm = true;
  },
};
</script>

<style scoped>
.field-icon {
  margin-top: -29px;
}

h5 {
  font-weight: bold;
  color: rgb(136, 0, 0);
  font-size: 18px;
}
p {
  line-height: 1.7;
  margin-top: 10px;
}
</style>
