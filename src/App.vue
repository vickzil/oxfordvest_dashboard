/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <div id="app">
    <AllModal />
    <ActionLoadingOverlay />
    <MessageLoadingOverlay />
    <div id="body" class="theme-orange">
      <div class="overlay"></div>
      <div id="wrapper">
        <Navbar v-if="user" />

        <transition name="page" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/mooli.min.css";
import "@/assets/css/custom.css";
import "@/assets/css/account.css";
import "@/assets/css/account2.css";

import $ from "jquery";

import Navbar from "./components/navbar/Navbar";
import ActionLoadingOverlay from "./components/loaders/ActionLoadingOverlay";
import MessageLoadingOverlay from "./components/loaders/MessageLoadingOverlay";
import AllModal from "./components/modals/AllModal";
import "@/mixins";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    ActionLoadingOverlay,
    MessageLoadingOverlay,
    AllModal,
    Navbar,
  },

  computed: {
    ...mapGetters([
      "user",
      "registrationInfo",
      "isUserLoggedIn",
      "alertStatus",
      "AppId",
      "RequestId",
    ]),
  },
  methods: {
    ...mapActions([
      "logout",
      "fetchUserData",
      "fetchBankNames",
      "fetchRegistrationInfo",
      "getPaymentFeeInfo",
    ]),

    checkUserAuthentication: function () {
      const token = sessionStorage.getItem("appUserThemeSettingsCode");
      let userCode = sessionStorage.getItem("activeformations");

      let requireAuthRoutes = this.$router.history.current.meta.requiresAuth;

      if (requireAuthRoutes == true) {
        if (token && userCode) {
          if (!this.isAuthenticated()) {
            this.logout();
            sessionStorage.clear();
            // this.$router.push("/").catch((error) => {
            //   if (error) {
            //     error;
            //   }
            // });
          } else {
            var data = {
              AppId: this.AppId,
              RequestId: this.RequestId,
              Country: "NG",
            };
            this.fetchUserData(userCode);
            this.fetchBankNames(data);

            // setTimeout(() => {
            //   this.getPaymentFeeInfo();
            // }, 3000);
          }
        } else {
          this.logout();
          sessionStorage.clear();
          this.$router.push("/").catch((error) => {
            if (error) {
              error;
              console.log("not found 3");
            }
          });
        }
      }
    },

    getRegistrationInfo: function () {
      if (this.registrationInfo == null) {
        this.fetchRegistrationInfo();
      }
    },
  },

  mounted() {
    this.getRegistrationInfo();

    $("#app").on("click", ".btn-toggle-offcanvas", () => {
      $("body").toggleClass("offcanvas-active");
    });

    $("#app").on("click", ".menu_toggle", () => {
      $("body").toggleClass("toggle_menu_active");
    });
  },
  created: function () {
    this.checkUserAuthentication();

    $("#app").on("click", ".btn-toggle-offcanvas", () => {
      if ($("body").hassClass("offcanvas-active")) {
        $("body").removeClass("offcanvas-active");
      } else {
        $("body").addClass("offcanvas-active");
      }
    });

    $("#app").on("click", ".menu_toggle", () => {
      // $("body").toggleClass("toggle_menu_active");

      if ($("body").hassClass("toggle_menu_active")) {
        $("body").removeClass("toggle_menu_active");
      } else {
        $("body").addClass("toggle_menu_active");
      }
    });
  },
};
</script>

<style>
body {
  padding-top: 0px !important;
}

.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-to,
.page-leave {
  opacity: 1;
  transform: translateY(0);
}

.hrm_button {
  border: none !important;
  box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
  font-weight: bold;
}

.oxfordvest_button {
  background: red !important;
  color: white !important;
  border: none !important;
  box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
  font-weight: bold;
  transition: all 300ms ease-in-out;
  cursor: pointer;
}

