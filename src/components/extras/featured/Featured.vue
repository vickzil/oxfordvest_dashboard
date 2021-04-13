<template>
  <div class="row clearfix">
    <div class="col-12">
      <div class="investment_carousel_div">
        <!-- <CardLoading /> -->

        <div>
          <carousel
            :autoplay="true"
            :nav="false"
            :dots="false"
            :stagePadding="20"
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
            <div class="card_item card" v-for="image in images" :key="image">
              <img :src="image" alt="" />
            </div>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
export default {
  components: {
    carousel,
  },

  data: () => ({
    images: [
      require("@/assets/images/agrovest.jpeg"),
      require("@/assets/images/buildvest.jpeg"),
      require("@/assets/images/agrovest2.jpeg"),
      require("@/assets/images/mortagagevest.jpeg"),
    ],
  }),
};
</script>

<style scoped>
.investment_carousel_div {
  position: relative;
  overflow: hidden;
}

.card_item {
  padding: 0px;
  box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
  /* width: 380px; */

  border-radius: 9px;
  /* border-top: 4px solid rgb(255, 96, 96); */
  transition: all 0.3s ease-in-out 0s;
}

.card_item.card:hover {
  background: rgba(46, 34, 34, 0.63) !important;
  /* box-shadow: rgba(68, 88, 144, 0.1) 0px 30px 10px 0px; */
}

/* @media screen and (max-width: 530px) {
  .card_item {
    padding: 30px 19px;
  }
} */
</style>
