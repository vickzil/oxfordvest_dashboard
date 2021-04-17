<template>
  <div class="card-body">
    <form
      style="width: 100%"
      v-on:submit.prevent="insertBankdetails"
      enctype="multipart/form-data"
    >
      <br /><br />
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="form-group c_form_group">
            <label style="text-align: left !important"
              ><b>Select Country</b></label
            >
            <select
              class="form-control"
              v-model.trim="country"
              @change="checkbankName"
            >
              <option value="">Select Country</option>
              <option
                :value="country.code"
                v-for="country in registrationInfo.countries"
                :key="country.code"
              >
                {{ country.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div v-if="!noBankfound">
            <div class="form-group c_form_group">
              <label style="text-align: left !important"
                ><b>Select Bank</b></label
              >
              <select class="form-control" v-model="bank">
                <option value="">Select Bank</option>
                <option
                  :value="bank.code"
                  v-for="bank in bankName"
                  :key="bank.code"
                >
                  {{ bank.name }}
                </option>
              </select>
            </div>
          </div>
          <div
            v-if="noBankfound"
            class="form-group c_form_group"
            :class="country === '' && 'disabled'"
          >
            <label style="text-align: left !important; margin-top: 6px"
              ><b>Your Bank</b></label
            >
            <input
              type="text"
              class="form-control"
              placeholder="your bank name"
              v-bind:disabled="country === ''"
              v-model="bank"
            />
          </div>
        </div>
      </div>
      <div class="row" v-if="bank !== ''">
        <div class="col-md-6 col-sm-12">
          <div
            class="form-group c_form_group"
            :class="bank === '' && 'disabled'"
          >
            <label style="text-align: left !important; margin-top: 6px"
              ><b>Account Number </b></label
            >
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="your bank name"
              v-bind:disabled="bank === ''"
              v-model="accountNumber"
              @blur="verifyAccountNumber"
            />
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div
            class="form-group c_form_group"
            :class="country === 'NG' && 'disabled'"
          >
            <label style="text-align: left !important; margin-top: 6px"
              ><b>Account Name</b></label
            >
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="your bank name"
              v-bind:disabled="country === 'NG'"
              v-model="accountName"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-10 mx-auto">
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
      <div class="row" v-if="bank !== ''">
        <div class="col-md-6 mt-4">
          <div class="form-group c_form_group">
            <label><b>Allias</b></label>
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Withdrawal Account"
              v-model="allias"
            />
          </div>
        </div>
      </div>
      <div
        class="text-right border-top-0"
        style="
          border-bottom: 1px solid rgba(0, 40, 100, 0.12);
          margin-top: 25px;
        "
        v-if="
          country !== '' &&
          accountNumber !== '' &&
          accountName !== '' &&
          bank !== '' &&
          allias !== ''
        "
      >
        <button
          class="btn btn-danger oxfordvest_button"
          v-bind:disabled="processing"
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
    </form>
  </div>
</template>
<script>
import "@/mixins";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddBankdetails",
  computed: {
    ...mapGetters(["registrationInfo", "countryBankName"]),
  },

  data() {
    return {
      country: "",
      bank: "",
      bankName: [],
      accountNumber: "",
      accountName: "",
      allias: "Withdrawal Account",
      currency: "",
      noBankfound: false,
      formText: "Add Bank Details",
      processing: false,
      noBankName: true,
      incorrectBankNumber: false,
      incorrectBankNumberMessage: "",
      allInputError: true,
    };
  },
  methods: {
    ...mapActions(["setActionLoading", "setAlertModalStatus", "fetchUserData"]),
    checkbankName: function () {
      if (this.country === "") {
        this.bankName = [];
        this.noBankfound = true;
        this.noBankName = false;
      } else {
        let cuBankName = this.countryBankName.filter((bank) => {
          return bank.code === this.country;
        });

        if (cuBankName) {
          let newData = cuBankName[0];

          this.currency = newData.currencies[0].code;

          let sortedBanks = newData.countryBanks.sort(function (a, b) {
            return a.name < b.name ? -1 : 1;
          });

          this.bankName = sortedBanks;
          let countryBankData = sortedBanks;

          if (countryBankData.length) {
            this.bankName = countryBankData;
            this.noBankfound = false;
            this.bank = "";
            this.accountNumber = "";
            this.accountName = "";
          } else {
            this.bankName = [];
            this.noBankfound = true;
            this.noBankName = false;
            this.bank = "";
            this.accountNumber = "";
            this.accountName = "";
          }
        } else {
          this.bankName = [];
          this.noBankfound = true;
        }
      }

      this.incorrectBankNumber = false;
      this.incorrectBankNumberMessage = "";
    },

    verifyAccountNumber: function () {
      if (this.bankName.length) {
        if (this.accountNumber < 10) {
          return false;
        }

        this.apiVerifyAccountNumber();
        return true;
      } else {
        this.setActionLoading(false);
        return false;
      }
    },

    apiVerifyAccountNumber: function () {
      this.setActionLoading(true);
      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Country: this.country,
        BankCode: this.bank,
        AccountNumber: this.accountNumber,
      };

      const url = `${this.walletURL}/v1.0/CountryBank/verifyAccountNumber`;

      axios
        .post(url, data)
        .then((response) => {
          if (response.data.success) {
            let responseData = response.data.data.accountName;

            this.accountName = responseData;
          } else {
            this.incorrectBankNumber = true;
            this.incorrectBankNumberMessage = response.data.message;
            this.accountName = "";
          }

          this.setActionLoading(false);
          // console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
          this.setActionLoading(false);
          this.serverErrorMessage();
        });
    },
    insertBankdetails: function () {
      if (
        !this.country &&
        !this.bank &&
        !this.bankName &&
        !this.accountNumber &&
        !this.accountName &&
        !this.allias
      ) {
        this.accountName = "";
        return false;
      } else {
        this.setActionLoading(true);
        var data = {
          AppId: this.AppId,
          RequestId: this.RequestId,
          Country: this.country,
          BankCode: this.bank,
          AccountNumber: this.accountNumber,
          Alias: this.allias,
          UserCode: this.user.userInfo.user.code,
          AccountName: this.accountName,
          Currency: this.currency,
        };

        const url = `${this.hrmURL}/v1.0/UserBankAccount/insertUserBankAccount`;

        axios
          .post(url, data)
          .then((response) => {
            let payload;
            if (response.data.success) {
              payload = {
                status: true,
                type: "success",
                message: "Bank Account Added",
              };

              this.$router.push({ path: "/dashboard" });
              setTimeout(() => {
                this.$router.push({ path: "/bank-account" });
              }, 900);
            } else {
              payload = {
                status: true,
                type: "error",
                message: response.data.message,
              };
            }

            this.setActionLoading(false);
            this.setAlertModalStatus(payload);

            let userCode = sessionStorage.getItem("activeformations");
            this.fetchUserData(userCode);
          })
          .catch((err) => {
            console.log(err);
            this.setActionLoading(false);
            this.serverErrorMessage();
          });

        return true;
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
