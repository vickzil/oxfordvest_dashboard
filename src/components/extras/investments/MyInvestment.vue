<template>
  <div class="row clearfix">
    <div class="col-12">
      <div class="section_title">
        <div class="mr-3 mb-3">
          <h3>My Investments</h3>
        </div>
      </div>
    </div>
    <div class="col-lg-12 col-md-12">
      <div class="oxfordvest_tabs">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#AllInvestments"
              >All</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#activeInvestments"
              >Running</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#inActiveInvestments"
              >Completed</a
            >
          </li>
        </ul>
      </div>

      <div class="tab-content padding-0">
        <div class="tab-pane active" id="AllInvestments">
          <MyInvestmentCarousel :investments="all" />
        </div>
        <div class="tab-pane" id="activeInvestments">
          <MyInvestmentCarousel :investments="active" />
        </div>
        <div class="tab-pane" id="inActiveInvestments">
          <MyInvestmentCarousel :investments="inActive" />
        </div>
      </div>
    </div>
    <div class="col-12"></div>
  </div>
</template>

<script>
import "@/mixins";
import MyInvestmentCarousel from "./MyInvestmentCarousel";
export default {
  components: {
    MyInvestmentCarousel,
  },

  computed: {
    all() {
      // console.log(this.user.userInfo.userInvestmentInfo)
      return this.user.userInfo.userInvestmentInfo.userInvestments;
    },
    active() {
      return this.user.userInfo.userInvestmentInfo.activeUserInvestments;
    },
    inActive() {
      return this.user.userInfo.userInvestmentInfo.inactiveUserInvestments;
    },
  },
};
</script>

<style></style>
