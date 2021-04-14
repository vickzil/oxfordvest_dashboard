<template>
  <div class="card animated px-4" v-if="PaymentFormModal">
    <br />
    <button class="btn bg-light hrm_button" @click="goBack">
      <i class="fa fa-arrow-left"></i> Back
    </button>
    <br /><br />
    <div class="" style="padding: 0px !important">
      <div class="" style="padding: 0px !important">
        <div v-if="!payWithPaystack && !payWithRave">
          <form id="form_fd" v-on:submit.prevent="submitForm">
            <p class="alert alert-error" v-if="showError">{{ errorMessage }}</p>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group c_form_group">
                  <label>Currency</label>
                  <select
                    class="form-control show-tick"
                    v-model.trim="currency"
                    @change="checkform"
                  >
                    <option value="">Select Currency</option>
                    <option
                      :value="currency.code"
                      v-for="currency in currencies"
                      :key="currency.code"
                      :selected="currency.code === currency"
                    >
                      {{ currency.name + ` (${currency.code})` }}
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
        <div class="text-center" v-if="payWithPaystack">
          <p>{{ clickedPaymentType.message }}</p>
          <PaystackPaymentTable
            :paymentForPaystackInfo="paymentForPaystackInfo"
            :currency="currency"
          />
          <br /><br />
          <Paystack
            :paystackkey="paystackkeyKey"
            :reference="paymentForPaystackInfo.reference"
            :callback="callback"
            :amount="Math.trunc(paymentForPaystackInfo.totalDebit) * 100"
            :currency="paymentForPaystackInfo.currency"
            :firstname="user.userInfo.user.firstName"
            :lastname="user.userInfo.user.lastName"
            :email="user.userInfo.user.email"
            :close="close"
            :embed="false"
            class="btn btn-danger btn-lg payment_buttion"
          >
            Confirm Payment
            <i class="fe fe-credit-card ml-2"></i>
          </Paystack>
          <div>
            <br /><br />
            <img
              style="border-radius: 3px"
              class="bg-dark py-1 px-1"
              src="@/assets/images/secure-white.e212765.svg"
              alt=""
            />
          </div>
        </div>
        <div class="text-center" v-if="payWithRave">
          <p>{{ clickedPaymentType.message }}</p>

          <RavePaymentTable
            :paymentForRaveInfo="paymentForRaveInfo"
            :currency="currency"
          />

          <br /><br />
          <!--    clickedPaymentType.publicKey -->
          <Rave
            style-class="btn btn-danger btn-lg payment_buttion"
            :email="user.userInfo.user.email"
            :amount="Math.trunc(paymentForRaveInfo.totalDebit)"
            :reference="paymentForRaveInfo.reference"
            :rave-key="ravekeyKey"
            :callback="processRave"
            :close="closeRave"
            :paymentPlan="plan"
            :customerFirstname="user.userInfo.user.firstName"
            :customerLastname="user.userInfo.user.lastName"
            paymentOptions="card,barter,account,ussd"
            hostedPayemt="1"
            customTitle="Fund your Wallet"
            :currency="currency"
          >
            Confirm Payment <i class="fe fe-credit-card ml-2"></i
          ></Rave>
          <div>
            <br /><br />
            <div
              class="secured__badge bg-dark py-0 px-1 text-white"
              style="
                display: inline-block !important;
                border-radius: 3px !important;
              "
            >
              <div
                style="display: inline !important; font-size: 11px !important"
                class="secured__badge__text"
              >
                <span
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <svg height="9.599999999999909" width="8">
                    <defs>
                      <path
                        id="path-0"
                        opacity="1"
                        d="M3.9932318000000038,0.7706122399999913 C5.211505900000002,0.7706122399999913 6.226734300000004,1.724081599999991 6.226734300000004,2.912653099999993 L6.226734300000004,3.7224489999999903 L1.7597293000000036,3.7224489999999903 L1.7597293000000036,2.912653099999993 C1.7597293000000036,1.7371428999999914 2.774957700000005,0.7706122399999913 3.9932318000000038,0.7706122399999913 L3.9932318000000038,0.7706122399999913ZM4.006768200000021,5.407346899999993 C4.426395900000021,5.407346899999993 4.7648054000000215,5.7338775999999925 4.7648054000000215,6.138775499999994 C4.7648054000000215,6.386938799999992 4.642978000000021,6.556734699999993 4.453468700000023,6.687346899999994 L4.670050800000023,7.902040799999995 L3.3434856000000224,7.902040799999995 L3.5600677000000225,6.700408199999991 C3.3705584000000215,6.5697958999999955 3.2487310000000207,6.373877599999993 3.2487310000000207,6.138775499999994 C3.2487310000000207,5.7338775999999925 3.5871404000000204,5.407346899999993 4.006768200000021,5.407346899999993 L4.006768200000021,5.407346899999993ZM3.9932318,0 C2.3282571999999995,0 0.9475465000000014,1.3061223999999996 0.9475465000000014,2.9126531 L0.9475465000000014,3.7224489999999975 L0.4602368999999982,3.7224489999999975 C0.18950929999999744,3.7224489999999975 0,4.048979599999999 0,4.3102041 L0,9.234285700000001 C0,9.495510199999998 0.18950929999999744,9.600000000000001 0.4602368999999982,9.600000000000001 L7.5803723000000005,9.600000000000001 C7.8510998,9.600000000000001 8,9.495510199999998 8,9.234285700000001 L8,4.3102041 C7.9864636,4.048979599999999 7.824027099999999,3.7224489999999975 7.566835900000001,3.7224489999999975 L7.038917100000003,3.7224489999999975 L7.038917100000003,2.9126531 C7.038917099999999,1.3061223999999996 5.658206400000001,0 3.9932318,0 L3.9932318,0Z"
                      ></path>
                    </defs>
                    <g transform="translate(0, 0) ">
                      <use
                        xlink:href="#path-0"
                        fill="#f5a623"
                        fill-opacity="1"
                      ></use>
                    </g>
                  </svg>
                  <span class="ml-1">secured by flutterwave</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import "@/mixins";
