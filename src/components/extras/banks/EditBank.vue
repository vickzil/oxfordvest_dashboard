<template>
  <div class="card-body">
    <form
      style="width: 100%"
      v-on:submit.prevent="updateBankdetails"
      enctype="multipart/form-data"
    >
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="form-group c_form_group">
            <label><b>Select Country</b></label>
            <select
              class="form-control show-tick"
              v-model.trim="country"
              @change="checkbankName"
            >
              <option value="">Select Country</option>
              <option
                :value="country.code"
                v-for="country in registrationInfo.countries"
                :key="country.code"
                :selected="country.code === country"
              >
                {{ country.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="col-md-6 col-sm-12">
          <div class="form-group c_form_group" v-if="!noBankfound">
            <label><b>Bank Name</b></label>
            <select
              class="form-control show-tick"
              v-model="bankCode"
              @change="updateEditingStatus"
            >
              <option
                :value="bank.code"
                v-for="bank in bankList"
                :key="bank.code"
              >
                {{ bank.name }}
              </option>
            </select>
          </div>
          <div
            v-if="noBankfound"
            class="form-group c_form_group"
            :class="country === '' && 'disabled'"
          >
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="your bank name"
              v-bind:disabled="country === ''"
              v-model="bankCode"
              @input="updateEditingStatus"
            />
          </div>
        </div>
      </div>

      <br />

      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="form-group c_form_group" :class="!bankCode && 'disabled'">
            <label><b>Account Number</b></label>
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="your Account Number"
              v-bind:disabled="!bankCode"
              v-model="accountNumber"
              @input="updateEditingStatus"
              @blur="verifyAccountNumber"
            />
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group c_form_group">
            <label><b>Account Name</b></label>
            <input
              type="text"
              class="form-control"
              placeholder="your Account Number"
              v-model="accountName"
            />

            <transition name="fade">
              <p
                v-if="incorrectBankNumber"
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
                {{ incorrectBankNumberMessage }}
              </p>
            </transition>
          </div>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="form-group c_form_group disabled">
            <label><b>Bank Code</b></label>
            <input
              type="text"
              class="form-control"
              v-model="bankCode"
              disabled
            />
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="form-group c_form_group">
            <label><b>Allias</b></label>
            <input
              type="text"
              class="form-control form-control-lg"
              v-model="allias"
            />
          </div>
        </div>
      </div>
      <div
        class="text-right border-top-0"
        v-if="country && accountNumber && accountName && bankCode"
      >
        <button class="btn btn-danger" v-bind:disabled="processing">
          {{ formText }}
          <span
            class="spinner-border spinner-border-sm ml-2"
            role="status"
            aria-hidden="true"
            v-if="processing"
          ></span>
        </button>
      </div>
      <br /><br />
    </form>
  </div>
</template>
<script>
import "@/mixins";
import axios from "axios";

export default {
  props: ["bankdetails"],
  computed: {
    registrationInfo() {
      return this.$store.getters.registrationInfo;
    },
    bankName: {
      get() {
        return this.bankdetails.bankName;
      },
      set(value) {
        return (this.bankdetails.bankName = value);
      },
    },
    bankCode: {
      get() {
        return this.bankdetails.bankCode;
      },
      set(value) {
        return (this.bankdetails.bankCode = value);
      },
    },
    code: {
      get() {
        return this.bankdetails.code;
      },
      set(value) {
        return (this.bankdetails.code = value);
      },
    },
    accountNumber: {
      get() {
        return this.bankdetails.accountNumber;
      },
      set(value) {
        return (this.bankdetails.accountNumber = value);
      },
    },
    accountName: {
      get() {
        return this.bankdetails.accountName;
      },
      set(value) {
        return (this.bankdetails.accountName = value);
      },
    },
    currency: {
      get() {
        return this.bankdetails.currency;
      },
      set(value) {
        return (this.bankdetails.currency = value);
      },
    },
    allias: {
      get() {
        return this.bankdetails.allias;
      },
      set(value) {
        return (this.bankdetails.allias = value);
      },
    },

    user() {
      return this.$store.getters.user;
    },
    AppId() {
      return this.$store.getters.AppId;
    },
    RequestId() {
      return this.$store.getters.RequestId;
    },
    countryBankName() {
      return this.$store.getters.countryBankName;
    },
    country() {
      let selectedCountry;
      if (this.currency == "NGN") {
        selectedCountry = "NG";
      } else {
        selectedCountry = "";
      }
      return selectedCountry;
    },
    bankList() {
      let cuBankName = this.countryBankName.filter((bank) => {
        return bank.code === this.country;
      });

      let newData = cuBankName[0];
      let countryBankData = newData.countryBanks;

      return countryBankData;
    },
  },

  data() {
    return {
      bank: "",
      noBankfound: false,
      editing: false,
      collapseCard: false,
      formError: false,
      processing: false,
      emptyFields: true,
      formMessage: "",
      statusMessage: "",
      formText: "Update Bankdetails",
      hasError: true,
      noBankName: true,
      incorrectBankNumber: false,
      incorrectBankNumberMessage: "",
      allInputError: true,
      updatingBankdetails: false,
    };
  },
  methods: {
    updateEditingStatus: function () {
      this.updatingBankdetails = true;
    },
    checkbankName: function () {
      if (this.country === "") {
        this.bankList = [];
        this.noBankfound = true;
        this.noBankName = false;
      } else {
        let cuBankName = this.countryBankName.filter((bank) => {
          return bank.code === this.country;
        });

        if (cuBankName) {
          let newData = cuBankName[0];

          this.currency = newData.currencies[0].code;

          this.bankList = newData.countryBanks;
          let countryBankData = newData.countryBanks;

          if (countryBankData.length) {
            this.bankList = countryBankData;
            this.noBankfound = false;
          } else {
            this.bankList = [];
            this.noBankfound = true;
            this.noBankName = false;
          }
        } else {
          this.bankList = [];
          this.noBankfound = true;
        }
      }

      this.incorrectBankNumber = false;
      this.incorrectBankNumberMessage = "";
    },

    verifyAccountNumber: function () {
      this.incorrectBankNumber = false;
      if (this.bankList.length) {
        if (this.updatingBankdetails == false && !this.accountNumber) {
          return false;
        }

        this.apiVerifyAccountNumber();
        return true;
      } else {
        return false;
      }
    },

    apiVerifyAccountNumber: function () {
      this.$store.dispatch("setActionLoading", true);
      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Country: this.country,
        BankCode: this.bankCode,
        AccountNumber: this.accountNumber,
      };

      const url = `${this.walletURL}/CountryBank/verifyAccountNumber`;

      axios
        .post(url, data)
        .then((response) => {
          if (response.data.success) {
            let responseData = response.data.data.accountName;

            this.accountName = responseData;
          } else {
            this.incorrectBankNumber = true;
            this.incorrectBankNumberMessage = response.data.message;
          }

          this.$store.dispatch("setActionLoading", false);
        })
        .catch((err) => {
          console.log(err);
          this.$store.dispatch("setActionLoading", false);
        });
    },
    updateBankdetails: function () {
      if (
        !this.country &&
        !this.bank &&
        !this.bankCode &&
        !this.accountNumber &&
        !this.accountName &&
        !this.allias
      ) {
        return false;
      } else {
        this.$store.dispatch("setActionLoading", true);
        var data = {
          AppId: this.AppId,
          RequestId: this.RequestId,
          Country: this.country,
          Code: this.code,
          // Code: "b055e88a-02ba-4e32-944c-a02c8105ea16",
          BankCode: this.bankCode,
          AccountNumber: this.accountNumber,
          Allias: this.allias,
          UserCode: this.user.userInfo.user.code,
          AccountName: this.accountName,
          Currency: this.currency,
        };
        console.log(data);

        const url = `${this.hrmURL}/v1.0/UserBankAccount/updateUserBankAccount`;

        axios
          .post(url, data)
          .then((response) => {
            // console.log(response);

            let payload;

            if (response.data.success) {
              let userCode = sessionStorage.getItem("activeformations");
              this.$store.dispatch("fetchUserData", userCode);

              payload = {
                status: true,
                type: "success",
                message: "Bank Account Updated!!",
              };

              this.editing = false;
            } else {
              payload = {
                status: true,
                type: "error",
                message: response.data.message,
              };
            }
            this.$store.dispatch("setAlertModalStatus", payload);

            this.$store.dispatch("setActionLoading", false);
          })
          .catch((err) => {
            if (err) {
              err;
            }
            this.serverErrorMessage();
          });

        return true;
      }
    },
  },
};
</script>
<style scoped>
.card-body .btn.btn-outline-danger {
  background: red !important;
  color: white !important;
}

.card-body .btn.btn-outline-danger:hover {
  background: rgb(214, 20, 20) !important;
  color: white !important;
}
</style>
