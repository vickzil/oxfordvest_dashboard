<template>
  <transition name="fade">
    <div
      class="overlay_div"
      id="phishingModal"
      tabindex="-1"
      v-if="phishingModal"
    >
      <div class="overlay-close" @click="closePhishingModal"></div>
      <div
        class="modal-dialog modal-dialog-centered"
        style="border-radius: 0px"
      >
        <div class="modal-content">
          <div class="modal-header bg-light text-dark">
            <h3 class="" style="text-transform: capitalize; font-size: 16px">
              Add phishing
              <span>
                <img src="@/assets/images/oxfordvest.png" alt="" />
              </span>
              <i
                id="page_fot_close"
                class="fa fa-times"
                title="close"
                @click="closePhishingModal"
              ></i>
            </h3>
          </div>
          <div
            class="modal-body animated px-4"
            id="phishingModalBody"
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
                  <label><b>Message</b></label>
                  <input type="text" class="form-control" v-model="message" />
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
                </div>
              </div>
            </div>

            <br /><br />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import "@/mixins";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["phishingModal"]),
  },

  data() {
    return {
      message: "",
    };
  },

  methods: {
    ...mapActions([
      "fetchUserData",
      "setPhishingModal",
      "setModalLoading",
      "setActionLoading",
      "setAlertModalStatus",
    ]),

    closePhishingModal: function () {
      this.message = "";
      this.setPhishingModal(false);
    },

    // verifyPacystackCardPayment: function (response) {
    //   this.setActionLoading(true);
    //   var data = {
    //     AppId: this.AppId,
    //     RequestId: this.RequestId,
    //     TransactionReference: this.reference,
    //   };
    //   const url = `${this.walletURL}/v1.0/VerifyCardPayment/confirmCardPaymentStatus`;

    //   axios
    //     .post(url, data)
    //     .then((response) => {
    //       console.log(response);

    //       let payload;

    //       if (response.data.success) {
    //         payload = {
    //           type: "success",
    //           message: "Card Confirm successfully",
    //         };
    //       } else {
    //         payload = {
    //           type: "error",
    //           message: "Error Card confirmation",
    //         };
    //       }

    //       this.setAlertModalStatus(payload);
    //       this.setActionLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);

    //       this.serverErrorMessage();
    //     });
    // },
  },
};
</script>
<style scoped>
/* #phishingModal .modal-dialog {
  max-width: 55%;
  width: 55%;
} */

#phishingModal img {
  width: 30px;
  margin-left: 40px;
}

#phishingModal .badge {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

#phishingModal .modal-header {
  justify-content: center !important;
  position: relative;
  cursor: default !important;
}

#phishingModal .modal-body {
  width: 100% !important;
  position: relative !important;
  cursor: default;
}

/* .modal-open .modal#phishingModal {
  overflow: hidden;
  padding-right: 0px !important;
} */

/* .modal-body#phishingModalBody {
  height: calc(100vh - 236px);
  overflow-y: scroll;
} */

.modal-body#phishingModalBody::-webkit-scrollbar {
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
  #phishingModal .modal-dialog {
    max-width: 90%;
    width: 90%;
  }
}
@media screen and (max-width: 600px) {
  #phishingModal .modal-dialog {
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
  #phishingModal .modal-dialog {
    top: unset !important;
    bottom: 0px !important;
    margin: 0px !important;
    max-width: 100%;
    width: 100%;
  }
  #phishingModal .modal-dialog-centered {
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
