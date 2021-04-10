<template>
  <transition name="fade">
    <div class="page_processing_modal" v-if="verifyStatus">
      <div class="page_processing_card">
        <h4>{{ verifyMessageHeader }}</h4>
        <p>{{ verifyMessagedescription }}?</p>
        <div class="row">
          <div class="col-md-6">
            <button class="btn btn-light btn-sm" @click="setVerifyActionModal">
              Cancel
            </button>
          </div>
          <div class="col-md-6">
            <button class="btn btn-success btn-sm" @click="setAction">
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import "@/mixins";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "verifyStatus",
      "verifyType",
      "verifyMessageHeader",
      "verifyMessagedescription",
      "currentClickPayload",
    ]),
  },

  methods: {
    ...mapActions([
      "setVerifyAction",
      "setActionLoading",
      "logout",
      "updateBankCard",
      "setModalLoading",
      "setAlertModalStatus",
    ]),

    setVerifyActionModal: function () {
      let payload = {
        status: false,
        type: "",
        title: "",
        des: "",
      };
      this.setVerifyAction(payload);
    },

    setAction: function () {
      if (this.verifyType == "DELETE_CARD") {
        this.deleteBankCard(this.currentClickPayload);
        // console.log(this.currentClickPayload);
        return;
      }
    },

    deleteBankCard: async function (payload) {
      this.setModalLoading(true);
      const url = `${this.hrmURL}/v1.0/UserCard/deleteUserCard`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.user.userInfo.user.code,
        CardCode: payload.cardCode,
      };

      const result = await axios.post(url, data);

      try {
        let resultData = result.data;

        let userCode = this.user.userInfo.user.code;
        this.fetchUserData(userCode);

        setTimeout(() => {
          this.setModalLoading(false);

          let payload = {
            status: true,
            type: "success",
            message: "Card Deleted",
          };

          this.setAlertModalStatus(payload);
        }, 2000);

        console.log(resultData);
      } catch (error) {
        console.log(error);

        this.setModalLoading(false);
        this.serverErrorMessage();
      }
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15 ease-out !important;
}

.fade-enter,
.fade-leave-to {
  opacity: 0 !important;
}
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
  z-index: 110000000000000000000000000000000000000000000 !important;
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
  font-size: 17px;
  /* margin-top: 20px; */
  margin-bottom: 20px;
}

.page_processing_card p {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 19px;
}

.page_processing_card button {
  /* width: 38%; */
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
