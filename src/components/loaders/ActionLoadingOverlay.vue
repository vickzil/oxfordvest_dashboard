<template>
  <transition name="fade">
    <div class="page_processing_modal" v-if="actionProcessing">
      <div class="page_processing_card">
        <div class="text-center">
           <img
            src="@/assets/images/favicons.png"
            class="user-photo"
            style="width: 80px; height: 80px;"
          />

          <p style="margin-top: 90px; padding-left: 0px; font-weight: 900">
            Please wait...
          </p>
        </div>
        <!-- <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div> -->
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["actionProcessing"]),
  },
};
</script>

<style scoped>
.page_processing_modal {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: rgba(59, 59, 59, 0.479);
  /* background: rgba(99, 94, 94, 0.699); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 69999999100000000000000000000000000000 !important;
  transition: 400ms ease;
}

.page_processing_card {
  /* background: rgb(255, 255, 255); */
  position: relative;
  width: 290px;
  height: 180px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 3%;
  /* box-shadow: 3px 6px 10px 0 rgb(0 102 245 / 7%); */
  text-align: center;
}

.page_processing_card h4 {
  font-weight: bold;
  font-size: 14px;
  /* margin-top: 20px; */
  margin-bottom: 20px;
}

.page_processing_card p {
  font-size: 15px;
  font-weight: bold;
  margin-top: 7px!important;
  margin-bottom: 19px;
  margin-left: 4px;
  color: #fff!important;
}

.page_processing_card button {
  width: 38%;
  font-weight: bold;
  cursor: pointer;
}
.page_processing_card img {
  width: 70px;
  /* background: #fff; */
  object-fit: contain;
  /* border-radius: 100%; */
  /* padding: 8px; */
  animation: rotation 1.5s infinite linear;
  /* animation: autoRotate;
    animation-duration: 2.2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-play-state: running; */
}

@keyframes rotation {
   0% {
        transform: scale(1);
    }
    52% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}

.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 100px;
  height: 90px;
  /* background: rgb(255, 255, 255);
  padding: 30px; */
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: rgb(231, 1, 1);
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@media screen and (max-width: 350px) {
  .page_processing_card {
    width: 95%;
    margin: auto;
  }
}
</style>
