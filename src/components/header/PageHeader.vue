<template>
  <div>
    <div v-if="user && user.dashboardNotification.message">
      <div
        class="alert text-center alert-dismissible mt-3"
        v-if="!isclosed"
        :class="'alert-' + user.dashboardNotification.alertType"
        style="cursor: pointer"
        @click="closeAlert"
      >
        <a href="javascript:void(0)" class="close">&times;</a>
        <span class="font-sm-12">{{ user.dashboardNotification.message }}</span>
      </div>
    </div>

    <div
      class="block-header top_page card p-4"
      v-if="user"
      :class="isNavActive === '/dashboard' && 'home-block-header'"
    >
      <div class="row clearfix">
        <div class="col-lg-4 col-md-12 col-sm-12">
          <h1>{{ topPageName }}</h1>
          <!-- <span>Remember to wash your hands often.</span> -->
        </div>
      </div>

      <div class="row clearfix">
        <div class="col-xl-6 col-md-6 col-sm-12 mt-3">
          <div
            class="d-flex align-items-center justify-content-md-start mt-4 mt-md-0 flex-wrap"
          >
            <div class="mb-3 mb-xl-0 page_account_buttons">
              <a
                href="javascript:void(0)"
                class="btn btn-danger mr-2"
                v-if="isNavActive !== '/withdrawal'"
                @click="showAllPaymentOptions"
                >Fund Wallet</a
              >
              <a
                href="javascript:void(0)"
                @click="showWithdrawalModal"
                v-if="
                  isNavActive === '/dashboard' || isNavActive === '/withdrawal'
                "
                class="btn btn-outline-danger"
                >Withdraw</a
              >
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 text-lg-right text-md-right">
          <div
            class="d-flex align-items-center justify-content-lg-end justify-content-md-end mt-lg-2 mt-lg-0 flex-wrap"
          >
            <div class="border-right pr-4 mr-4 mb-2 mb-xl-0">
              <p class="text-muted mb-1">
                <strong>Wallet Balance</strong>
                <span class="fa fa-money ml-2 text-success"></span>
              </p>
              <h5 class="mb-0 wallet_bal">
                ₦{{ addComma(userAmount) }}
                <span class="ml-1 mr-3">
                  <i
                    class="fa fa-refresh font-weight-bold"
                    :class="refreshingAmount && 'fa-spin'"
                    style="font-size: 17px; cursor: pointer"
                    @click="refreshUserAmount"
                  ></i>
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/mixins";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["topPageName"],
  computed: {
    ...mapGetters(["genReference", "currentSitePage", "isclosed"]),
    userAmount: {
      get() {
        return this.user.userWalletBalance.availableBalance;
      },
      set(value) {
        return (this.user.userWalletBalance.availableBalance = value);
      },
    },

    userPaymentOptions() {
      return this.user.fundWalletOptions;
    },
    isNavActive() {
      return this.currentSitePage;
    },
  },
  data() {
    return {
      billingErroes: [],
      Error: false,
      refreshingAmount: false,
    };
  },
  methods: {
    ...mapActions([
      "showLogoutModal",
      "setActionLoading",
      "showPaymentOptions",
      "getPaymentOptions",
      "setWithdrawalModal",
      "closeAlertMessage",
    ]),
    closeAlert: function () {
      this.closeAlertMessage();
    },
    refreshUserAmount: function () {
      this.refreshingAmount = true;
      this.getAccountBance();
    },
    showLogout: function () {
      this.showLogoutModal();
    },

    showAllPaymentOptions: function () {
      this.setActionLoading(true);

      if (!this.userPaymentOptions) {
        this.getPaymentOptions();
      } else {
        setTimeout(() => {
          this.setActionLoading(false);
        }, 400);
        setTimeout(() => {
          this.showPaymentOptions();
        }, 500);
      }
    },
    showWithdrawalModal: function () {
      this.setActionLoading(true);
      setTimeout(() => {
        this.setActionLoading(false);
      }, 1000);
      setTimeout(() => {
        this.setWithdrawalModal(true);
      }, 1200);
    },

    getAccountBance: function () {
      const url = `${this.walletURL}/v1.0/Wallet/getAccountBalance`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.user.email,
      };

      axios
        .post(url, data)
        .then((res) => {
          if (res.data.success == true) {
            this.userAmount = res.data.data;
          }
          this.refreshingAmount = false;
        })
        .catch((err) => {
          console.log(err);
          this.refreshingAmount = false;
        });
    },
  },
};
</script>

<style scoped>
.block-header {
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 29px 0px;
}
.home-block-header {
  background: rgba(245, 0, 0, 0.07);
  box-shadow: rgba(31, 33, 39, 0.1) 0px 10px 29px 0px;
}
.page_account_buttons a.btn {
  border: none;
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 10px 0px;
  border-radius: 4px;
  transition: 800ms ease;
  font-weight: bold;
}
.page_account_buttons a.btn.btn-danger {
  background: red !important;
}

.page_account_buttons a.btn.btn-danger:hover {
  background: rgb(179, 33, 33) !important;
}

.page_account_buttons a.btn.btn-outline-danger {
  border: 1px solid rgb(37, 3, 3) !important;
  color: rgb(26, 3, 3) !important;
}

.page_account_buttons a.btn.btn-outline-danger:hover {
  background: red !important;
  color: white !important;
}

.wallet_bal {
  font-weight: 700;
}
</style>
