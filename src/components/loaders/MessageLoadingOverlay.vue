<template>
  <transition name="fade">
    <div class="page_processing_modal" v-if="alertModalStatus">
      <div class="page_processing_card">
        <!-- <img
          src="@/assets/images/oxfordvest.png"
          alt=""
        > -->
        <h4>status Info</h4>
        <p :class="alertModalType == 'success' ? 'text-dark' : 'text-danger'">
          {{ alertModalMessage }}
        </p>
        <button
          :class="
            alertModalType == 'success'
              ? 'btn btn-success btn-sm'
              : 'btn btn-danger btn-sm'
          "
          @click="setalertModalStatus"
        >
          Okay
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["alertModalMessage", "alertModalType"]),
    ...mapState(["alertModalStatus"]),
  },

  methods: {
    ...mapActions(["setAlertModalStatus"]),
    setalertModalStatus: function () {
      this.setAlertModalStatus({
        type: "",
        status: false,
        message: "",
      });
    },
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
  transition: 800ms ease;
}

.page_processing_card {
  background: rgb(255, 255, 255);
  width: 320px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 3%;
  box-shadow: 3px 6px 10px 0 rgb(0 102 245 / 7%);
  text-align: center;
}

.page_processing_card h4 {
  font-weight: bold;
  font-size: 15px;
  /* margin-top: 20px; */
  margin-bottom: 20px;
}

.page_processing_card p {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 19px;
  line-height: 1.6;
}

.page_processing_card button {
  width: 38%;
  font-weight: bold;
  cursor: pointer;
}
.page_processing_card img {
  width: 50px;
}

@media screen and (max-width: 350px) {
  .page_processing_card {
    width: 95%;
    margin: auto;
  }
}
</style>
