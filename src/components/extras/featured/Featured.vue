<template>
  <div class="row clearfix" v-if="user && adverts">
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
            <!-- <div
              class="card_item"
              v-for="advert in adverts"
              :key="advert.imageUrl"
            >
              <img :src="advert.imageUrl" alt="" />
            </div> -->

            <div
              class="project-box filter animated"
              v-for="advert in adverts"
              :key="advert.imageUrl"
            >
              <div class="imgbox">
                <a :href="advert.link" target="_blank"
                  ><img :src="advert.imageUrl" class="hover-shadow"
                /></a>
              </div>
              <div class="project-details">
                <div class="text-center">
                  <p>{{ advert.description }}</p>
                  <a
                    v-if="advert.link"
                    :href="advert.link"
                    class="text-center small-heading"
                    target="_blank"
                    >Details</a
                  >
                </div>
              </div>
            </div>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
import "@/mixins";
import { mapGetters } from "vuex";
export default {
  components: {
    carousel,
  },

  computed: {
    ...mapGetters(["adverts"]),
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

  /* border-top: 4px solid rgb(255, 96, 96); */
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
}

.card_item img {
  /* box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 19px 10px; */
  box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
  object-fit: cover;
  height: 240px;
  margin-bottom: 20px;
  border-radius: 9px;
}

.investment_carousel_div .project-box {
  position: relative;
  background: transparent;
  box-sizing: border-box;
  display: inline-block;
  width: 100% !important;
  cursor: pointer;
}

.investment_carousel_div .project-box .imgbox {
  position: relative;
  overflow: hidden;
  height: 240px;
  border-radius: 10px;
}

.investment_carousel_div .project-box .imgbox img {
  width: 100% !important;
  height: 100%;
  transition: transform 2s;
  object-fit: cover;
}

.investment_carousel_div .project-box .project-details {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background: rgba(247, 247, 252, 0.7);
  transform: scaleY(0);
  transition: transform 0.5s;
  padding: 40px 20px;
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 10px;
}

.investment_carousel_div .project-box .project-details p {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 30px;
  color: #222;
}

.investment_carousel_div .project-box .project-details a {
  font-weight: bold;
  text-decoration: none;
  background: red !important;
  color: white !important;
  border-radius: 4px;
  transition: 800ms ease;
  padding: 10px;
  box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
}

/* .investment_carousel_div .project-box .project-details a:hover {
  background: #f3f3f3 !important;
  color: #222 !important;
} */

.investment_carousel_div.active .project-box .project-details p {
  color: #fff;
}

/* .investment_carousel_div .project-box:hover .project-details {
  transform: scaleY(1);
} */

.investment_carousel_div .project-box .project-details .fa-link,
.investment_carousel_div .project-box .project-details .fa-search {
  font-size: 25px;
  margin-top: 20px;
  color: #ffff;
}

.project_img_flex {
  margin-top: 120px;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(2, 1fr);
  grid-row: auto;
}

.project_img_flex img {
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

img.hover-shadow {
  transition: 0.3s;
}

.hover-shadow:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@media screen and (max-width: 970px) {
  .investment_carousel_div .project-box .imgbox {
    height: 190px;
  }
}
@media screen and (max-width: 500px) {
  .investment_carousel_div .project-box .imgbox {
    height: 250px;
    padding: 30px 10px;
  }
}
</style>
