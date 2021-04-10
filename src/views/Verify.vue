<template>
  <PageLoadingOverlay />
</template>
<script>
import axios from "axios";
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";
import "@/mixins";

export default {
  name: "Verify",
  props: ["id"],
  components: {
    PageLoadingOverlay,
  },
  computed: {
    status: {
      get() {
        return this.$store.state.status;
      },
      set(value) {
        return (this.$store.state.status = value);
      },
    },
  },

  data() {
    return {
      verifyText: "Verifying...",
    };
  },

  methods: {},
  created() {
    if (!this.$route.query.userid && !this.$route.query.token) {
      if (this.$router.push({ path: "/" })) {
        window.location.reload();
      }
    } else {
      const url = `${this.hrmURL}/v1.0/OAuth/confirmEmail`;

      var data = {
        UserId: this.$route.query.userid,
        Token: this.$route.query.token,
      };

      axios
        .post(url, data)
        .then((response) => {
          this.response = response;
          // console.log(response);
          if (response.data.success) {
            this.status = true;
          } else {
            this.status = false;
          }

          localStorage.setItem("hasStatus", this.status);

          if (this.$router.push({ path: "/verify-status" })) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          this.serverErrorMessage();

          setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 900);
        });
    }
  },

  //   http://localhost:8080/verify/account?userid=72&token=CfDJ8LYeGkCdyUFJqS%2FDIaw3AWAuZmELJtIMYt6l4sSHmaz4ImXQRZcwIjFyaT6S0xVzBQm0zHCMbuTIPmLnp%20t7n0I8xCZHvv%20HkdvRZbxHvD4E95BxV1Vuei0vxxoKVu5Qn1ilnDSGJV6tMi7clCYcVpV%2FqngJzBMgrtOcEMYKDo8eFq5Cb0cGDWPW%2F2pKo7Oxpw%3D%3D
};
</script>
<style scoped>
.page_loading_modal {
  z-index: 9000000000000000000000000000000000000000000000000000000000000000000000 !important;
}
</style>
