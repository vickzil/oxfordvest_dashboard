<template>
  <div class="signin">
    <div class="sign_wrapper forsignup">
      <Logo />

      <div class="sign_header">
        <div class="well" style="margin-top: 4%">
          <div class="card">
            <div class="card-body text-center">
              <div class="display-3 text-muted mb-5">
                <i class="si si-exclamation"></i> 404
              </div>
              <h1 class="h3 mb-3">Oops.. You just found an error page..</h1>
              <p class="h6 text-muted font-weight-normal mb-3">
                We are sorry but our service is currently not available&hellip;
              </p>
              <a
                class="btn btn-primary"
                href="javascript:history.back()"
                @click="hasHistory() ? $router.go(-1) : $router.push('/')"
                ><i class="fa fa-arrow-left mr-2"></i>Go back</a
              >
            </div>
          </div>
        </div>
      </div>

      <p class="signupp text-center">
        <router-link to="/login" class="font-weight-bold">
          Send me Back
        </router-link>
        to the Login.
      </p>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import Logo from "../components/extras/Logo";
// import AccountSocialIcons from "../components/extras/AccountSocialIcons";

export default {
  name: "ThankYou",
  components: {
    Logo,
    // AccountSocialIcons
  },
  methods: {
    hasHistory: function () {
      return window.history.length > 2;
    },
  },
};
</script>
<style></style>
