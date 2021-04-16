<template>
  <transition name="fade">
    <div
      class="overlay_div"
      id="addCardModal"
      tabindex="-1"
      v-if="addCardModal"
    >
      <div class="overlay-close" @click="closeAddCardModal"></div>
      <div
        class="modal-dialog modal-dialog-centered"
        style="border-radius: 0px"
      >
        <div class="modal-content">
          <div class="modal-header bg-light text-dark">
            <h3 class="" style="text-transform: capitalize; font-size: 16px">
              Add Card
              <span>
                <img src="@/assets/images/oxfordvest.png" alt="" />
              </span>
              <i
                id="page_fot_close"
                class="fa fa-times"
                title="close"
                @click="closeAddCardModal"
              ></i>
            </h3>
          </div>
          <div
            class="modal-body animated px-4"
            id="addCardModalBody"
            style="position: relative"
          >
            <div class="text-center mt-4">
              <p class="font-15 font-weight-bold">
                To add and verify your card ₦ 100 will be charged and saved into
                your plan
              </p>
            </div>

            <br />

            <div class="row">
              <div class="col-md-7 mx-auto">
                <div class="form-group">
                  <label><b>Alias</b></label>
                  <input type="text" class="form-control" v-model="alias" />
                  <p
                    style="
                      color: gray !important;
                      font-size: 13px !important;
                      margin-top: 5px;
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
                      style="color: gray !important"
                      fill="gray"
                    >
                      <path
                        d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"
                      ></path>
                    </svg>
                    Please give your card a name
                  </p>
                  {{ reference }}
                </div>
              </div>
            </div>

            <br /><br />

            <div class="text-md-right payStackDiv text-sm-center pt-3 mt-3">
              <Paystack
                :paystackkey="paystackkey"
                :reference="RequestId"
                :callback="callback"
                :amount="amount * 100"
                :currency="currency"
                :firstname="user.userInfo.user.firstName"
                :lastname="user.userInfo.user.lastName"
                :email="user.userInfo.user.email"
                :close="close"
                :embed="false"
                class="btn btn-danger btn-sm payment_buttion"
                :disabled="alias == ''"
              >
                Proceed
                <i class="fe fe-credit-card ml-2"></i>
              </Paystack>
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
import { mapActions, mapGetters } from "vuex";
import Paystack from "vue-paystack";
export default {
  components: {
    Paystack,
  },
  computed: {
    ...mapGetters(["currentInvestment", "addCardModal", "userPaymentFeeInfo"]),
    paystackkey() {
      let paymentByCard = this.user.fundWalletOptions.byCard.items.find(
        (item) => item.provider === "paystack"
      );

      return paymentByCard.publicKey;
    },
    reference() {
      return this.userPaymentFeeInfo == null
        ? ""
        : this.userPaymentFeeInfo.reference;
    },
  },

  data() {
    return {
      searchText: "",
      showPaystack: false,
      amount: 100,
      currency: "NGN",
      alias: "",
    };
  },

  methods: {
    ...mapActions([
      "fetchUserData",
      "setAddModal",
      "setModalLoading",
      "setActionLoading",
      "setAlertModalStatus",
    ]),

    closeAddCardModal: function () {
      this.amount = 100;
      this.showPaystack = false;
      this.emptyFields = true;
      this.alias = "";
      this.setAddModal(false);
    },

    callback: function (response) {
      if (response.status) {
        this.verifyPacystackCardPayment(response);
      } else {
        let payload = {
          status: true,
          type: "error",
          message: "Card Verification not completed",
        };
        this.setAlertModalStatus(payload);
      }
      console.log(response);
    },
    verifyPacystackCardPayment: function (response) {
      this.setActionLoading(true);
      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.user.userInfo.user.code,
        ProviderCardReference: response.reference,
        Provider: "paystack",
        Amount: this.amount,
        Alias: this.alias,
      };
      const url = `${this.hrmURL}/v1.0/UserCard/insertUserCard`;

      axios
        .post(url, data)
        .then((response) => {
          console.log(response);

          let payload;

          if (response.data.success) {
            payload = {
              type: "success",
              message: "Card Confirm successfully",
            };
          } else {
            payload = {
              type: "error",
              message: "Error Card confirmation",
            };
          }

          this.setAlertModalStatus(payload);
          this.setActionLoading(false);
          this.showPaystack = false;
        })
        .catch((err) => {
          console.log(err);

          let payload = {
            type: "error",
            message: "Error Card confirmation",
          };
          this.showPaystack = false;

          this.setAlertModalStatus(payload);
          this.setActionLoading(false);
        });
    },

    close: function () {
      // this.setAddModal(false);
      console.log("");

      // let payload = {
      //   status: true,
      //   type: "error",
      //   message: "Payment not completed",
      // };
      // this.setAlertModalStatus(payload);
    },
  },
};
</script>
<style scoped>
/* #addCardModal .modal-dialog {
  max-width: 55%;
  width: 55%;
} */

#addCardModal img {
  width: 30px;
  margin-left: 40px;
}

#addCardModal .badge {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

#addCardModal .modal-header {
  justify-content: center !important;
  position: relative;
  cursor: default !important;
}

#addCardModal .modal-body {
  width: 100% !important;
  position: relative !important;
  cursor: default;
}

/* .modal-open .modal#addCardModal {
  overflow: hidden;
  padding-right: 0px !important;
} */

/* .modal-body#addCardModalBody {
  height: calc(100vh - 236px);
  overflow-y: scroll;
} */

.modal-body#addCardModalBody::-webkit-scrollbar {
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
  #addCardModal .modal-dialog {
    max-width: 90%;
    width: 90%;
  }
}
@media screen and (max-width: 600px) {
  #addCardModal .modal-dialog {
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
  #addCardModal .modal-dialog {
    top: unset !important;
    bottom: 0px !important;
    margin: 0px !important;
    max-width: 100%;
    width: 100%;
  }
  #addCardModal .modal-dialog-centered {
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

  .payStackDiv {
    text-align: center !important;
  }
  .payStackDiv .btn {
    padding: 7px 14px !important;
    width: 200px;
    height: 40px;
  }
}
</style>
