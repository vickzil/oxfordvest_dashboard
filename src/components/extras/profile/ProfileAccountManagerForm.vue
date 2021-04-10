<template>
  <div class="card">
    <div class="header">
      <h2><b>Account Manager</b></h2>
    </div>
    <br />
    <div class="body">
      <div class="row clearfix">
        <div class="col-md-12">
          <label v-if="showAccountMangerCode">Account manager code</label>
          <form :class="!showAccountMangerCode && 'float-right'">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                v-model="accmgtcode"
                placeholder="Enter account manager code"
                v-if="showAccountMangerCode"
              />
              <div class="input-group-append bg-danger">
                <span
                  class="input-group-text text-center oxfordvest_button"
                  id="search-mail" style="font-size: 14px!important;"
                  @click="changeAcctMgt"
                >
                  <span v-if="!showAccountMangerCode"
                    >Change acct mgt <i class="fa fa-user-plus ml-2"></i>
                  </span>
                  <span v-else
                    >{{ formText }}
                    <span
                      class="spinner-border spinner-border-sm ml-2"
                      role="status"
                      aria-hidden="true"
                      v-if="processing"
                    ></span>
                  </span>
                </span>
              </div>
            </div>
          </form>
          <br /><br />
        </div>
      </div>
      <div class="row clearfix mb-4 mt-3">
        <div class="col-md-12 col-sm-12">
          <div class="body text-center">
            <img
              v-if="photo"
              :src="photo"
              class="rounded-circle"
              style="width: 140px; height: 140px"
            />
          </div>
        </div>
      </div>
      <br /><br />
      <div class="row clearfix">
        <div class="col-md-6">
          <div class="form-group c_form_group disabled">
            <label>fullname</label>
            <input
              type="text"
              class="form-control"
              :value="firstName + ' ' + lastName"
              disabled
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group c_form_group disabled">
            <label>E-mail</label>
            <input type="text" class="form-control" :value="email" disabled />
          </div>
        </div>
      </div>
      <div class="row clearfix">
        <div class="col-md-6">
          <div class="form-group c_form_group disabled">
            <label>Group</label>
            <input
              type="text"
              class="form-control"
              :value="groupName"
              disabled
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group c_form_group disabled">
            <label>Subsidiary</label>
            <input
              type="text"
              class="form-control"
              :value="subsidiaryName"
              disabled
            />
          </div>
        </div>
      </div>
      <div class="row clearfix">
        <div class="col-md-6">
          <div class="form-group c_form_group disabled">
            <label>Phone</label>
            <input
              type="text"
              class="form-control"
              :value="phoneNumber"
              disabled
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group c_form_group disabled">
            <label>Country</label>
            <input type="text" class="form-control" :value="country" disabled />
          </div>
        </div>
      </div>

      <div class="row clearfix">
        <div class="col-md-12">
          <div class="form-group c_form_group disabled">
            <label>Address</label>
            <textarea
              rows="1"
              class="form-control"
              v-model="homeAddress"
              disabled
            >
            </textarea>
          </div>
        </div>
      </div>

      <div class="text-right">
        <button
          type="button"
          class="btn btn-danger oxfordvest_button"
          @click="updateAccountManager"
          :disabled="!codeChange"
        >
          Update acct Manager
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "@/mixins";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  computed: {
    accmgtcode: {
      get() {
        return this.user.userInfo.accountManager.code;
      },
      set(value) {
        return (this.user.userInfo.accountManager.code = value);
      },
    },
    firstName: {
      get() {
        return this.user.userInfo.accountManager.firstName;
      },
      set(value) {
        return (this.user.userInfo.accountManager.firstName = value);
      },
    },
    lastName: {
      get() {
        return this.user.userInfo.accountManager.lastName;
      },
      set(value) {
        return (this.user.userInfo.accountManager.lastName = value);
      },
    },
    email: {
      get() {
        return this.user.userInfo.accountManager.email;
      },
      set(value) {
        return (this.user.userInfo.accountManager.email = value);
      },
    },
    dateOfBirth: {
      get() {
        return this.removeTimeZone(
          this.user.userInfo.accountManager.dateOfBirth
        );
      },
      set(value) {
        return (this.user.userInfo.accountManager.dateOfBirth = value);
      },
    },
    phoneNumber: {
      get() {
        return this.user.userInfo.accountManager.phoneNumber;
      },
      set(value) {
        return (this.user.userInfo.accountManager.phoneNumber = value);
      },
    },
    homeAddress: {
      get() {
        return this.user.userInfo.accountManager.homeAddress;
      },
      set(value) {
        return (this.user.userInfo.accountManager.homeAddress = value);
      },
    },
    country: {
      get() {
        return this.user.userInfo.accountManager.countryName;
      },
      set(value) {
        return (this.user.userInfo.accountManager.countryName = value);
      },
    },
    countryCode: {
      get() {
        return this.user.userInfo.accountManager.country;
      },
      set(value) {
        return (this.user.userInfo.accountManager.country = value);
      },
    },
    groupName: {
      get() {
        return this.user.userInfo.accountManager.groupName;
      },
      set(value) {
        return (this.user.userInfo.accountManager.groupName = value);
      },
    },
    subsidiaryName: {
      get() {
        return this.user.userInfo.accountManager.subsidiaryName;
      },
      set(value) {
        return (this.user.userInfo.accountManager.subsidiaryName = value);
      },
    },
    subsidiaryCode: {
      get() {
        return this.user.userInfo.accountManager.subsidiaryCode;
      },
      set(value) {
        return (this.user.userInfo.accountManager.subsidiaryCode = value);
      },
    },
    gender: {
      get() {
        return this.user.userInfo.accountManager.gender;
      },
      set(value) {
        return (this.user.userInfo.accountManager.gender = value);
      },
    },
    photo: {
      get() {
        return this.user.userInfo.accountManager.photo;
      },
      set(value) {
        return (this.user.userInfo.accountManager.photo = value);
      },
    },
  },

  data() {
    return {
      showAccountMangerCode: false,
      processing: false,
      formText: "Verify code",
      codeChange: false,
    };
  },
  methods: {
    ...mapActions(["setActionLoading", "fetchUserData", "setAlertModalStatus"]),
    changeAcctMgt: function () {
      if (this.processing == true) {
        return;
      }
      if (this.showAccountMangerCode == false) {
        this.showAccountMangerCode = true;
      } else {
        if (this.accmgtcode !== "") {
          this.fetchAccountManagerDetails();
        } else {
          alert("Please provide account manager code");
        }
      }
    },
    changingCode: function () {
      console.log(this.accmgtcode);
      // this.codeChange = true;
    },
    fetchAccountManagerDetails: async function () {
      this.codeChange = false;
      this.setActionLoading(true);

      const url = `${this.hrmURL}/v1.0/User/getUserInfo`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.accmgtcode,
      };

      const response = await axios.post(url, data);
      try {
        this.setActionLoading(false);

        let payload;

        if (response.data.success == true) {
          let userData = response.data.data;

          this.firstName = userData.firstName;
          this.lastName = userData.lastName;
          this.email = userData.email;
          this.phoneNumber = userData.phoneNumber;
          this.country = userData.countryName;
          this.groupCode = userData.groupName;
          this.subsidiaryName = userData.subsidiaryName;
          this.subsidiaryCode = userData.subsidiaryCode;
          this.homeAddress = userData.homeAddress;
          this.photo = userData.photo;

          this.codeChange = true;

          payload = {
            status: true,
            type: "success",
            message: "Account Manager found",
          };

        } else {
          payload = {
            status: true,
            type: "error",
            message: response.data.message,
          };
        }


        this.setAlertModalStatus(payload);
      } catch (error) {
        this.serverErrorMessage();
      }
    },

    updateAccountManager: async function () {
      this.codeChange = false;
      this.setActionLoading(true);

      const url = `${this.hrmURL}/v1.0/User/updateUserAccountManager`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.user.userInfo.user.code,
        RefferredByCode: this.accmgtcode,
        SubsidiaryCode: this.subsidiaryCode,
      };

      const response = await axios.post(url, data);
      try {
        this.setActionLoading(false);

        let payload;

        if (response.data.success == true) {
          this.showAccountMangerCode = false;

          payload = {
            status: true,
            type: "success",
            message: "Account Manager Updated",
          };

          let userCode = this.user.userInfo.user.code;
          this.fetchUserData(userCode);
        } else {
          payload = {
            status: true,
            type: "error",
            message: response.data.message,
          };
        }

        console.log(response);

        this.setAlertModalStatus(payload);
      } catch (error) {
        error;
        this.serverErrorMessage();
      }
    },
  },

  //CUSWRQ25643
  //CUS82U25645
};
</script>

<style></style>
