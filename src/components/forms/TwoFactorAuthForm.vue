<template>
  <form v-on:submit.prevent="twoFactorForm">
    <div class="card">
      <div class="header">
        <br /><br />
        <h2 class="h3"><b>Pick security questions</b></h2>
        <p>
          Make sure you confirm answers to your security questions. You would
          need them when resetting 2FA on your account.
        </p>
      </div>
      <div class="body">
        <form class="form">
          <div class="row">
            <div class="col-md-5">
              <label class="mb-3"><b>Question 1</b></label>

              <select class="form-control" v-model="q1">
                <option selected="selected" disabled="disabled" value="">
                  Choose question
                </option>
                <option value="1">Your mother's maiden name</option>
                <option value="2">Favourite teacher's name?</option>
                <option value="3">Last 4 digits of your NIN</option>
                <option value="4">First car your family owned</option>
                <option value="5">
                  First foreign country you travelled to
                </option>
                <option value="6">Favorite sport as a child</option>
                <option value="7">What city was your mother born</option>
                <option value="8">Favorite cartoon growing up</option>
                <option value="9">Your father's middle name</option>
                <option value="10">
                  Firstname of your childhood best friend
                </option>
              </select>
              <br />
              <div class="form-group c_form_group">
                <input
                  type="text"
                  class="form-control"
                  v-model="a1"
                  placeholder="Answer"
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div class="row">
            <div class="col-md-5">
              <label class="mb-3"><b>Question 2</b></label>

              <select class="form-control" v-model="q2">
                <option selected="selected" disabled="disabled" value="">
                  Choose question
                </option>
                <option value="1">Your mother's maiden name</option>
                <option value="2">Favourite teacher's name?</option>
                <option value="3">Last 4 digits of your NIN</option>
                <option value="4">First car your family owned</option>
                <option value="5">
                  First foreign country you travelled to
                </option>
                <option value="6">Favorite sport as a child</option>
                <option value="7">What city was your mother born</option>
                <option value="8">Favorite cartoon growing up</option>
                <option value="9">Your father's middle name</option>
                <option value="10">
                  Firstname of your childhood best friend
                </option>
              </select>
              <br />
              <div class="form-group c_form_group">
                <input
                  type="text"
                  class="form-control"
                  v-model="a2"
                  placeholder="Answer"
                />
              </div>

              <div class="text-right mt-4">
                <button
                  :disabled="emptyFields"
                  class="btn btn-danger oxfordvest_button"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <br /><br />
        </form>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

import { mapActions } from "vuex";

export default {
  data() {
    return {
      q1: "",
      a1: "",
      q2: "",
      a2: "",
      emptyFields: true,
    };
  },

  methods: {
    ...mapActions([
      "setActionLoading",
      "login",
      "setAlertModalStatus",
      "fetchBankNames",
      "saveUserData",
    ]),
    twoFactorForm: function () {
      if (this.emptyFields == false) {
        this.submitForm();
        return true;
      } else {
        this.CheckTwoFactorForm();
      }
    },

    CheckTwoFactorForm: function () {
      if (!this.q1 || !this.q2 || !this.a1 || !this.a2) {
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      return true;
    },

    submitForm: function () {
      this.setActionLoading(true);

      const url = `${this.hrmURL}/v1.0/OAuth/resendTransactionPIN`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.user.userInfo.user.code,
      };

      axios
        .post(url, data)
        .then((response) => {
          this.setActionLoading(false);

          let payload;

          if (response.data.success == true) {
            payload = {
              status: true,
              type: "success",
              message: "Two factor Authentication Added ",
            };
          } else {
            payload = {
              status: true,
              type: "error",
              message: response.data.message,
            };
          }

          // console.log(response);

          this.setAlertModalStatus(payload);
        })
        .catch((error) => {
          error;
          this.serverErrorMessage();
        });
    },
  },
};
</script>

<style scoped>
h2 {
  font-weight: bold;
  color: rgb(136, 0, 0) !important;
}
</style>
