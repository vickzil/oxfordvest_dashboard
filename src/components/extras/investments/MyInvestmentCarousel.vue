<template>
  <transition name="fade">
    <div class="investment_carousel_div">
      <!-- <CardLoading /> -->
      <carousel
        v-if="investments.length"
        :autoplay="true"
        :nav="false"
        :dots="true"
        :stagePadding="50"
        :margin="20"
        :autoplayTimeout="4000"
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
          <h5>{{ investment.availableInvestmentName }}</h5>
          <p>
            <span style="font-size: 11px" class="badge badge-success">{{
              investment.status
            }}</span>
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
                >Amount Invested</span
              >
              ₦{{ addComma(investment.amountInvested) }}
            </div>
            <div class="invest_money">
              <span
                class="invest_sub_title"
                style="
                  font-size: 12px !important;
                  font-weight: bold;
                  display: block;
                  margin-bottom: 0px;
                "
                >Duration</span
              >
              {{ investment.duration }} Months
            </div>
          </div>
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
                >Interest Amount</span
              >
              ₦{{ addComma(investment.feeAmount) }}
            </div>
            <div class="invest_money">
              <span
                class="invest_sub_title"
                style="
                  font-size: 12px !important;
                  font-weight: bold;
                  display: block;
                  margin-bottom: 0px;
                "
                >Maturity Date</span
              >
              {{ removeTimeZone(investment.maturityDate) }}
            </div>
          </div>
          <div class="card_grid card_grid_button mt-4">
            <div class="invest_money"></div>
            <div class="invest_button">
              <router-link
                :to="{
                  name: 'SingleInvestment',
                  query: { code: investment.code },
                }"
                class="btn btn-outline-danger btn-sm"
                >Details <i class="fa fa-eye ml-2"></i
              ></router-link>
            </div>
          </div>
        </div>
      </carousel>
      <div class="card text-center p-5" v-else>
        <br /><br />
        <p><b>No Investment found</b></p>
        <br />
      </div>
    </div>
  </transition>
</template>

<script>
import carousel from "vue-owl-carousel";
import "@/mixins";
import { mapActions } from "vuex";
// import CardLoading from "../../loaders/CardLoading";
export default {
  props: ["investments"],
  components: {
    carousel,
    // CardLoading,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      "setActionLoading",
      "storeCurrentInvestment",
      "setCalCulateInvestmentModal",
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
  background: rgb(245, 245, 245) !important;
}
.card_item h5 {
  font-size: 19px;
  font-weight: bold;
  text-rendering: geometricPrecision;
  text-align: center;
  margin-bottom: 12px;
}
.card_item p {
  font-size: 14px;
  margin-bottom: 19px;
  text-align: center;
}

.card_grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
}

.invest_sub_title {
  color: rgb(118, 150, 104);
}

.card_grid .invest_money {
  font-weight: 800;
  font-size: 15px;
}

.card_grid a.btn.btn-danger {
  background: red !important;
  border: none;
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 10px 0px;
  border-radius: 4px;
  transition: 800ms ease;
  font-weight: 600;
}
.card_grid a.btn.btn-outline-danger {
  border: 1px solid red !important;
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 10px 0px;
  border-radius: 4px;
  transition: 800ms ease;
  font-weight: 600;
  color: red !important;
  font-size: 13px !important;
}

.card_grid a.btn.btn-danger:hover {
  background: rgb(248, 221, 221) !important;
  color: red !important;
}

.card_grid a.btn.btn-outline-danger:hover {
  background: rgb(202, 72, 72) !important;
  color: white !important;
  border: 1px solid rgb(202, 72, 72) !important;
}
.card_grid a.btn.btn-danger i {
  font-weight: bold !important;
}

@media screen and (max-width: 530px) {
  .card_item {
    padding: 30px 19px;
  }
  .card_item h5 {
    font-size: 16px !important;
  }
  .card_grid .invest_money {
    font-size: 12px;
  }
  .card_grid_button {
    display: block;
    text-align: center;
  }

  .card_grid_button a {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
