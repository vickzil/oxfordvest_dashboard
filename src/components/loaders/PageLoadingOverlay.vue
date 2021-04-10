<template>
  <div class="page_loading_modal" v-if="!user || !isUserLoggedIn">
    <div class="page_processing_card">
      <br />
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <p style="margin-top: 90px; padding-left: 0px; font-weight: 900">
          Please wait...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import "@/mixins";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isUserLoggedIn", "isPageLoading"]),
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
  background: rgba(99, 94, 94, 0.699);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 69999999100000000000000000000000000000 !important;
  transition: 400ms ease;
}

.page_processing_card {
  background: rgb(255, 255, 255);
  width: 290px;
  height: 280px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.page_processing_card h4 {
  font-weight: bold;
  font-size: 14px;
  /* margin-top: 20px; */
  margin-bottom: 20px;
}

.page_processing_card p {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 19px;
}

.page_processing_card button {
  width: 38%;
  font-weight: bold;
  cursor: pointer;
}
.page_processing_card img {
  width: 50px;
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
