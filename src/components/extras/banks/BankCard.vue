<template>
  <div class="card" v-if="user">
    <div class="header">
      <div class="row clearfix">
        <div class="col-xl-6 col-md-5 col-sm-6">
          <h2><b>My Cards</b></h2>
        </div>
        <div class="col-xl-6 col-md-7 col-sm-6 text-md-right">
          <div
            class="d-flex align-items-center justify-content-md-end mt-4 mt-md-0 flex-wrap card_button_right"
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
        <!-- <CreditCard /> -->

        <div class="card" v-if="bankCards.length > 0">
          <div class="body card_width_div my-4">
            <carousel
              :autoplay="false"
              :nav="false"
              :dots="true"
              :stagePadding="50"
              :margin="30"
              :autoplayTimeout="3000"
              :responsive="{
                0: {
                  items: 1,
                },
                600: {
                  items: 2,
                },
                1000: {
                  items: 3,
                },
              }"
            >
              <CreditCard2
                v-for="(searchBank, index) in searchBanks"
                :key="searchBank.bankCode"
                :searchBank="searchBank"
                :index="index"
              />
              <br /><br />
            </carousel>
          </div>
          <!-- <div class="table-responsive">
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
          </div> -->
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
            <br /><br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import BankTableList from "./BankTableList";
// import CreditCard from "./CreditCard";
import CreditCard2 from "./CreditCard2";
// import CreditCard3 from "./CreditCard3";
import "@/mixins";
import carousel from "vue-owl-carousel";

import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    // BankTableList,
    // CreditCard,
    CreditCard2,
    // CreditCard3,
    carousel,
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
    ...mapGetters(["userPaymentFeeInfo"]),

    bankCards() {
      // return [];
      return this.user.userInfo.userCards;
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
    ...mapActions(["setAddModal", "getPaymentFeeInfo", "setActionLoading"]),
    addCard: function () {
      this.setActionLoading(true);
      if (this.userPaymentFeeInfo == null) {
        this.getPaymentFeeInfo();
      }

      setTimeout(() => {
        this.setActionLoading(false);
      }, 600);
      setTimeout(() => {
        this.setAddModal(true);
      }, 800);
    },
  },
};
</script>

<style scoped>
.owl-stage {
  padding-top: 30px !important;
  padding-bottom: 30px !important;
}
/*
.card_width_div {
  padding: 0px 20px;
   width: 400px; 
  box-sizing: border-box;
} */

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

@media screen and (max-width: 530px) {
  h2 {
    text-align: center;
  }
  p {
    line-height: 1.4;
  }

  .card_button_right {
    display: block !important;
    text-align: center !important;
  }
}
</style>
