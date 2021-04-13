/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <!-- Page header section  -->
        <!-- <PageHeader :topPageName="topPageName" /> -->

        <div class="row clearfix" v-if="user">
          <div class="col-12 mt-4">
            <div class="oxfordvest_tabs">
              <ul class="nav nav-tabs">
                <!-- <li class="nav-item">
                <a
                  class="nav-link "
                  data-toggle="tab"
                  href="#Notifications"
                  >Notifications
                </a>
              </li> -->
                <li class="nav-item">
                  <a
                    class="nav-link active show"
                    data-toggle="tab"
                    href="#Change_Password"
                    >Change Password
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#Change_pin"
                    >Change pin
                  </a>
                </li>
              </ul>
            </div>
            <div class="tab-content">
              <div class="tab-pane" id="Notifications">
                <div class="card">
                  <div class="card-header">Notifications Settings</div>
                  <div class="body">
                    <ul class="list-group">
                      <li class="list-group-item">
                        Anyone send me a message
                        <div class="float-right">
                          <label class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                            />
                            <span class="custom-control-label">&nbsp;</span>
                          </label>
                        </div>
                      </li>
                      <li class="list-group-item">
                        Anyone seeing my profile page
                        <div class="float-right">
                          <label class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              checked=""
                            />
                            <span class="custom-control-label">&nbsp;</span>
                          </label>
                        </div>
                      </li>
                      <li class="list-group-item">
                        Anyone posts a comment on my post
                        <div class="float-right">
                          <label class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              checked=""
                            />
                            <span class="custom-control-label">&nbsp;</span>
                          </label>
                        </div>
                      </li>
                      <li class="list-group-item">
                        Anyone send me a message
                        <div class="float-right">
                          <label class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                            />
                            <span class="custom-control-label">&nbsp;</span>
                          </label>
                        </div>
                      </li>
                      <li class="list-group-item">
                        Anyone seeing my profile page
                        <div class="float-right">
                          <label class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                            />
                            <span class="custom-control-label">&nbsp;</span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="tab-pane active show" id="Change_Password">
                <ChangePasswordForm />
              </div>
              <div class="tab-pane" id="Change_pin">
                <ChangePinForm />
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br />
      </div>
    </div>
  </div>
</template>
<script>
// import Navbar from "@/components/navbar/Navbar";
// import PageHeader from "../components/header/PageHeader";
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";
import ChangePinForm from "../components/forms/ChangePinForm";
import "@/mixins";

import { mapActions } from "vuex";

export default {
  name: "Settings",
  components: {
    PageLoadingOverlay,
    // PageHeader,
    ChangePasswordForm,
    ChangePinForm,
  },

  data() {
    return {
      topPageName: "Settings",
    };
  },

  methods: {
    ...mapActions(["currentSitePage", "closePageLoading", "showPageLoading"]),
    removeOffcanvas: function () {
      document.body.classList.remove("offcanvas-active");
    },
  },

  mounted() {
    this.currentSitePage(this.$router.history.current.path);
    this.closePageLoading();
  },
  beforeRouteLeave(to, from, next) {
    // this.showPageLoading();
    this.removeOffcanvas();
    next();
  },
};
</script>
<style scoped></style>