import Paystack from "vue-paystack";
import Rave from "vue-ravepayment";
import PaystackPaymentTable from "./PaystackPaymentTable";
import RavePaymentTable from "./RavePaymentTable";

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      plan: 2333,
      meta: [
        {
          metaname: "school",
          metavalue: "high school",
        },
      ],
      sub: [
        {
          id: "1324",
        },
        {
          id: "1221",
        },
      ],
      inputMessage: "",
      raveResponse: false,
    };
  },

  components: {
    Paystack,
    Rave,
    PaystackPaymentTable,
    RavePaymentTable,
  },
  computed: {
    ...mapGetters(["PaymentFormModal", "clickedPaymentType"]),

    amount: {
      get() {
        return this.$store.state.amount;
      },
      set(value) {
        return (this.$store.state.amount = value);
      },
    },
    currency: {
      get() {
        return this.$store.state.currency;
      },
      set(value) {
        return (this.$store.state.currency = value);
      },
    },
    processing: {
      get() {
        return this.$store.state.processing;
      },
      set(value) {
        return (this.$store.state.processing = value);
      },
    },
    buttonText: {
      get() {
        return this.$store.state.buttonText;
      },
      set(value) {
        return (this.$store.state.buttonText = value);
      },
    },
    emptyFields: {
      get() {
        return this.$store.state.emptyFields;
      },
      set(value) {
        return (this.$store.state.emptyFields = value);
      },
    },
    inputError: {
      get() {
        return this.$store.state.inputError;
      },
      set(value) {
        return (this.$store.state.inputError = value);
      },
    },
    formError: {
      get() {
        return this.$store.state.formError;
      },
      set(value) {
        return (this.$store.state.formError = value);
      },
    },
    payWithPaystack: {
      get() {
        return this.$store.state.payWithPaystack;
      },
      set(value) {
        return (this.$store.state.payWithPaystack = value);
      },
    },
    payWithRave: {
      get() {
        return this.$store.state.payWithRave;
      },
      set(value) {
        return (this.$store.state.payWithRave = value);
      },
    },
    paymentForPaystackInfo: {
      get() {
        return this.$store.state.paymentForPaystackInfo;
      },
      set(value) {
        return (this.$store.state.paymentForPaystackInfo = value);
      },
    },
    paymentForRaveInfo: {
      get() {
        return this.$store.state.paymentForRaveInfo;
      },
      set(value) {
        return (this.$store.state.paymentForRaveInfo = value);
      },
    },
    errorMessage: {
      get() {
        return this.$store.state.errorMessage;
      },
      set(value) {
        return (this.$store.state.errorMessage = value);
      },
    },
    showError: {
      get() {
        return this.$store.state.showError;
      },
      set(value) {
        return (this.$store.state.showError = value);
      },
    },
    PaymentFormModal() {
      return this.$store.getters.PaymentFormModal;
    },
    paystackkeyKey() {
      return this.clickedPaymentType.publicKey;
      //   return this.clickedPaymentType.secreteKey;
    },
    ravekeyKey() {
      return this.clickedPaymentType.publicKey;
    },
    provider() {
      // console.log(this.clickedPaymentType);
      return this.clickedPaymentType.provider;
    },
    currencies() {
      return this.user.fundWalletOptions.currencies;
    },
  },

  methods: {
    ...mapActions([
      "closePaymentOptions",
      "paymentOptionsBack",
      "setAlertModalStatus",
      "closePaymentOptions",
      "setFundWalletLoading",
    ]),
    closePaymentOptionsModal: function () {
      if (!this.processing) {
        this.closePaymentOptions();
        this.amount = 0;
        this.currency = "";
        this.processing = false;
        this.buttonText = "Proceed";
        this.emptyFields = true;
        this.inputError = false;
        this.formError = false;
        this.payWithPaystack = false;
        this.payWithRave = false;
        this.paymentForPaystackInfo = null;
        this.paymentForRaveInfo = null;
        this.errorMessage = "";
        this.showError = false;
      }
    },
    checkInput: function () {
      // var regex = /^[0-9]+$/;
      // if (!input.match(regex)) {
      //   this.inputError = true;
      //   this.emptyFields = true;
      //   this.inputMessage = "please input must be numbers.";
      //   return false;
      // }

      if (isNaN(this.amount)) {
        this.amount = parseInt(this.amount.replace(/[,]/g, ""));
      }

      if (this.currency == "NGN" && this.amount < 100) {
        this.inputMessage = "Amount must be up to 100";
        this.inputError = true;
        this.emptyFields = true;

        return false;
      }
      if (!this.currency) {
        this.emptyFields = true;
        return false;
      }

      this.inputMessage = "";
      this.inputError = false;
      this.emptyFields = false;

      return true;
    },

    submitForm: function () {
      this.errorMessage = "";
      this.showError = false;
      if (this.formError == false && this.emptyFields == false) {
        this.paymentFeeInfo();

        return true;
      } else {
        this.checkform();
        return false;
      }
    },
    checkform: function () {
      // var regex = /^[0-9]+$/;
      // if (!this.amount.match(regex)) {
      //   this.inputError = true;
      //   this.emptyFields = true;
      //   this.inputMessage = "please input must be numbers.";
      //   return false;
      // }

      if (isNaN(this.amount)) {
        this.amount = parseInt(this.amount.replace(/[,]/g, ""));
      }

      if (this.currency == "NGN" && this.amount < 100) {
        this.inputMessage = "Amount must be up to 100";
        this.inputError = true;
        this.emptyFields = true;

        return false;
      }
      if (!this.currency) {
        this.emptyFields = true;
        return false;
      }

      this.inputMessage = "";
      this.inputError = false;
      this.emptyFields = false;

      return true;
    },

    paymentFeeInfo: function () {
      this.buttonText = "Please wait...";
      this.processing = true;

      const url = `${this.walletURL}/v1.0/PaymentFee/paymentFeeInfo`;

      if (isNaN(this.amount)) {
        this.amount = parseInt(this.amount.replace(/[,]/g, ""));
      }

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.user.email,
        Currency: this.currency,
        Amount: this.amount,
        Provider: this.provider,
      };

      // console.log(this.provider);

      axios
        .post(url, data)
        .then((res) => {
          this.processing = false;
          this.buttonText = "Proceed";

          if (res.data.success) {
            let responseData = res.data.data;

            // console.log(responseData);

            if (responseData.provider === "paystack") {
              this.paymentForPaystackInfo = responseData;

              // console.log(responseData);

              if (this.paymentForPaystackInfo) {
                this.payWithPaystack = true;
                this.payWithRave = false;
              }
            }

            if (responseData.provider === "rave") {
              this.paymentForRaveInfo = responseData;
              // console.log(responseData);

              if (this.paymentForRaveInfo) {
                this.payWithPaystack = false;
                this.payWithRave = true;
              }
            }

            this.$store.state.paymentOptionTitle = "Confirm payment";
          } else {
            this.showError = true;
            this.errorMessage = "Sorry, Server not reachable, Try again later";

            setTimeout(() => {
              this.closePaymentOptionsModal();
            }, 1200);
          }

          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
          this.processing = false;
          this.buttonText = "Proceed";
          this.serverErrorMessage();
        });
    },

    goBack: function () {
      if (this.payWithPaystack || this.payWithRave) {
        this.payWithPaystack = false;
        this.payWithRave = false;
      } else {
        this.$store.state.paymentOptionTitle = "Fill Out This Field ";
        this.paymentOptionsBack();
        this.amount = 100;
        this.currency = "";
        this.processing = false;
        this.buttonText = "Proceed";
        this.emptyFields = true;
        this.inputError = false;
        this.formError = false;
        this.payWithPaystack = false;
        this.payWithRave = false;
        this.paymentForPaystackInfo = null;
        this.paymentForRaveInfo = null;
        this.errorMessage = "";
        this.showError = false;
      }
    },

    callback: function (response) {
      if (response.status) {
        this.verifyPacystackCardPayment(response);

        console.log(response);
      } else {
        let payload = {
          status: true,
          type: "error",
          message: "Payment not completed",
        };
        this.setAlertModalStatus(payload);
      }

      this.closePaymentOptions();
    },
    processRave: function (response) {
      if (response.success) {
        let responseData = response.data.tx;
        this.verifyRaveCardPayment(responseData);
        this.raveResponse = true;
      } else {
        let payload = {
          status: true,
          type: "error",
          message: "Payment not completed",
        };
        this.setAlertModalStatus(payload);
      }

      $("#web-close-btn").click();
    },
    close: function () {
      this.closePaymentOptions();

      let payload = {
        status: true,
        type: "error",
        message: "Payment not completed",
      };
      this.setAlertModalStatus(payload);

      this.amount = 100;
      this.currency = "";
      this.processing = false;
      this.buttonText = "Proceed";
      this.emptyFields = true;
      this.inputError = false;
      this.formError = false;
      this.payWithPaystack = false;
      this.payWithRave = false;
      this.paymentForPaystackInfo = null;
      this.paymentForRaveInfo = null;
      this.errorMessage = "";
      this.showError = false;
    },
    closeRave: function () {
      this.closePaymentOptions();
      this.setFundWalletLoading(true);
      let payload;

      if (this.raveResponse == true) {
        payload = {
          status: true,
          type: "success",
          message: "Payment successfully",
        };
      } else {
        payload = {
          status: true,
          type: "error",
          message: "Payment not completed",
        };
      }

      setTimeout(() => {
        this.setFundWalletLoading(false);
        this.setAlertModalStatus(payload);
      }, 2000);
    },
    verifyPacystackCardPayment: function (response) {
      this.setFundWalletLoading(true);

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.email,
        ProviderPaymentReference: response.reference,
        TransactionReference: this.paymentForPaystackInfo.reference,
        Provider: this.paymentForPaystackInfo.provider,
        Currency: this.currency,
      };
      const url = `${this.walletURL}/v1.0/VerifyCardPayment/confirmCardPaymentStatus`;

      axios
        .post(url, data)
        .then((response) => {
          let payload;

          if (response.data.success) {
            payload = {
              status: true,
              type: "success",
              message: "Payment successfully",
            };
          } else {
            payload = {
              status: true,
              type: "error",
              message: "Payment not completed",
            };
          }

          console.log(response);

          this.setAlertModalStatus(payload);
          this.setFundWalletLoading(false);
        })
        .catch((err) => {
          console.log(err);

          this.serverErrorMessage();
          this.setFundWalletLoading(false);
        });
    },

    verifyRaveCardPayment: function (response) {
      this.setFundWalletLoading(true);

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.email,
        ProviderPaymentReference: response.flwRef,
        TransactionReference: response.txRef,
        Currency: this.currency,
      };
      const url = `${this.walletURL}/v1.0/VerifyCardPayment/confirmCardPaymentStatus`;

      axios
        .post(url, data)
        .then((response) => {
          // console.log(response);

          let payload;

          if (response.data.success) {
            payload = {
              status: true,
              type: "success",
              message: "Payment successfully",
            };
          } else {
            payload = {
              status: true,
              type: "error",
              message: "Payment not completed",
            };
          }

          setTimeout(() => {
            this.setAlertModalStatus(payload);
            this.setFundWalletLoading(false);
          }, 1000);
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
