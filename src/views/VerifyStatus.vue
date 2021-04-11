<template>
  <div class="account_body">
    <div class="more-info">
      <Logo />

      <div class="more_info_grid">
        <div class="right-content">
          <form class="form small_form">
            <img
              class="rtc_image"
              src="@/assets/images/oxfordvest.png"
              width="120"
              height="45"
              alt="logo"
            />
            <h2 class="right-content-title" style="text-align: center">
              {{ pageTitle }}
            </h2>
            <span style="text-align: center; margin-bottom: 20px">{{
              pageDescription1
            }}</span>

            <div class="text-center">
              <router-link
                to="/login"
                v-if="status === 'true'"
                class="font-weight-bold btn-sm filled-button"
              >
                Login
              </router-link>

              <router-link
                to="/confirm"
                v-else
                class="font-weight-bold btn-sm filled-button"
              >
                Resend email
              </router-link>
            </div>
          </form>

          <!-- <div class="text-center">
            <p class="signupp" >
              continue,
              <router-link
                to="/login"
                class="font-weight-bold btn-sm filled-button"
              >
                Send me Back
              </router-link>
              to the Login.
            </p>
            <p class="signupp" v-else>
              <router-link
                to="/confirm"
                class="font-weight-bold btn-sm filled-button"
              >
                Resend email confirmation link
              </router-link>
            </p>
          </div> -->
        </div>
        <AccountLeft />
      </div>
      <AccountCircles />
    </div>
  </div>

  <!-- <div class="signin">
    <div class="sign_wrapper forsignup">
      <Logo />

      <div class="sign_header thankYou">
        <h4
          class="font-weight-bold text-center"
          style="color: rgb(44, 37, 37); font-weight: 900"
        >
          {{ pageTitle }}
        </h4>
        <p style="color: rgb(51, 18, 18); text-align: center">
          {{ pageDescription1 }}
        </p>
      </div>

      <div class="text-center">
        <p class="signupp" v-if="status === 'true'">
          continue,
          <router-link to="/login" class="font-weight-bold">
            Send me Back
          </router-link>
          to the Login.
        </p>
        <p class="signupp" v-else>
          <router-link to="/confirm" class="font-weight-bold">
            Resend email confirmation link
          </router-link>
        </p>
      </div>
    </div>
  </div> -->
</template>
<script>
import AccountLeft from "../components/extras/AccountLeft";
import AccountCircles from "../components/extras/AccountCircles";
import Logo from "../components/extras/Logo";
export default {
  name: "VerifyStatus",
  components: {
    AccountLeft,
    AccountCircles,
    Logo,
    // AccountSocialIcons
  },

  computed: {
    status() {
      return localStorage.getItem("hasStatus");
    },
    pageTitle() {
      let pageT;

      if (this.status == "true") {
        pageT = "Email Verified successful";
      } else {
        pageT = "Email not Verified";
      }

      return pageT;
    },
    pageDescription1() {
      let pageD;

      if (this.status == "true") {
        pageD =
          "Thank you for confirming your email. please click on the link below to login to your Account";
      } else {
        pageD =
          "Your email cannot be verified. Please click on the link below to resend confirmation link!";
      }

      return pageD;
    },
  },

  methods: {
    checkPageEntryAuth: function () {
      setTimeout(() => {
        if (localStorage.getItem("hasStatus") == null) {
          this.$router.push({ path: "/" });
        }
      }, 1000);
    },
  },
  mounted() {
    setTimeout(() => {
      localStorage.removeItem("hasStatus");
    }, 6000);

    // this.checkPageEntryAuth();
  },

  created() {
    if (localStorage.getItem("hasStatus") == null) {
      this.$router.push({ path: "/" });
    }
  },
};
</script>
<style></style>