.oxfordvest_button:hover {
  background: rgb(255, 255, 255) !important;
  color: rgb(49, 25, 25) !important;
}

.oxfordvest_button:focus {
  outline: none !important;
  outline-color: transparent !important;
  border: none !important;
}

.oxfordvest_button span {
  color: rgb(236, 231, 231) !important;
}

.oxfordvest_button span:hover {
  color: rgb(49, 25, 25) !important;
}

.oxfordvest_button:disabled,
.oxfordvest_button[disabled] {
  color: #fff !important;
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
  opacity: 0.65 !important;
}

input:focus {
  border: none !important;
  color: #212529 !important;
}

select:focus {
  border: none !important;
  color: #212529 !important;
}
textarea {
  color: #212529 !important;
}

.card_copy {
  font-size: 12px;
  display: inline-block;
  background: #fdeaea;
  /* background: #f1959b; */
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #fda9a7;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  text-align: center;
  animation: copyAnimate;
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  width: 200px;
}
.card_copy:hover {
  background: #fcbdbc;
  border: 1px solid #ff8d6a;
}
.card_copy .h6 {
  font-size: 13px !important;
  font-weight: bold;
}

@keyframes copyAnimate {
  0% {
    background: #fdeaea;
  }

  50% {
    background: #fdc6c6;
  }

  100% {
    background: #fdeaea;
  }
}

.oxfordvest_tabs {
  background: transparent !important;
}

.oxfordvest_tabs .nav-tabs {
  border: none !important;
  border-color: transparent !important;
  display: flex !important;
  flex-wrap: nowrap !important;
  width: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
}

.oxfordvest_tabs .nav-link {
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

.oxfordvest_tabs .nav-tabs::-webkit-scrollbar {
  width: 0px;
  transition: all 800ms ease;
}

.oxfordvest_tabs .nav-link:hover {
  color: rgb(134, 19, 19) !important;
  background-color: #ffbbb6 !important;
}

.oxfordvest_tabs .nav-link.active {
  background: red !important;
  color: rgb(255, 255, 255) !important;
  font-weight: 500;
}

.oxfordvest_buttons {
  background: red !important;
  /* background-color: #ffe3e1 !important; */
  border: none;
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 10px 0px;
  border-radius: 4px;
  transition: all 800ms ease;
  font-weight: bold;
  padding: 7px 22px;
  margin-right: 7px;
  color: rgb(255, 255, 255) !important;
  margin-bottom: 20px;
}

.oxfordvest_buttons:hover {
  color: rgb(134, 19, 19) !important;
  background-color: #f5dbd9 !important;
}
.table thead tr th {
  font-weight: bold !important;
}

.oxfordvest_foorm .vs__selected {
  width: 100%;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.oxfordvest_foorm .vs__clear {
  display: none;
}

.vs__selected-options {
  flex-wrap: nowrap !important;
}

.oxfordvest_foorm .vs1__combobox {
  width: 240px;
}

@media (max-width: 768px) {
  .oxfordvest_tabs .nav-link {
    margin-bottom: 14px;
    padding: 7px 12px;
    font-size: 14px;
  }

  .oxfordvest_tabs .nav-tabs::-webkit-scrollbar {
    width: 5px !important;
    height: 8px !important;
  }

  /* Track */
  .oxfordvest_tabs .nav-tabs::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  .oxfordvest_tabs .nav-tabs::-webkit-scrollbar-thumb {
    background: rgb(192, 192, 192);
  }
  .oxfordvest_foorm .vs__selected {
    width: 100%;
  }

  .oxfordvest_foorm .vs1__combobox {
    width: auto;
  }

  .vs__actions {
    display: flex;
    align-items: flex-start;
    padding: 8px 6px 0 3px;
  }
}

@media (max-width: 568px) {
  .oxfordvest_button {
    font-size: 13px !important;
  }
  .oxfordvest_button i {
    font-size: 13px !important;
  }
}
</style>
