<template>
  <transition name="fade">
    <div class="investment_carousel_div">
      <!-- <CardLoading /> -->

      <div v-if="investments.length">
        <carousel
          :autoplay="false"
          :nav="false"
          :dots="true"
          :stagePadding="50"
          :margin="20"
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
          <div
            class="card_item card"
            v-for="(investment, index) in investments"
            :key="index"
          >
            <h5>{{ investment.name }}</h5>
            <!-- <p class="mt-1 text-muted">
              {{ investment.availableInvestmentCategoryName }}
            </p> -->
            <p class="mt-4">
              {{ investment.description }}
            </p>
            <p class="text-danger">
              <b>{{ investment.duration }} Months</b>
            </p>
            <div class="card_grid">
              <div class="invest_money">
                <span
                  class="invest_sub_title"
                  style="
                    font-size: 12px !important;
                    font-weight: bold;
                    display: block;
                    margin-bottom: 0px;
                  "
                  >Interest Rate</span
                >
                {{ investment.newInterestRate }}%
              </div>
              <div class="invest_money"></div>
            </div>
            <div class="card_grid card_grid_button">
              <div class="invest_button">
                <button
                  class="btn btn-outline-danger btn-sm shadow-lg"
                  @click="calculateInvestment(investment)"
                >
                  Calculate
                  <i class="fa fa-calculator ml-2"></i>
                </button>
              </div>
              <div class="invest_button">
                <button
                  class="btn btn-danger btn-sm"
                  @click="performInvestment(investment)"
                >
                  Invest now
                  <i class="fa fa-arrow-circle-o-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </carousel>
      </div>
      <div class="card text-center p-5" v-else>
        <br /><br />
        <p>
          <b>This Investment not available yet</b>
        </p>
        <br />
      </div>
    </div>
  </transition>
</template>

<script>
import "@/mixins";
import { mapActions } from "vuex";

import carousel from "vue-owl-carousel";
// import CardLoading from "../../loaders/CardLoading";
export default {
  components: {
    carousel,
    // CardLoading,
  },
  props: ["investments"],

  methods: {
    ...mapActions([
      "setActionLoading",
      "storeCurrentInvestment",
      "setCalCulateInvestmentModal",
      "setAlertModalStatus",
      "setPerformInvestmentModal",
    ]),
    calculateInvestment: function (investment) {
      this.setActionLoading(true);
      this.storeCurrentInvestment(investment);
      setTimeout(() => {
        this.setActionLoading(false);
        this.setCalCulateInvestmentModal(true);
      }, 1200);

      // console.log(investment);
    },
    performInvestment: function (investment) {
      this.setActionLoading(true);
      this.storeCurrentInvestment(investment);
      setTimeout(() => {
        this.setActionLoading(false);
        this.setPerformInvestmentModal(true);
      }, 1200);

      // console.log(investment);
    },
  },
};
</script>

<style scoped>
.investment_carousel_div {
  /* display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px; */
  /* margin-top: 20px; */
  position: relative;
  overflow: hidden;
}

.card_item {
  padding: 30px 25px;
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 10px 0px;
  /* width: 380px; */
  border-radius: 9px;
  border-top: 4px solid rgb(255, 96, 96);
  transition: all 0.3s ease-in-out 0s;
}

.card_item.card:hover {
  background: rgb(253, 239, 239) !important;
}
.card_item h5 {
  font-size: 19px;
  font-weight: bold;
  text-rendering: geometricPrecision;
}
.card_item p {
  font-size: 14px;
}
.card_item p:first-child {
  margin-top: 14px;
}

.card_grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
}

.card_grid .invest_money {
  font-weight: 800;
  font-size: 19px;
}

.invest_sub_title {
  color: rgb(118, 150, 104);
}

.card_grid button.btn.btn-danger {
  background: red !important;
  border: none;
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 10px 0px;
  border-radius: 4px;
  transition: 800ms ease;
  font-weight: 600;
}
.card_grid button.btn.btn-outline-danger {
  border: 1px solid red !important;
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 10px 0px;
  border-radius: 4px;
  transition: 800ms ease;
  font-weight: 600;
  color: red !important;
  font-size: 13px !important;
}

.card_grid button.btn.btn-danger:hover {
  background: rgb(248, 221, 221) !important;
  color: red !important;
}

.card_grid button.btn.btn-outline-danger:hover {
  background: rgb(202, 72, 72) !important;
  color: white !important;
  border: 1px solid rgb(202, 72, 72) !important;
}
.card_grid button.btn.btn-danger i {
  font-weight: bold !important;
}

@media screen and (max-width: 530px) {
  .card_item {
    padding: 30px 19px;
  }
  .card_item h5 {
    font-size: 16px !important;
  }
  .card_grid_button {
    display: block;
    text-align: center;
  }

  .card_grid_button button.btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
