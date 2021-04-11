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
              Thank you for <em> creating your Oxfordvest </em> account!!
            </h2>
            <span style="text-align: center; margin-bottom: 20px"
              >Your account have not been Verified. Please verify your account
              by clicking on the link we just sent to your email.</span
            >

            <div class="text-center mt-md-3">
              <p
                class="mb-2 font-weight-bold"
                style="color: rgb(51, 18, 18); text-align: center"
              >
                Didn't receive any email?.
              </p>
              <router-link
                to="/confirm"
                class="font-weight-bold btn-sm filled-button"
              >
                Resend email
              </router-link>

              <p class="signupp">
                <router-link to="/login" class="font-weight-bold">
                  Send me Back
                </router-link>
                to the Login.
              </p>
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
          class="font-weight-bold text-center w-75"
          style="color: rgb(44, 37, 37); font-weight: 900"
        >
          Thank you for creating your Oxfordvest account!!
        </h4>
        <p style="color: rgb(51, 18, 18); text-align: center">
          Your account have not been Verified. Please verify your account by
          clicking on the link we just sent to your email.
        </p>
      </div>

      <div class="signupp text-center">
        <p class="mb-2" style="color: rgb(51, 18, 18); text-align: center">
          Didn't receive any email?.
        </p>

        <router-link to="/confirm" class="font-weight-bold">
          Resend email confirmation link
        </router-link>
      </div>
    </div>
  </div> -->
</template>
<script>
import AccountLeft from "../components/extras/AccountLeft";
import AccountCircles from "../components/extras/AccountCircles";
import Logo from "../components/extras/Logo";
export default {
  name: "ThankYou",
  components: {
    AccountLeft,
    AccountCircles,
    Logo,
    // AccountSocialIcons
  },
  methods: {
    checkPageEntryAuth: function () {
      setTimeout(() => {
        if (sessionStorage.getItem("hasStatus") == null) {
          this.$router.push({ path: "/" });
        }
      }, 1000);
    },
  },
  mounted() {
    setTimeout(() => {
      sessionStorage.removeItem("hasStatus");
    }, 6000);

    if (sessionStorage.getItem("hasStatus") == null) {
      this.$router.push({ path: "/" });
    }
  },
};
</script>
<style></style>
