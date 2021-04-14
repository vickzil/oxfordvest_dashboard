<template>
  <form v-on:submit.prevent="register" enctype="multipart/form-data">
    <div class="row clearfix" v-if="user">
      <div class="col-lg-12 col-md-12">
        <ManualRegForm />
      </div>
      <div class="col-lg-12 col-md-12">
        <ManualInvestmentForm />
      </div>
      <div class="col-lg-12 col-md-12">
        <div class="card">
          <div class="body">
            <div class="text-md-right text-sm-center">
              <button
                type="submit"
                class="btn btn-danger oxfordvest_button"
                :disabled="emptyFields == true"
              >
                Invest & Register User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import "@/mixins";
import axios from "axios";
import ManualRegForm from "./ManualRegForm";
import ManualInvestmentForm from "./ManualInvestmentForm";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    ManualRegForm,
    ManualInvestmentForm,
  },

  computed: {
    ...mapGetters(["manualUserReg"]),
    emptyFields() {
      return this.manualUserReg.emptyFields;
    },
    formError() {
      return this.manualUserReg.formError;
    },
  },

  methods: {
    ...mapActions(["setActionLoading", "fetchUserData", "setAlertModalStatus"]),
    register: function () {
      if (this.emptyFields == false) {
        this.submitForm();
      }
    },
    submitForm: function () {
      this.$store.state.manualUserReg.formError = false;
      this.$store.state.manualUserReg.emptyFields = false;
      this.setActionLoading(true);
      const url = `${this.hrmURL}/v1.0/InitiateManualInvestment/initiateManualUserInvestment`;

      if (isNaN(this.manualUserReg.userAmountInvested)) {
        this.manualUserReg.userAmountInvested = parseInt(
          this.manualUserReg.userAmountInvested.replace(/[,]/g, "")
        );
      }

      let duration;

      if (this.manualUserReg.userFrequency !== "") {
        duration = this.manualUserReg.userFrequency;
      } else {
        duration = this.manualUserReg.userCurrentInvestment.duration;
      }

      //   console.log(this.manualUserReg);

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        InsertUserInvestment: {
          AppId: this.AppId,
          RequestId: this.RequestId,
          Email: this.manualUserReg.userEmail,
          UserCode: "",
          AvailableInvestmentCode: this.manualUserReg.userCurrentInvestment
            .code,
          AmountInvested: this.manualUserReg.userAmountInvested,
          Duration: duration,
          ReturnsToOilVest: this.manualUserReg.userReturnsToOilInvest,
          Frequency: this.manualUserReg.userCurrentInvestment.frequency,
          NoOfIntervals: 0,
          UpfrontPaidUponInvestment: this.manualUserReg
            .userUpfrontPaidUponInvestment,
          SourceChannel: "offline",
          GroupSubsidiaryCode: this.manualUserReg.userSubsidaiary,
        },
        Registration: {
          AppId: this.AppId,
          RequestId: this.RequestId,
          PhoneNumber: this.manualUserReg.userPhone,
          Country: this.manualUserReg.userCountry,
          DateOfBirth: this.manualUserReg.userDob,
          Password: "",
          ConfirmPassword: "",
          Email: this.manualUserReg.userEmail,
          AccountType: "individual",
          PostCode: "string",
          RoleName: "individual",
          SubsidiaryCode: this.manualUserReg.userSubsidaiary,
          FirstName: this.manualUserReg.userFirstName,
          LastName: this.manualUserReg.userLastName,
          MiddleName: this.manualUserReg.userMiddleName,
          BVN: this.manualUserReg.userBvn,
          UserCode: "",
          ReferredBy: this.manualUserReg.userAcctMgtCode,
        },
      };

      // var data = {
      //   Registration: {
      //     AppId: this.AppId,
      //     RequestId: this.RequestId,
      //     PhoneNumber: this.manualUserReg.userPhone,
      //     Country: this.manualUserReg.userCountry,
      //     DateOfBirth: this.manualUserReg.userDob,
      //     Password: this.manualUserReg.userPassword,
      //     ConfirmPassword: this.manualUserReg.userPassword,
      //     Email: this.manualUserReg.userEmail,
      //     AccountType: "individual",
      //     PostCode: "",
      //     RoleName: "individual",
      //     SubsidiaryCode: this.manualUserReg.userSubsidaiary,
      //     FirstName: this.manualUserReg.userFirstName,
      //     LastName: this.manualUserReg.userLastName,
      //     MiddleName: this.manualUserReg.userMiddleName,
      //     BVN: this.manualUserReg.userBvn,
      //     ReferredBy: this.manualUserReg.userAcctMgtCode,
      //     UserCode: "",
      //   },
      // };

      // console.log(data);

      axios
        .post(url, data)
        .then((response) => {
          this.setActionLoading(false);

          let payload;

          if (response.data.success == true) {
            payload = {
              status: true,
              type: "success",
              message: "User Registered successfully!!",
            };

            this.clearData();
            // let userCode = sessionStorage.getItem("activeformations");
            // this.fetchUserData(userCode);
          } else {
            payload = {
              status: true,
              type: "error",
              message: response.data.message,
            };
          }

          // console.log(response);

          let userCode = this.user.userInfo.user.code;
          this.fetchUserData(userCode);

          this.setAlertModalStatus(payload);
        })
        .catch((err) => {
          // console.log(err);
          err;
          this.serverErrorMessage();
        });
    },

    clearData: function () {
      this.$store.state.manualUserReg.userFirstName = "";
      this.$store.state.manualUserReg.userLastName = "";
      this.$store.state.manualUserReg.userMiddleName = "";
      this.$store.state.manualUserReg.userEmail = "";
      this.$store.state.manualUserReg.userPhone = "";
      this.$store.state.manualUserReg.userAddress = "";
      this.$store.state.manualUserReg.userDob = "";
      this.$store.state.manualUserReg.userCountry = "";
      this.$store.state.manualUserReg.userGroups = "";
      this.$store.state.manualUserReg.userSubsidaiary = "";
      this.$store.state.manualUserReg.userBvn = "";
      this.$store.state.manualUserReg.userGender = "";
      this.$store.state.manualUserReg.userAcctMgtCode = "";
      this.$store.state.manualUserReg.userPassword = "";
      this.$store.state.manualUserReg.userAvailableInvestmentCode = "";
      this.$store.state.manualUserReg.userAmountInvested = 0;
      this.$store.state.manualUserReg.userDuration = null;
      this.$store.state.manualUserReg.userCurrentInvestment = null;
      this.$store.state.manualUserReg.userReturnsToOilInvest = false;
      this.$store.state.manualUserReg.hasVerifiedManager = false;
      this.$store.state.manualUserReg.formError = false;
      this.$store.state.manualUserReg.emptyFields = true;
      this.$store.state.manualUserReg.userFrequency = "";
      this.$store.state.manualUserReg.userStatus = "offline";
    },
  },

  //   CUSWRQ25643
};
</script>

<style></style>
