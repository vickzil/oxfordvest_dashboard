import Vue from "vue";
import $ from "jquery";

import { mapActions, mapGetters, mapState } from "vuex";

Vue.mixin({
  computed: {
    ...mapGetters(["user", "AppId", "RequestId"]),
    ...mapState(["hrmURL", "walletURL"]),

    isAdmin() {
      let userRole = this.user.userInfo.user.roles;
      let adminRole;

      if (userRole) {
        adminRole = userRole.includes("admin");
      }
      return !!adminRole;
    },
    isStaff() {
      let userRole = this.user.userInfo.user.roles;

      let staffRole;
      if (userRole) {
        staffRole = userRole.includes("staff");
      }

      return !!staffRole;
    },
    isHr() {
      let userRole = this.user.userInfo.user.roles;

      let hrRole;
      if (userRole) {
        hrRole = userRole.includes("hr");
      }

      return !!hrRole;
    },
    isSuperAdmin() {
      let userRole = this.user.userInfo.user.roles;

      let superAdminRole;
      if (userRole) {
        superAdminRole = userRole.includes("superadmin");
      }

      return !!superAdminRole;
    },
    isExecs() {
      let userRole = this.user.userInfo.user.roles;

      let execsRole;
      if (userRole) {
        execsRole = userRole.includes("execs");
      }

      return !!execsRole;
    },

    expiresAt: {
      get: function () {
        return sessionStorage.getItem("appexrat");
      },
      set: function (expiresIn) {
        return sessionStorage.setItem("appexrat", expiresIn);
      },
    },
  },
  methods: {
    ...mapActions(["setActionLoading", "setAlertModalStatus"]),
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    addComma(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    AddCammas: function (event) {
      event.target.value = event.target.value.replace(",", ".");
    },
    removeTimeZone(datestring) {
      let finalDate = "";

      if (datestring.split("+").length > 1) {
        let b = datestring.split("T");
        finalDate = b[0];
      } else {
        let b = datestring.split("T");

        if (b.length > 1) {
          b.pop();
          finalDate = b.join("-");
        }
      }

      return finalDate;
    },
    validEmail: function (email) {
      var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test(email);
    },
    hideSidebar: function () {
      $("body").addClass("offcanvas-active");
    },
    showSidebar: function () {
      $("body").removeClass("offcanvas-active");
    },
    isAuthenticated() {
      let date = new Date(this.expiresAt);

      let minusHour = date.setMinutes(date.getMinutes() - 60);

      let newExpiry = new Date().setMinutes(new Date().getMinutes());

      let newDate = newExpiry < minusHour;

      return !!newDate;
    },
    serverErrorMessage: function () {
      this.setActionLoading(false);
      setTimeout(() => {
        let payload = {
          status: true,
          type: "error",
          message: "Server Error",
        };
        this.setAlertModalStatus(payload);
      }, 200);
    },
  },
});
