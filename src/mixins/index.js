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
        adminRole = userRole.includes("systemadmin");
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
    ...mapActions(["setActionLoading", "setAlertModalStatus", "logout"]),
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
    isAuthenticated: function () {
      let date = new Date(this.expiresAt);

      let minusHour = date.setMinutes(date.getMinutes() - 90);

      let newExpiry = new Date().setMinutes(new Date().getMinutes());

      let newDate = newExpiry < minusHour;

      return !!newDate;
    },
    getLocalTYime: function (data) {
      var d = new Date(data);
      return d.toLocaleTimeString().replace(/:\d+ /, " ");
    },
    formatDate: function (date) {
      var d = new Date(date);
      var hours = d.getHours();
      var minutes = d.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      let returnedDate;

      var newD = new Date();

      let userdate =
        d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
      let todaysdate =
        newD.getDate() + "/" + (newD.getMonth() + 1) + "/" + newD.getFullYear();

      if (userdate === todaysdate) {
        returnedDate = "Today, " + strTime;
      } else {
        returnedDate =
          d.getDate() +
          "/" +
          (d.getMonth() + 1) +
          "/" +
          d.getFullYear() +
          "  " +
          strTime;
      }

      return returnedDate;
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
    inactivityTime: function () {
      var time;
      window.onload = this.resetTimer(time);
      // DOM Events
      document.onmousemove = this.resetTimer(time);
      document.onkeypress = this.resetTimer(time);
    },
    resetTimer: function (time) {
      // console.log(time);
      clearTimeout(time);
      time = setTimeout(
        this.logoutUser,
        Math.round(new Date(this.expiresAt).getTime() / 1000)
      );
    },
    logoutUser: function () {
      this.logout();

      setTimeout(() => {
        this.$router.push("/login");
      }, 1200);
    },
  },
});
