<template>
  <div class="card animated px-4" v-if="UploadEvidenceFormModal">
    <br />
    <!-- <button class="btn bg-light hrm_button" @click="goBack">
      <i class="fa fa-arrow-left"></i> Back
    </button> -->
    <!-- <br />
    <br /> -->
    <div class="card">
      <div class="card-body">
        <form id="form_fd" v-on:submit.prevent="submitForm">
          <p class="alert alert-error" v-if="showError">{{ errorMessage }}</p>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group c_form_group">
                <label><b>Currency</b></label>
                <select
                  class="form-control show-tick"
                  v-model="currency"
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
            <div class="col-md-6">
              <div class="form-group c_form_group">
                <label><b>Amount</b></label>
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
          <br />
          <br />
          <div class="row">
            <div class="col-md-12">
              <div class="form-group mb-4 c_form_group">
                <label><b>Additional Information</b></label>
                <textarea
                  cols="30"
                  rows="5"
                  class="form-control"
                  v-model.trim="additionalInformation"
                  @input="checkform"
                ></textarea>
              </div>
            </div>
            <br />
            <br />
            <br /><br />
            <br />
            <br /><br />
            <div class="form-group col-md-12">
              <div class="row">
                <label class="col-sm-5 col-form-label"
                  ><b>Evidience of Payment</b></label
                >
                <div class="col-sm-7">
                  <input
                    type="file"
                    ref="add_evidience_input"
                    style="display: none"
                    @change="changePaymentEvidience($event)"
                  />
                  <div v-if="previewDocument" class="mb-2">
                    <small class="mb-3" ref="preview_image">{{
                      previewDocument
                    }}</small>
                  </div>
                  <button
                    class="btn btn-outline-danger font-weight-bold mt-1"
                    @click.prevent="$refs.add_evidience_input.click()"
                  >
                    <span>Upload Document</span>
                    <i style="font-size: 16px" class="fa fa-upload ml-2"></i>
                  </button>
                </div>
              </div>
              <br />
            </div>
          </div>
          <div class="text-right pt-3 mt-3">
            <button
              type="submit"
              class="btn btn-danger btn-sm oxfordvest_button"
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
</template>
<script>
import axios from "axios";
import "@/mixins";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UploadEvidenceFormModal",
  data() {
    return {
      amount: 100,
      currency: "",
      additionalInformation: "",
      processing: false,
      buttonText: "Submit Evidence",
      emptyFields: true,
      inputError: false,
      formError: false,
      errorMessage: "",
      showError: false,
      previewDocument: "",
      document: null,
    };
  },
  computed: {
    ...mapGetters(["UploadEvidenceFormModal", "countryBankName"]),

    currencies() {
      return this.user.fundWalletOptions.currencies;
    },

    countryBankName() {
      return this.$store.getters.countryBankName;
    },
  },

  methods: {
    ...mapActions([
      "setActionLoading",
      "paymentOptionsBack",
      "setAlertModalStatus",
      "closePaymentOptions",
    ]),
    changePaymentEvidience: function (event) {
      this.document = event.target.files[0];
      this.previewDocument = this.document.name;
      this.checkform();
    },
    closePaymentOptionsModal: function () {
      if (!this.processing) {
        this.closePaymentOptions();
        this.clearForm();
      }
    },
    // checkInput: function (input) {
    //   // var regex = /^[0-9]+$/;
    //   // if (!input.match(regex)) {
    //   //   this.inputError = true;
    //   //   this.emptyFields = true;
    //   //   this.inputMessage = "please input must be numbers.";
    //   //   return false;
    //   // }

    //   if (this.currency == "NGN" && input < 100) {
    //     this.inputMessage = "Amount must be up to 100";
    //     this.inputError = true;
    //     this.emptyFields = true;

    //     return false;
    //   }
    //   if (!this.currency) {
    //     this.emptyFields = true;
    //     this.inputError = false;
    //     return false;
    //   }
    //   if (!this.additionalInformation) {
    //     this.emptyFields = true;
    //     this.inputError = false;
    //     return false;
    //   }

    //   if (!this.document) {
    //     this.emptyFields = true;
    //     this.inputError = false;
    //     return false;
    //   }

    //   this.inputError = false;
    //   this.emptyFields = false;

    //   return true;
    // },

    submitForm: function () {
      this.errorMessage = "";
      this.showError = false;
      if (this.formError == false && this.emptyFields == false) {
        this.submitEvidenceOfPayment();

        return true;
      } else {
        this.checkform();
        return false;
      }
    },
    checkform: function () {
      if (isNaN(this.amount)) {
        this.amount = parseInt(this.amount.replace(/[,]/g, ""));
      }

      if (
        !this.amount ||
        !this.currency ||
        !this.additionalInformation ||
        !this.document
      ) {
        this.emptyFields = true;
        this.formError == true;
        return false;
      }

      if (!this.currency) {
        this.emptyFields = true;
        this.inputError = false;
        return false;
      }
      if (!this.additionalInformation) {
        this.emptyFields = true;
        this.inputError = false;
        return false;
      }

      if (!this.document) {
        this.emptyFields = true;
        this.inputError = false;
        return false;
      }
      if (this.currency == "NGN" && this.amount < 100) {
        this.inputMessage = "Amount must be up to 100";
        this.inputError = true;
        this.emptyFields = true;
        this.formError == true;
        return false;
      }

      this.inputError = false;
      this.formError == false;
      this.emptyFields = false;

      return true;
    },

    submitEvidenceOfPayment: function () {
      this.buttonText = "Please wait...";
      this.processing = true;

      const url = `${this.walletURL}/v1.0/PaymentEvidence/sendpaymentEvidence`;

      var fd = new FormData();

      if (isNaN(this.amount)) {
        this.amount = parseInt(this.amount.replace(/[,]/g, ""));
      }

      fd.append("UserCode", this.user.userInfo.user.code);
      fd.append("Currency", this.currency);
      fd.append("Amount", this.amount);
      fd.append("Email", this.user.userInfo.user.email);
      fd.append("AppId", this.AppId);
      fd.append("RequestId", this.RequestId);
      fd.append("Evidence", this.document);

      axios
        .post(url, fd)
        .then((res) => {
          this.processing = false;
          this.buttonText = "Submit Evidence";

          this.closePaymentOptionsModal();

          let payload;

          if (res.data.success) {
            payload = {
              status: true,
              type: "success",
              message: "Payment Evidence Submitted successfully!!",
            };

            // console.log(res);
          } else {
            this.showError = true;
            this.errorMessage = "Sorry, Server not reachable, Try again later";

            payload = {
              status: true,
              type: "error",
              message: res.data.message,
            };
          }

          setTimeout(() => {
            this.setAlertModalStatus(payload);
          }, 200);

          // console.log(res);
        })
        .catch((err) => {
          this.closePaymentOptionsModal();
          this.serverErrorMessage();
          console.log(err);
          this.processing = false;
          this.buttonText = "Submit Evidence";
        });
    },
    goBack: function () {
      this.paymentOptionsBack();
      this.clearForm();
    },

    clearForm: function () {
      this.amount = 100;
      this.currency = "";
      this.previewDocument = "";
      this.document = null;
      this.processing = false;
      this.buttonText = "Submit Evidence";
      this.emptyFields = true;
      this.inputError = false;
      this.formError = false;
      this.errorMessage = "";
      this.showError = false;
    },
  },

  mounted() {},

  watch: {
    amount: function (newValue) {
      let result = newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.amount = result));
    },
  },
};
</script>
<style scoped>
#form_fd {
  width: 80%;
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

@media screen and (max-width: 600px) {
  .card {
    padding: 30px 7px !important;
  }
  .card-body {
    padding: 30px 0px !important;
  }
  #form_fd {
    width: 95%;
    margin: auto;
  }
}
</style>
