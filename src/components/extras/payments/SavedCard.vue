<template>
  <div class="card animated px-4" v-if="savedCardModal">
    <br />
    <button class="btn bg-light hrm_button" @click="goBack">
      <i class="fa fa-arrow-left"></i> Back
    </button>
    <br /><br />
    <div class="mt-md-5" style="padding: 0px !important">
      <div class="" style="padding: 0px !important">
        <div>
          <form id="form_fd" v-on:submit.prevent="submitForm">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group c_form_group">
                  <label>Select Card</label>
                  <select
                    class="form-control show-tick"
                    v-model.trim="savedcard"
                    @change="checkform"
                  >
                    <option value="">Select Card</option>
                    <option
                      :value="savedcard.code"
                      v-for="savedcard in savedCards"
                      :key="savedcard.code"
                      :selected="savedcard.code === savedcard"
                    >
                      {{ savedcard.alias + ` (${savedcard.cardBankName})` }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group c_form_group">
                  <label>Amount</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model.trim="amount"
                    @input="checkform"
                  />
                  <transition name="fade">
                    <p
                      v-if="inputError"
                      style="
                        color: red !important;
                        font-size: 13px !important;
                        margin-top: 15px;
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
                      {{ inputMessage }}
                    </p>
                  </transition>
                </div>
              </div>
            </div>
            <div class="text-right pt-3 mt-3">
              <button
                type="submit"
                class="btn btn-danger btn-lg payment_buttion"
                v-bind:disabled="processing || emptyFields"
              >
                {{ buttonText }}
                <span
                  class="spinner-border spinner-border-sm ml-2"
                  role="status"
                  aria-hidden="true"
                  v-if="processing"
                ></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import $ from "jquery";
import "@/mixins";

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      savedcard: "",
      inputMessage: "",
      raveResponse: false,
      amount: 200,
      inputError: false,
      emptyFields: true,
      processing: false,
      formError: false,
      buttonText: "Pay Now",
    };
  },
  computed: {
    ...mapGetters(["savedCardModal", "clickedPaymentType"]),
    savedCards() {
      return this.user.fundWalletOptions.bySavedCards;
    },
  },

  methods: {
    ...mapActions([
      "closePaymentOptions",
      "paymentOptionsBack",
      "setAlertModalStatus",
      "setFundWalletLoading",
      "closeSavedCardsModal",
      "fetchUserData",
    ]),
    closeSavedCards: function () {
      if (!this.processing) {
        this.closeSavedCardsModal();
        this.amount = 200;
      }
    },

    submitForm: function () {
      this.errorMessage = "";
      this.showError = false;
      if (this.formError == false && this.emptyFields == false) {
        this.submitPaymentBySavedCard();
        return true;
      } else {
        this.checkform();
        return false;
      }
    },
    checkform: function () {
      // console.log(this.savedcard);
      if (isNaN(this.amount)) {
        this.amount = parseInt(this.amount.replace(/[,]/g, ""));
      }

      if (this.amount < 100) {
        this.inputMessage = "Amount must be up to 200 and above";
        this.inputError = true;
        this.emptyFields = true;

        return false;
      }
      if (!this.savedcard) {
        this.inputError = false;
        this.emptyFields = true;
        return false;
      }

      this.inputMessage = "";
      this.inputError = false;
      this.emptyFields = false;

      return true;
    },

    goBack: function () {
      this.$store.state.paymentOptionTitle = "Fill Out This Field ";
      this.paymentOptionsBack();
      this.amount = 100;
      this.savedcard = "";
      this.processing = false;
      this.buttonText = "Proceed";
      this.emptyFields = true;
      this.inputError = false;
      this.formError = false;
      this.errorMessage = "";
      this.showError = false;
    },

    submitPaymentBySavedCard: function () {
      this.setFundWalletLoading(true);

      const url = `${this.walletURL}/v1.0/Card/debitSavedUserCard`;

      if (isNaN(this.amount)) {
        this.amount = parseInt(this.amount.replace(/[,]/g, ""));
      }

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.user.email,
        UserCardCode: this.savedcard,
        Amount: this.amount,
      };

      // console.log(data);

      axios
        .post(url, data)
        .then((response) => {
          let payload;
          this.setFundWalletLoading(false);

          if (response.data.success) {
            payload = {
              status: true,
              type: "success",
              message: "Payment successfully",
            };

            let userCode = this.user.userInfo.user.code;
            this.fetchUserData(userCode);

            let routerPath = this.$router.history.current.path;

            this.$router.push({ path: "/dashboard" });
            setTimeout(() => {
              this.$router.push({ path: routerPath });
            }, 900);
          } else {
            payload = {
              status: true,
              type: "error",
              message: response.data.message,
            };
          }

          // console.log(response);

          this.setAlertModalStatus(payload);
        })
        .catch((err) => {
          console.log(err);

          this.serverErrorMessage();
          this.setFundWalletLoading(false);
        });
    },
  },
  watch: {
    amount: function (newValue) {
      let result = newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.amount = result));
    },
  },

  mounted() {},
};
</script>
<style scoped>
.payment_buttion {
  background: rgb(255, 0, 0) !important;
  border-radius: 4px;
  transition: 800ms ease;
  font-weight: bold;
  padding: 10px 20px;
  box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
  border: none;
}

.payment_buttion {
  /* border: 1px solid red !important; */
  color: rgb(238, 238, 238) !important;
}

.payment_buttion:hover {
  background: rgb(167, 3, 3) !important;
  color: white !important;
}

#form_fd {
  width: 60%;
  margin: auto;
}

#form_fd input {
  background-color: #fff;
  padding: 8px;
  border: none;
  border-radius: 2px;
  font-size: 16px;
  outline: none;
  display: inline;
  border: 1px solid #ced4da;
  text-rendering: geometricPrecision;
  color: #3d1403;
  transition: border-color 0.3s ease;
}

.table-responsive::-webkit-scrollbar {
  -webkit-appearance: none;
}

.table-responsive::-webkit-scrollbar:vertical {
  width: 12px;
}

.table-responsive::-webkit-scrollbar:horizontal {
  height: 12px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: 2px solid #ffffff;
}

.table-responsive::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #ffffff;
}

@media screen and (max-width: 600px) {
  #form_fd {
    width: 95%;
    margin: auto;
  }
}
</style>
