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
          <div
            class="modal-header bg-light text-dark"
            style="border-bottom: none"
          >
            <h3 class="" style="text-transform: capitalize; font-size: 16px">
              Anti-phishing
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
              <!-- <p class="font-15 font-weight-bold">
                To add and verify your card ₦ 100 will be charged and saved into
                your plan
              </p> -->
            </div>

            <br />

            <div class="row">
              <div class="col-md-7 mx-auto">
                <div class="form-group">
                  <label><b>Phrase</b></label>
                  <input type="text" class="form-control" v-model="Phrase" />
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
                    Please add a phrase that will be sent along side your email.
                    This is to prevent you from acting on unauthorized E-mail.
                  </p>
                  <br /><br />

                  <div class="text-right pt-3 mt-3">
                    <button
                      type="submit"
                      @click="submitPhishingPhrase"
                      class="btn btn-danger btn-lg payment_buttion"
                      v-bind:disabled="Phrase == ''"
                    >
                      Update Phrase
                    </button>
                  </div>
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
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["phishingModal", "antiPhishingPhrase"]),

    Phrase: {
      get() {
        return this.antiPhishingPhrase;
      },
      set(value) {
        return (this.antiPhishingPhrase = value);
      },
    },
  },

  data() {
    return {};
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
      this.Phrase = "";
      this.setPhishingModal(false);
    },

    submitPhishingPhrase: function () {
      this.setActionLoading(true);
      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.user.userInfo.user.code,
        Phrase: this.Phrase,
      };
      const url = `${this.hrmURL}/v1.0/OAuth/updateAntiPhishingPhrase`;

      axios
        .post(url, data)
        .then((response) => {
          // console.log(response);

          let payload;

          if (response.data.success) {
            payload = {
              status: true,
              type: "success",
              message: "Anti-Phishing Phrase Updated",
            };
          } else {
            payload = {
              status: true,
              type: "error",
              message: response.data.message,
            };
          }

          let userCode = this.user.userInfo.user.code;
          this.fetchUserData(userCode);

          this.setAlertModalStatus(payload);
          this.setActionLoading(false);
          this.setPhishingModal(false);
        })
        .catch((err) => {
          console.log(err);

          this.serverErrorMessage();
        });
    },
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

p {
  line-height: 1.6;
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
