<template>
  <transition name="fade">
    <div class="overlay_div" id="bvnModal" tabindex="-1" v-if="bvnModal">
      <div class="overlay-close" @click="closeBvnModal"></div>
      <div
        class="modal-dialog modal-dialog-centered"
        style="border-radius: 0px"
      >
        <div class="modal-content">
          <div class="modal-header bg-light text-dark">
            <h3 class="" style="text-transform: capitalize; font-size: 16px">
              Add Bvn
              <span>
                <img src="@/assets/images/oxfordvest.png" alt="" />
              </span>
              <i
                id="page_fot_close"
                class="fa fa-times"
                title="close"
                @click="closeBvnModal"
              ></i>
            </h3>
          </div>
          <div
            class="modal-body animated px-4"
            id="bvnModalBody"
            style="position: relative"
          >
            <div class="text-center mt-4">
              <p class="font-15 font-weight-bold">
                Your BVN helps us protect you from fraudulent transactions
              </p>
            </div>

            <br />

            <div class="row">
              <div class="col-md-7 mx-auto">
                <div class="form-group">
                  <label><b>Bvn</b></label>
                  <input type="number" class="form-control" v-model="bvn" />
                  <p
                    style="
                      color: green !important;
                      font-size: 13px !important;
                      margin-top: 5px;
                      line-height: 1.5;
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
                      fill="green"
                    >
                      <path
                        d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"
                      ></path>
                    </svg>
                    Your BVN does not give us access to your bank account,
                    transactions or any other information
                  </p>
                </div>
              </div>
            </div>

            <br /><br />

            <div class="text-md-right payStackDiv text-sm-center pt-3 mt-3">
              <button
                class="btn btn-danger btn-sm payment_buttion"
                :disabled="bvn == ''"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import "@/mixins";
// import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["bvnModal"]),
  },

  data() {
    return {
      searchText: "",
      showPaystack: false,
      amount: 100,
      currency: "NGN",
      bvn: "",
    };
  },

  methods: {
    ...mapActions([
      "fetchUserData",
      "setBvnModal",
      "setModalLoading",
      "setActionLoading",
      "setAlertModalStatus",
    ]),

    closeBvnModal: function () {
      this.setBvnModal(false);
    },
  },
};
</script>
<style scoped>
#bvnModal .modal-dialog {
  max-width: 47%;
  width: 47%;
}

#bvnModal img {
  width: 30px;
  margin-left: 40px;
}

#bvnModal .badge {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

#bvnModal .modal-header {
  justify-content: center !important;
  position: relative;
  cursor: default !important;
}

#bvnModal .modal-body {
  width: 100% !important;
  position: relative !important;
  cursor: default;
}

/* .modal-open .modal#bvnModal {
  overflow: hidden;
  padding-right: 0px !important;
} */

/* .modal-body#bvnModalBody {
  height: calc(100vh - 236px);
  overflow-y: scroll;
} */

.modal-body#bvnModalBody::-webkit-scrollbar {
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
  #bvnModal .modal-dialog {
    max-width: 90%;
    width: 90%;
  }
}
@media screen and (max-width: 600px) {
  #bvnModal .modal-dialog {
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
  #bvnModal .modal-dialog {
    top: unset !important;
    bottom: 0px !important;
    margin: 0px !important;
    max-width: 100%;
    width: 100%;
  }
  #bvnModal .modal-dialog-centered {
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
