<template>
  <div class="home_tab">
    <button
      v-for="(investmentCategory, index) in investmentCategories"
      :key="investmentCategory.code"
      :class="index == 0 && 'tab_active'"
      class="btn btn-danger invest_button"
      @click="toggleActiveInvestButton($event, investmentCategory)"
    >
      {{ investmentCategory.name }}
    </button>
  </div>
</template>

<script>
import "@/mixins";

import $ from "jquery";
import { mapActions } from "vuex";
export default {
  computed: {
    investmentCategories() {
      return this.user.availableInvestmentCategories;
    },
  },
  methods: {
    ...mapActions(["investmentCategoryText"]),
    toggleActiveInvestButton: function (event, investmentCategory) {
      $(".invest_button").removeClass("tab_active");
      let className = event.target;

      if ($(className).hasClass("tab_active")) {
        return;
      }

      $(className).addClass("tab_active");
      this.investmentCategoryText("");
      setTimeout(() => {
        this.investmentCategoryText(investmentCategory.code);
      }, 300);
    },
  },
};
</script>

<style scoped>
/* HOME TAB */

.home_tab {
  /* border-bottom: 2px solid #ffcbc7; */
  text-align: center;
  display: flex;
  width: 100%;
  overflow-x: scroll;
  transition: all 400ms ease-in-out;
  /* margin-bottom: 20px; */
  padding-left: 10px;
  /* height: 80px; */
}

.home_tab::-webkit-scrollbar {
  width: 0px;
  border: none;
  transition: all 400ms ease-in-out;
}

.home_tab button {
  /* font-size: 17px;
  padding: 10px 22px;
  cursor: pointer;
  margin-bottom: 0px;
  transition: all 400ms ease-in-out; */
  background: rgb(255, 250, 250) !important;
  /* background-color: #ffe3e1 !important; */
  border: none;
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 10px 0px;
  border-radius: 4px;
  transition: all 800ms ease;
  font-weight: bold;
  padding: 7px 22px;
  margin-right: 7px;
  color: rgb(134, 19, 19) !important;
  margin-bottom: 20px;
}

.home_tab button:hover {
  color: rgb(134, 19, 19) !important;
  background-color: #ffbbb6 !important;
}

.home_tab button.tab_active {
  background: red !important;
  color: rgb(255, 255, 255) !important;
  font-weight: 500;
}
</style>
