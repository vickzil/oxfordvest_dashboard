<template>
  <transition name="fade">
    <div class="page_processing_modal" v-if="logoutModal">
      <div class="page_processing_card">
        <!-- <img
          src="@/assets/images/oxfordvest.png"
          alt=""
        > -->
        <h4>Logout Alert</h4>
        <p>Do you want to Logout?</p>
        <div class="row">
          <div class="col-md-6">
            <button class="btn btn-light btn-sm" @click="closeLogoutModal">
              Cancel
            </button>
          </div>
          <div class="col-md-6">
            <button class="btn btn-success btn-sm" @click="logoutUser">
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
import "@/mixins";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["logoutModal"]),
  },

  methods: {
    ...mapActions(["closeLogoutModal", "setActionLoading", "logout"]),
    ...mapState(["alertStatus", "alertMessage"]),

    logoutUser: function () {
      this.alertStatus(false);
      this.alertMessage("");
      this.setActionLoading(true);
      this.logoutFromServer();

      setTimeout(() => {
        this.setActionLoading(false);
        this.logout();
        this.$router.push("/login");
      }, 1210);
    },
    logoutFromServer: async function () {
      const url = `${this.hrmURL}/v1.0/OAuth/signOut`;
      var data = {
        userName: this.user.userInfo.user.userName,
      };
      // var fd = new FormData();
      // fd.append("userName", this.user.userInfo.user.userName);

      const response = await axios.post(url, data);

      try {
        if (response) {
          response;
        }
      } catch (error) {
        if (error) {
          error;
        }
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
