<template>
  <!-- Page top navbar -->
  <nav class="navbar navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-left">
        <div class="navbar-btn">
          <router-link to="/dashboard">
            <img
              src="@/assets/images/oxfordvest.png"
              alt="Oxfordvest logo"
              class="img-fluid logo"
            />
          </router-link>

          <button type="button" class="btn-toggle-offcanvas">
            <i class="fa fa-align-left"></i>
          </button>
        </div>
        <!-- <form id="navbar-search" class="navbar-form search-form">
          <div class="alert alert-warning mb-0">
            simply dummy text of the printing and typesetting industry.
          </div>
        </form> -->
      </div>
      <div class="navbar-right">
        <div id="navbar-menu">
          <ul class="nav navbar-nav">
            <!-- <li class="dropdown hidden-xs">
              <a
                href="javascript:void(0);"
                class="dropdown-toggle icon-menu"
                data-toggle="dropdown"
              >
                <i class="fa fa-envelope-o"></i>
                <span class="notification-dot msg">4</span>
              </a>
              <ul
                class="dropdown-menu right_chat email mt-0 animation-li-delay"
              >
                <li class="header theme-bg gradient mt-0 text-light">
                  You have 4 New eMail
                </li>
                <li>
                  <a href="javascript:void(0);">
                    <div class="media">
                      <img
                        class="media-object"
                        src="@/assets/images/xs/avatar4.jpg"
                        alt=""
                      />
                      <div class="media-body">
                        <span class="name"
                          >Dr. James Wert
                          <small class="float-right font-12"
                            >Just now</small
                          ></span
                        >
                        <span class="message">Update GitHub</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li> -->
            <!-- <li class="dropdown" v-if="user">
              <a
                href="javascript:void(0);"
                class="dropdown-toggle icon-menu"
                data-toggle="dropdown"
              >
                <i class="fa fa-bell-o"></i>
              </a>
              <ul class="dropdown-menu feeds_widget mt-0 animation-li-delay">
                <li class="header theme-bg gradient mt-0 text-light">
                  {{userActivities.length}} Notification(s)
                </li>
                <li v-for="activity in userActivities" :key="activity.createdOn">
                  <a href="javascript:void(0)">
                    <div class="mr-4"><i class="fa fa-check text-red"></i></div>
                    <div class="feeds-body">
                      <h4 class="title text-danger">
                        <small class="float-right text-muted font-12"
                          >{{removeTimeZone(activity.createdOn)}}</small
                        >
                      </h4>
                      <small>{{activity.description}}</small>
                    </div>
                  </a>
                </li>
              </ul>
            </li> -->

            <li style="display: none" class="hidden-xs">
              <a href="javascript:void(0);" id="btnFullscreen" class="icon-menu"
                ><i class="fa fa-arrows-alt"></i
              ></a>
            </li>
            <li>
              <a
                @click.prevent="showLogoutModal"
                style="cursor: pointer"
                class="icon-menu"
                ><i class="fa fa-power-off"></i
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import "@/mixins";
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["currentSitePage"]),
    isNavActive() {
      return this.currentSitePage;
    },
    userActivities() {
      let activities = this.user.userInfo.userActivities;
      let someActivities = activities.slice(0, 3);
      let sortedActivities = someActivities.sort(function (a, b) {
        return a.createdOn < b.createdOn ? -1 : 1;
      });
      return sortedActivities;
    },
  },
  methods: {
    ...mapActions(["showLogoutModal"]),
  },
};
</script>
