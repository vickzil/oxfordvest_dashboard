<template>
  <div class="card">
    <div class="body">
      <h6><b>Account Protection</b></h6>
      <div class="row clearfix" v-if="showTwoFactorForm">
        <div class="col-lg-5 col-md-5 col-sm-12">
          <br /><br />
          <div class="form-group">
            <div class="row">
              <div class="col-md-8 mt-md-3 mb-3">
                <h5>Bank Verification Number (BVN)</h5>
              </div>
              <div class="col-md-4 text-md-right mt-2">
                <div>
                  <p
                    class="text-secondary"
                    v-if="user.userInfo.user.bvn !== 'null'"
                  >
                    <!-- {{ user.userInfo.user.bvn }} -->
                    {{ getHiddenBvn }}
                  </p>
                  <button
                    v-else
                    class="btn btn-danger oxfordvest_button"
                    @click="showBvnModal"
                  >
                    Add Bvn
                  </button>
                </div>
              </div>
            </div>
            <br /><br />
            <div class="row">
              <div class="col-md-7">
                <h5>Two-Factor Authentication</h5>
                <p class="mb-3">
                  Protect your Oxfordvest account from unauthorized transactions
                  using a software token.
                </p>
              </div>
              <div class="col-md-5 text-md-right mt-md-4 mt-sm-4">
                <label class="switch dark_mode" @click="showAuthForms($event)">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TwoFactorAuthForm v-else />
    </div>
  </div>
</template>

<script>
import "@/mixins";
import TwoFactorAuthForm from "../../forms/TwoFactorAuthForm";
import { mapActions } from "vuex";
export default {
  components: {
    TwoFactorAuthForm,
  },
  computed: {
    getHiddenBvn() {
      let initialBVn = this.user.userInfo.user.bvn;
      let firstThreeWord = initialBVn.slice(0, 3);
      let LastThreeWord = initialBVn.slice(initialBVn.length - 3);

      return firstThreeWord + "******" + LastThreeWord;
    },
  },
  data() {
    return {
      showTwoFactorForm: true,
    };
  },

  methods: {
    ...mapActions(["setBvnModal"]),
    showAuthForms: function (event) {
      event.preventDefault();
      console.log(event.target);

      let payload = {
        status: true,
        type: "success",
        message:
          "2FA adds an extra layer of security to your account by generating a secure code on your device for approving transactions.",
      };
      this.setAlertModalStatus(payload);

      setTimeout(() => {
        this.showTwoFactorForm = false;
      }, 1200);
    },
    showBvnModal: function () {
      this.setBvnModal(true);
    },
  },

  mounted() {
    this.showTwoFactorForm = true;
  },
};
</script>

<style scoped>
.field-icon {
  margin-top: -29px;
}

h5 {
  font-weight: bold;
  color: rgb(136, 0, 0);
  font-size: 18px;
}
p {
  line-height: 1.7;
  margin-top: 10px;
}
</style>
