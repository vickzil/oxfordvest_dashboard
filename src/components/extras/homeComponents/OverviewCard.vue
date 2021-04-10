<template>
  <div class="row clearfix" v-if="user">
    <div class="col-12">
      <div class="dasboard_boxes">
        <div
          class="dasboard_box"
          v-for="overview in overviews"
          :key="overview.id"
        >
          <div class="body">
            <div>{{ overview.title }}</div>
            <div class="mt-3 h4">{{ overview.count }}</div>
            <div class="d-flex">
              <router-link
                :to="{ name: `${overview.url}` }"
                class="btn btn-danger btn-sm mt-3"
              >
                My {{ overview.buttonText }}
                <i class="fa fa-arrow-circle-o-right ml-2"></i>
              </router-link>
              <!-- <button class="btn btn-danger btn-sm mt-3">My {{overview.buttonText}}</button> -->
              <!-- <div class="mr-3">1.78% <i class="fa fa-caret-down"></i></div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import carousel from "vue-owl-carousel";
import "@/mixins";
export default {
  components: {
    // carousel,
  },
  computed: {
    userInvestmentInfoCount() {
      return this.user.userInfo.userInvestmentInfo.count;
    },
    userWalletWithdrawalInfoCount() {
      return this.user.userInfo.userWalletWithdrawalInfo.count;
    },
    walletTopupsInfoCount() {
      return this.user.userInfo.walletTopupsInfo.count;
    },
    noOfReferrals() {
      return this.user.userInfo.referrals.noOfReferrals;
    },
    overviews() {
      return [
        {
          id: 1,
          title: "Total Investment",
          count: this.userInvestmentInfoCount,
          url: "Investment",
          buttonText: "Investment",
        },
        {
          id: 2,
          title: "Total Withdrawals",
          count: this.userWalletWithdrawalInfoCount,
          url: "Transaction",
          buttonText: "Withdrawal",
        },
        {
          id: 3,
          title: "Total Deposit",
          count: this.walletTopupsInfoCount,
          url: "Transaction",
          buttonText: "Deposit",
        },
        {
          id: 4,
          title: "Total Referrals",
          count: this.noOfReferrals,
          url: "Referral",
          buttonText: "Referral",
        },
      ];
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.dasboard_box .body a.btn.btn-danger {
  background: red !important;
  border: none;
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 10px 0px;
  border-radius: 4px;
  transition: 800ms ease;
  font-weight: 600;
}

.dasboard_box .body a.btn.btn-danger:hover {
  background: rgb(179, 33, 33) !important;
}
.dasboard_box .body a.btn.btn-danger i {
  font-weight: bold !important;
}
</style>
