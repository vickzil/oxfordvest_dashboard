<template>
  <div class="card">
    <div class="header">
      <h2>Manual Investment</h2>
    </div>
    <div class="body">
      <div class="row clearfix">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group c_form_group">
            <label>Amount to Invest<span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              v-model="amount"
              v-on:keyup="addComma"
              @input="checkInput(amount)"
            />
            <transition name="fade">
              <p
                v-if="inputError"
                style="
                  color: red !important;
                  font-size: 13px !important;
                  margin-top: 15px;
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 20 20"
                  svg-inline=""
                  role="presentation"
                  focusable="false"
                  tabindex="-1"
                  style="color: red !important"
                  fill="red"
                >
                  <path
                    d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"
                  ></path>
                </svg>
                {{ inputMessage }}
              </p>
            </transition>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group c_form_group">
            <label>Select Investment <span class="text-danger">*</span> </label>
            <v-select
              :options="options"
              :reduce="(name) => name.code"
              label="name"
              class="select_input"
              @input="getInvestmentDetails($event)"
              v-model="investment"
            ></v-select>
          </div>
        </div>

        <div
          class="col-lg-12 col-md-12 col-sm-12"
          v-if="
            currentInvestment && currentInvestment.frequencyDurations.length
          "
        >
          <div class="form-group c_form_group">
            <label>Frequency<span class="text-danger">*</span></label>
            <select
              class="form-control show-tick"
              @change="checkInput(amount)"
              v-model.trim="frequency"
            >
              <option value="">Select frequency</option>
              <option
                :value="frequency.code"
                v-for="(
                  frequency, index
                ) in currentInvestment.frequencyDurations"
                :key="frequency.code"
                :selected="index === 0"
              >
                {{ frequency.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row clearfix">
        <div class="col-md-6 col-sm-12 mt-2">
          <div class="form-group checkbox_group">
            <span>I want to also invest in Oilvest</span>
            <label class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                :checked="ReturnsToOilInvest"
                @change="changeInput"
              />
              <span class="custom-control-label">&nbsp;</span>
            </label>
            <label
              title=""
              style="cursor: pointer"
              @click="showInvestmentByOilvestInfo"
            >
              <i class="fa fa-question-circle"></i
            ></label>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 mt-2">
          <div class="form-group checkbox_group">
            <span>Upfront pay upon investment</span>
            <label class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                :checked="UpfrontPaidUponInvestment"
                @change="changeUprontInput"
              />
              <span class="custom-control-label">&nbsp;</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/mixins";
// import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    vSelect,
  },
  computed: {
    ...mapGetters(["countries", "registrationInfo", "manualUserReg"]),
    amount: {
      get() {
        return this.manualUserReg.userAmountInvested;
      },
      set(value) {
        return (this.manualUserReg.userAmountInvested = value);
      },
    },
    ReturnsToOilInvest: {
      get() {
        return this.manualUserReg.userReturnsToOilInvest;
      },
      set(value) {
        return (this.manualUserReg.userReturnsToOilInvest = value);
      },
    },
    UpfrontPaidUponInvestment: {
      get() {
        return this.manualUserReg.userUpfrontPaidUponInvestment;
      },
      set(value) {
        return (this.manualUserReg.userUpfrontPaidUponInvestment = value);
      },
    },
    frequency: {
      get() {
        return this.manualUserReg.userFrequency;
      },
      set(value) {
        return (this.manualUserReg.userFrequency = value);
      },
    },
    currentInvestment: {
      get() {
        return this.manualUserReg.userCurrentInvestment;
      },
      set(value) {
        return (this.manualUserReg.userCurrentInvestment = value);
      },
    },
    emptyFields: {
      get() {
        return this.manualUserReg.emptyFields;
      },
      set(value) {
        return (this.manualUserReg.emptyFields = value);
      },
    },
    formError: {
      get() {
        return this.manualUserReg.formError;
      },
      set(value) {
        return (this.manualUserReg.formError = value);
      },
    },
    options() {
      return this.user.availableInvestments;
    },
  },

  data() {
    return {
      investment: null,
      processing: false,
      buttonText: "Invest Now",
      inputMessage: "",
      inputError: false,
      showError: false,
      calculated: false,
      calculatedItem: null,
    };
  },

  methods: {
    ...mapActions([
      "fetchUserData",
      "setPerformInvestmentModal",
      "setModalLoading",
      "setActionLoading",
      "showPaymentOptions",
      "setAlertModalStatus",
    ]),

    getInvestmentDetails: function (value) {
      //   this.checkform();

      if (value !== "") {
        this.currentInvestment = this.user.availableInvestments.find(
          (investment) => {
            return investment.code === value;
          }
        );

        // console.log(this.currentInvestment);
      }
    },

    changeInput: function () {
      this.ReturnsToOilInvest = !this.ReturnsToOilInvest;
    },
    changeUprontInput: function () {
      this.UpfrontPaidUponInvestment = !this.UpfrontPaidUponInvestment;
    },
    showInvestmentByOilvestInfo: function () {
      let payload = {
        status: true,
        type: "success",
        message: "You can Include this Investment to Oilvest",
      };
      this.setAlertModalStatus(payload);
    },

    checkInput: function () {
      if (isNaN(this.amount)) {
        this.amount = parseInt(this.amount.replace(/[,]/g, ""));
      }

      if (this.amount < 1000) {
        this.inputMessage = `Amount must be up to 1000 and above`;
        this.inputError = true;
        this.emptyFields = true;
        return false;
      }

      if (
        this.currentInvestment &&
        this.currentInvestment.frequencyDurations.length > 0
      ) {
        if (!this.frequency) {
          this.emptyFields = true;
          return false;
        }
      }

      this.inputError = false;
      this.emptyFields = false;
      this.inputMessage = "";

      return true;
    },

    // submitForm: function () {
    //   if (isNaN(this.amount)) {
    //     this.amount = parseInt(this.amount.replace(/[,]/g, ""));
    //   }

    //   this.setModalLoading(true);

    //   const url = `${this.hrmURL}/v1.0/UserInvestment/insertUserInvestment`;

    //   let duration;

    //   if (this.frequency !== "") {
    //     duration = this.frequency;
    //   } else {
    //     duration = this.currentInvestment.duration;
    //   }

    //   if (isNaN(this.amount)) {
    //     this.amount = parseInt(this.amount.replace(/[,]/g, ""));
    //   }

    //   var data = {
    //     AppId: this.AppId,
    //     RequestId: this.RequestId,
    //     Email: this.user.userInfo.user.email,
    //     UserCode: this.user.userInfo.user.code,
    //     AvailableInvestmentCode: this.currentInvestment.code,
    //     AmountInvested: this.amount,
    //     Duration: duration,
    //     ReturnsToOilInvest: this.ReturnsToOilInvest,
    //     Frequency: this.currentInvestment.frequency,
    //   };

    //   console.log(data);

    //   axios
    //     .post(url, data)
    //     .then((res) => {
    //       let userCode = sessionStorage.getItem("activeformations");
    //       this.fetchUserData(userCode);

    //       if (res.data.success) {
    //         this.$router.push({ path: "/dashboard" });
    //         setTimeout(() => {
    //           this.$router.push({ path: "/investment" });
    //           let payload = {
    //             status: true,
    //             type: "success",
    //             message: "Your Investment has been added successfully",
    //           };
    //           this.setModalLoading(false);
    //           this.setAlertModalStatus(payload);
    //           this.closePerformInvestmentModal();
    //         }, 2400);
    //       } else {
    //         this.setModalLoading(false);
    //         let payload = {
    //           status: true,
    //           type: "error",
    //           message: res.data.message,
    //         };

    //         this.setAlertModalStatus(payload);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.setModalLoading(false);
    //       this.serverErrorMessage();
    //     });
    // },
  },

  mounted() {},
  watch: {
    amount: function (newValue) {
      let result = newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$nextTick(() => (this.amount = result));
    },
  },
};
</script>

<style scoped>
.checkbox_group .custom-control {
  position: relative;
  z-index: 1;
  display: inline-block;
  min-height: 1.5rem;
  padding-left: 1.5rem;
}

.checkbox_group label {
  display: inline-block;
  margin-bottom: -0.4rem;
  margin-left: 10px;
}
</style>
