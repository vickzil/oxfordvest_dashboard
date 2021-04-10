<template>
  <div class="card" v-if="user">
    <div class="header">
      <div class="row clearfix">
        <div class="col-xl-6 col-md-5 col-sm-6">
          <h2>My Cards</h2>
        </div>
        <div class="col-xl-6 col-md-7 col-sm-6 text-md-right">
          <div
            class="d-flex align-items-center justify-content-md-end mt-4 mt-md-0 flex-wrap"
          >
            <div class="mb-3 mb-xl-0">
              <a
                @click="addCard"
                href="javascript:void(0)"
                class="btn btn-outline-danger"
              >
                <span> Add Card <i class="fa fa-plus ml-1"></i> </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="row clearfix">
      <div class="col-12">
        <div class="card" v-if="bankCards.length > 0">
          <div class="body">
            <form>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Card by provider"
                  v-model="searchText"
                />
                <div class="input-group-append">
                  <span class="input-group-text" id="search-mail"
                    ><i class="icon-magnifier"></i
                  ></span>
                </div>
              </div>
            </form>
          </div>
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr class="text-center">
                  <th>#</th>
                  <th>Alias</th>
                  <th>Provider</th>
                  <th>Card Bank Name</th>
                  <th>Card Acct Number</th>
                  <th>Type</th>
                  <th>Default Payout Account</th>

                  <th>Expiry</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="searchBanks.length > 0">
                <BankTableList
                  v-for="(searchBank, index) in searchBanks"
                  :key="searchBank.bankCode"
                  :searchBank="searchBank"
                  :index="index"
                  class="text-center"
                />
              </tbody>
              <tbody v-else>
                <tr class="text-center">
                  <td colspan="6">No Card Found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card" v-else>
          <div
            class="container text-center font-weight-bold mt-5"
            v-if="!showPaystack"
          >
            <p>
              This is only available to Nigerian cards/account. If non Nigerian,
              kindly ignore this.
            </p>
            <div class="mt-3 mb-xl-0">
              <a
                @click="addCard"
                href="javascript:void(0)"
                class="btn btn-outline-danger"
              >
                <span> Add Card <i class="fa fa-plus ml-1"></i> </span>
              </a>
            </div>
            <br /><br />
          </div>
        </div>
        <div v-if="showPaystack" class="text-center mt-4">
          <p class="w-80">
            To add and verify your card ₦ 100 will be charged and saved into
            your Wallet
          </p>
          <Paystack
            :paystackkey="paystackkey"
            :reference="reference"
            :callback="callback"
            :amount="amount * 100"
            :currency="currency"
            :firstname="user.userInfo.user.firstName"
            :lastname="user.userInfo.user.lastName"
            :email="user.userInfo.user.email"
            :close="close"
            :embed="false"
            ref="paystackPayment"
            class="btn btn-danger btn-lg payment_buttion"
          >
            Proceed
            <i class="fe fe-credit-card ml-2"></i>
          </Paystack>
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BankTableList from "./BankTableList";
import "@/mixins";
import axios from "axios";
import Paystack from "vue-paystack";
export default {
  components: {
    BankTableList,
    Paystack,
  },
  data() {
    return {
      paystackkey: null,
      reference: null,
      searchText: "",
      showPaystack: false,
      amount: 100,
      currency: "NGN",
    };
  },
  computed: {
    bankCards() {
      return this.user.userInfo.userCardsInfo.userCards;
    },
    searchBanks() {
      let text = this.searchText.toLowerCase();
      return this.bankCards.filter((referral) =>
        referral.provider.toLowerCase().match(text)
      );
    },

    bankdetails() {
      return this.user.userInfo.userBankAccountInfo.userBankAccount;
    },
    currencies() {
      return this.user.fundWalletOptions.currencies;
    },
    userPaymentOptions() {
      return this.user.fundWalletOptions;
    },
  },
  methods: {
    addCard: function () {
      if (this.bankdetails.accountNumber == null) {
        let payload = {
          status: true,
          type: "error",
          message:
            "Please you need to add your bank account details before you proceed.",
        };
        this.$store.dispatch("setAlertModalStatus", payload);
      } else {
        this.$store.dispatch("setActionLoading", true);
        this.paymentFeeInfo();
      }
    },
    paymentFeeInfo: function () {
      this.buttonText = "Please wait...";
      this.processing = true;

      const url = `${this.walletURL}/v1.0/PaymentFee/paymentFeeInfo`;

      let paymentByCard = this.user.fundWalletOptions.byCard.items.find(
        (item) => item.provider === "paystack"
      );

      if (paymentByCard) {
        this.paystackkey = paymentByCard.publicKey;
      }

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.user.email,
        Currency: "NGN",
        Amount: this.amount,
        Provider: "paystack",
      };

      axios
        .post(url, data)
        .then((res) => {
          if (res.data.success) {
            let responseData = res.data.data;
            this.reference = responseData.reference;
            // console.log(responseData);
            this.showPaystack = true;

            // this.$refs.paystackPayment.click();
          }

          this.$store.dispatch("setActionLoading", false);

          // console.log(res);
        })
        .catch((err) => {
          this.serverErrorMessage();
          console.log(err);
          this.showPaystack = false;
        });
    },
    callback: function (response) {
      if (response.status) {
        this.verifyPacystackCardPayment(response);

        // console.log(response);
      } else {
        let payload = {
          status: true,
          type: "error",
          message: "Card Verification not completed",
        };
        this.$store.dispatch("setAlertModalStatus", payload);
      }
      this.showPaystack = false;
      // console.log(response);
    },
    verifyPacystackCardPayment: function (response) {
      this.$store.dispatch("setActionLoading", true);
      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.user.email,
        ProviderPaymentReference: response.reference,
        TransactionReference: this.reference,
        Provider: "paystack",
        Currency: "NGN",
      };
      const url = `${this.walletURL}/v1.0/VerifyCardPayment/confirmCardPaymentStatus`;

      axios
        .post(url, data)
        .then((response) => {
          // console.log(response);

          let payload;

          if (response.data.success) {
            payload = {
              type: "success",
              message: "Card Confirm successfully",
            };
          } else {
            payload = {
              type: "error",
              message: "Error Card confirmation",
            };
          }

          this.$store.dispatch("showAlert", payload);
          this.$store.dispatch("setActionLoading", false);
          this.showPaystack = false;
        })
        .catch((err) => {
          console.log(err);

          let payload = {
            type: "error",
            message: "Error Card confirmation",
          };
          this.showPaystack = false;

          this.$store.dispatch("showAlert", payload);
          this.$store.dispatch("setActionLoading", false);
        });
    },
    close: function () {
      // console.log("Payment closed");
      this.showPaystack = false;
      this.$store.dispatch("setActionLoading", false);

      let payload = {
        status: true,
        type: "error",
        message: "Payment not completed",
      };
      this.$store.dispatch("setAlertModalStatus", payload);
    },
  },
};
</script>

<style scoped>
.payment_buttion {
  background: rgb(255, 0, 0) !important;
  border-radius: 4px;
  transition: 800ms ease;
  font-weight: bold;
  padding: 10px !important;
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
</style>
