<template>
  <!-- Main left sidebar menu -->
  <div id="left-sidebar" class="sidebar light_active">
    <a href="javascript:void(0);" class="menu_toggle"
      ><i class="fa fa-angle-left"></i
    ></a>
    <div class="navbar-brand">
      <router-link to="/dashboard">
        <img
          src="@/assets/images/oxfordvest.png"
          alt="Oxfordvest"
          class="img-fluid logo"
        />
        <span><b>Oxfordvest</b></span>
      </router-link>
      <button
        type="button"
        class="btn-toggle-offcanvas sidebar_close btn btn-sm float-right"
      >
        <i class="fa fa-close"></i>
      </button>
    </div>
    <div class="sidebar-scroll" v-if="user">
      <div class="user-account">
        <div class="user_div">
          <img
            v-if="user.userInfo.user.photo"
            :src="user.userInfo.user.photo"
            class="user-photo"
            style="width: 40px; height: 40px; object-fit: cover"
          />
        </div>
        <div class="dropdown">
          <span>Welcome</span>
          <a
            href="javascript:void(0);"
            class="dropdown-toggle user-name"
            data-toggle="dropdown"
            ><strong>{{ user.userInfo.user.firstName }}</strong></a
          >
          <ul class="dropdown-menu dropdown-menu-right account vivify flipInY">
            <li>
              <router-link to="/profile">
                <i class="fa fa-user"></i>My Profile
              </router-link>
            </li>
            <li>
              <a href="javascript:void(0)"
                ><i class="fa fa-envelope"></i>Messages</a
              >
            </li>
            <li>
              <router-link to="/settings">
                <i class="fa fa-gear"></i>Settings
              </router-link>
            </li>
            <li class="divider"></li>
            <li>
              <a href="javascript:void(0)" @click.prevent="showLogoutModal"
                ><i class="fa fa-power-off"></i>Logout</a
              >
            </li>
          </ul>
        </div>
      </div>
      <nav id="left-sidebar-nav" class="sidebar-nav">
        <ul id="main-menu" class="metismenu animation-li-delay">
          <!-- <li class="header">Hospital</li> -->
          <li :class="isNavActive === '/dashboard' && 'active'">
            <router-link to="/dashboard">
              <i class="fa fa-dashboard"></i>Dashboard
            </router-link>
          </li>
          <li :class="isNavActive === '/bank-account' && 'active'">
            <router-link to="/bank-account">
              <i class="fa fa-money"></i>
              <span>Bank Account</span>
            </router-link>
          </li>
          <li :class="isNavActive === '/investment' && 'active'">
            <router-link to="/investment">
              <i class="fa fa-bar-chart"></i>
              <span>Investments</span>
            </router-link>
          </li>
          <li :class="isNavActive === '/referral' && 'active'">
            <router-link to="/referral">
              <i class="fa fa-users"></i>
              <span>Referral</span>
            </router-link>
          </li>
          <!-- <li :class="isNavActive === '/wallet' && 'active'">
            <router-link to="/wallet">
              <i class="fa fa-credit-card"></i>
              <span>Wallet</span>
            </router-link>
          </li> -->
          <li :class="isNavActive === '/transaction' && 'active'">
            <router-link to="/transaction">
              <i class="fa fa-handshake-o"></i>
              <span>Transaction</span>
            </router-link>
          </li>
          <li :class="isNavActive === '/profile' && 'active'">
            <router-link to="/profile">
              <i class="fa fa-address-book-o"></i>
              <span>Profile</span>
            </router-link>
          </li>
          <li :class="isNavActive === '/settings' && 'active'">
            <router-link to="/settings">
              <i class="fa fa-cogs"></i>
              <span>Settings</span>
            </router-link>
          </li>

          <!-- <li class="header">Control</li>


          <li><a href="javascript:void(0)"><i class="fa fa-bar-chart"></i> <span>Investments</span></a></li>
          <li><a href="javascript:void(0)"><i class="fa fa-users"></i> <span>Referals</span></a></li>
          <li><a href="javascript:void(0)"><i class="fa fa-th-list"></i> <span>Wallet</span></a></li>

          <li class="header">Control</li>
          <li><a href="javascript:void(0)"><i class="fa fa-cog"></i> <span>Settings</span></a></li>
          <li><a href="javascript:void(0)"><i class="fa fa-power-off"></i> <span>Logout</span></a></li> -->
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import "@/mixins";
import $ from "jquery";

import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["currentSitePage"]),
    isNavActive() {
      return this.currentSitePage;
    },
  },

  methods: {
    ...mapActions(["showLogoutModal"]),
  },
  mounted() {
    $("#app").on("click", ".btn-toggle-offcanvas", () => {
      $("body").toggleClass("offcanvas-active");
    });

    $("#app").on("click", ".menu_toggle", () => {
      $("body").toggleClass("toggle_menu_active");
    });
  },
  created() {
    $("#app").on("click", ".btn-toggle-offcanvas", () => {
      $("body").toggleClass("offcanvas-active");
    });

    $("#app").on("click", ".menu_toggle", () => {
      $("body").toggleClass("toggle_menu_active");
    });
  },
};
</script>
<style scoped>
.nav_span {
  margin-left: 13px !important;
}

.user-account .dropdown .dropdown-menu {
  left: 0px !important;
}
</style>
