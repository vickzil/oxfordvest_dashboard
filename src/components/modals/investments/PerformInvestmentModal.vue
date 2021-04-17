<template>
  <transition name="fade">
    <div
      class="overlay_div"
      id="performInvestmentModal"
      tabindex="-1"
      v-if="performInvestmentModal"
    >
      <div class="overlay-close" @click="closePerformInvestmentModal"></div>
      <div
        class="modal-dialog modal-dialog-centered"
        style="border-radius: 0px"
      >
        <div class="modal-content">
          <ModalLoading />
          <div class="modal-header bg-light text-dark">
            <h3 class="" style="text-transform: capitalize; font-size: 16px">
              Invest Now
              <span>
                <img src="@/assets/images/oxfordvest.png" alt="" />
              </span>
              <i
                id="page_fot_close"
                class="fa fa-times"
                title="close"
                @click="closePerformInvestmentModal"
              ></i>
            </h3>
          </div>
          <div
            class="modal-body animated px-4"
            id="performInvestmentModalBody"
            style="position: relative"
          >
            <div class="mt-sm-5 px-4 fund_wallet_balance">
              <div>
                <h4 class="font-16 font-weight-bold">
                  Current Balance:
                  <span class="ml-2">₦{{ addComma(userWalletBalance) }}</span>
                </h4>
              </div>
              <div>
                <button
                  class="ml-md-5 mt-sm-2 btn btn-danger btn-sm payment_buttion"
                  @click="showPaymentOptionsModal"
                >
                  Fund Wallet
                </button>
              </div>
            </div>
            <div>
              <form
                v-on:submit.prevent="submitForm"
                v-if="!calculated"
                id="form_fd"
              >
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group c_form_group disabled">
                      <label>Investment Name</label>
                      <input
                        type="text"
                        class="form-control"
                        disabled
                        :value="currentInvestment.name"
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group c_form_group">
                      <label>Amount to Invest</label>
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
                  <div
                    class="col-md-12"
                    v-if="currentInvestment.frequencyDurations.length"
                  >
                    <div class="form-group c_form_group">
                      <label>Frequency</label>
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
                  <div class="col-md-12 col-sm-12 mt-2">
                    <div class="form-group checkbox_group">
                      <span>Returns to Oilvest</span>
                      <label class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          :checked="ReturnsToOilInvest"
                          @change="changeInput"
                        />
                        <span class="custom-control-label">&nbsp;</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="text-right pt-3 mt-3">
                  <button
                    type="submit"
                    class="btn btn-danger btn-lg payment_buttion"
                    v-bind:disabled="emptyFields"
                  >
                    {{ buttonText }}
                  </button>
                </div>
                <br /><br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import "@/mixins";
import axios from "axios";
import ModalLoading from "../../loaders/ModalLoading";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ModalLoading,
  },
  computed: {
    ...mapGetters(["currentInvestment", "performInvestmentModal"]),
    userWalletBalance() {
      return this.user.userWalletBalance.availableBalance;
    },
  },

  data() {
    return {
      amount: 100,
      frequency: "",
      emptyFields: true,
      ReturnsToOilInvest: false,
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

    changeInput: function () {
      this.ReturnsToOilInvest = !this.ReturnsToOilInvest;
    },
    closePerformInvestmentModal: function () {
      this.calculated = false;
      this.amount = 100;
      this.inputError = false;
      this.emptyFields = true;
      this.inputMessage = "";
      this.calculatedItem = null;
      this.frequency = "";
      this.setPerformInvestmentModal(false);
    },
    checkInput: function (input) {
      // var regex = /^[0-9]+$/;
      // if (!input.match(regex)) {
      //   this.inputError = true;
      //   this.emptyFields = true;
      //   this.inputMessage = "please input must be numbers.";
      //   return false;
      // }
      if (isNaN(this.amount)) {
        this.amount = parseInt(this.amount.replace(/[,]/g, ""));
      }

      if (input < this.currentInvestment.minimumAmount) {
        this.inputMessage = `Amount must be up to ${this.currentInvestment.minimumAmount} and above`;
        this.inputError = true;
        this.emptyFields = true;
        return false;
      }

      if (this.currentInvestment.frequencyDurations.length > 0) {
        if (!this.frequency) {
          this.emptyFields = true;
          return false;
        }
      }

      // this.amount = this.addComma(this.amount)

      this.inputError = false;
      this.emptyFields = false;
      this.inputMessage = "";

      return true;
    },
    showPaymentOptionsModal: function () {
      this.closePerformInvestmentModal();
      this.setActionLoading(true);

      setTimeout(() => {
        this.setActionLoading(false);
      }, 400);
      setTimeout(() => {
        this.showPaymentOptions();
      }, 500);
    },

    submitForm: function () {
      if (isNaN(this.amount)) {
        this.amount = parseInt(this.amount.replace(/[,]/g, ""));
      }
      if (this.userWalletBalance < this.amount) {
        let payload = {
          status: true,
          type: "error",
          message:
            "Your Wallet Balance is not enough to make this Investment. Please fund your account.",
        };

        this.setAlertModalStatus(payload);

        setTimeout(() => {
          let payload = {
            status: false,
            type: "error",
            message: "",
          };
          this.setAlertModalStatus(payload);
          // this.showPaymentOptionsModal();
        }, 6500);
        return;
      }

      this.setModalLoading(true);

      const url = `${this.hrmURL}/v1.0/UserInvestment/insertUserInvestment`;

      let duration;

      if (this.frequency !== "") {
        duration = this.frequency;
      } else {
        duration = this.currentInvestment.duration;
      }

      // var amoutTostring = parseInt(this.amount, 10);
      // var amoutTostring

      if (isNaN(this.amount)) {
        this.amount = parseInt(this.amount.replace(/[,]/g, ""));
      }

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.user.email,
        UserCode: this.user.userInfo.user.code,
        AvailableInvestmentCode: this.currentInvestment.code,
        AmountInvested: this.amount,
        Duration: duration,
        UpfrontPaidUponInvestment: false,
        SourceChannel: "online",
        ReturnsToOilInvest: this.ReturnsToOilInvest,
        Frequency: this.currentInvestment.frequency,
        GroupSubsidiaryCode: this.user.userInfo.user.subsidiaryCode,
      };

      // console.log(data);

      axios
        .post(url, data)
        .then((res) => {
          let userCode = this.user.userInfo.user.code;
          this.fetchUserData(userCode);

          if (res.data.success) {
            this.$router.push({ path: "/dashboard" });
            setTimeout(() => {
              this.$router.push({ path: "/investment" });
              let payload = {
                status: true,
                type: "success",
                message: "Your Investment has been added successfully",
              };
              this.setModalLoading(false);
              this.setAlertModalStatus(payload);
              this.closePerformInvestmentModal();
            }, 2400);
          } else {
            this.setModalLoading(false);
            let payload = {
              status: true,
              type: "error",
              message: res.data.message,
            };

            this.setAlertModalStatus(payload);
          }
        })
        .catch((err) => {
          console.log(err);
          this.setModalLoading(false);
          this.serverErrorMessage();
        });
    },
  },
  watch: {
    amount: function (newValue) {
      let result = newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // this.amount = result;
      //  console.log(this.amount)
      this.$nextTick(() => (this.amount = result));
    },
  },
};
</script>
<style scoped>
#performInvestmentModal .modal-dialog {
  max-width: 66%;
  width: 66%;
}

.fund_wallet_balance {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

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

#performInvestmentModal img {
  width: 30px;
  margin-left: 40px;
}

#performInvestmentModal .badge {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

#performInvestmentModal .modal-header {
  justify-content: center !important;
  position: relative;
  cursor: default !important;
}

#performInvestmentModal .modal-body {
  width: 100% !important;
  position: relative !important;
  padding: 0px !important;
  cursor: default;
}

.modal-open .modal#performInvestmentModal {
  overflow: hidden;
  padding-right: 0px !important;
}

.modal-body#performInvestmentModalBody {
  height: calc(100vh - 136px);
  overflow-y: scroll;
}

.modal-body#performInvestmentModalBody::-webkit-scrollbar {
  width: 3px;
}

#page_fot_close {
  position: absolute;
  right: 10px;
  top: 15px;
  font-size: 20px;
  color: rgb(180, 0, 0);
  cursor: pointer;
  margin-right: 18px;
  margin-top: 6px;
}

.payment_buttion {
  background: rgb(255, 0, 0) !important;
  border-radius: 4px;
  transition: 800ms ease;
  font-weight: bold;
  padding: 10px 20px;
  box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
  border: none;
}

.payment_buttion {
  /* border: 1px solid red !important; */
  color: rgb(238, 238, 238) !important;
}

.payment_buttion:hover {
  background: rgb(167, 3, 3) !important;
  color: white !important;
}

#form_fd {
  width: 80%;
  margin: 50px auto 20px;
}

/* #form_fd input {
  background-color: #fff;
  padding: 8px;
  border: none;
  border-radius: 2px;
  font-size: 16px;
  outline: none;
  display: inline;
  text-rendering: geometricPrecision;
  color: #3d1403;
  transition: border-color 0.3s ease;
} */

.table-responsive::-webkit-scrollbar {
  -webkit-appearance: none;
}

.table-responsive::-webkit-scrollbar:vertical {
  width: 12px;
}

.table-responsive::-webkit-scrollbar:horizontal {
  height: 12px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: 2px solid #ffffff;
}

.table-responsive::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #ffffff;
}

@media screen and (max-width: 830px) {
  #performInvestmentModal .modal-dialog {
    max-width: 90%;
    width: 90%;
  }
}
@media screen and (max-width: 600px) {
  #performInvestmentModal .modal-dialog {
    max-width: 98%;
    width: 98%;
  }
  #form_fd {
    width: 95%;
    margin: auto;
  }

  .fund_wallet_balance {
    display: block;
    margin: 30px 0px 40px;
  }

  .fund_wallet_balance button {
    margin-top: 20px;
  }
}
@media screen and (max-width: 540px) {
  #performInvestmentModal .modal-dialog {
    top: unset !important;
    bottom: 0px !important;
    margin: 0px !important;
    max-width: 100%;
    width: 100%;
  }
  #performInvestmentModal .modal-dialog-centered {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: unset !important;
    align-items: unset !important;
    /* min-height: calc(100% - 1rem); */
  }
  .modal-header h3 {
    font-size: 14px !important;
  }
}
@media screen and (max-width: 430px) {
  .grid-box {
    gap: 20px;
    grid-template-columns: 1fr;
    width: 95%;
  }

  .modal-body h6.text-center.font-18 {
    font-size: 13px !important;
  }
}
</style>
