<template>
  <transition name="fade">
    <div
      class="overlay_div"
      id="fundWalletModal"
      tabindex="-1"
      v-if="selectPaymentOptionModal"
    >
      <div class="overlay-close" @click="closePaymentOptions"></div>
      <div
        class="modal-dialog modal-dialog-centered"
        style="border-radius: 0px"
      >
        <div class="modal-content">
          <ModalLoading v-if="modalLoading" />
          <div class="modal-header bg-light text-dark">
            <h3 class="" style="text-transform: capitalize; font-size: 16px">
              {{ paymentOptionTitle }}
              <span>
                <img src="@/assets/images/oxfordvest.png" alt="" />
              </span>
              <i
                id="page_fot_close"
                class="fa fa-times"
                title="close"
                @click="closePaymentOptions"
              ></i>
            </h3>
          </div>
          <div
            class="modal-body animated px-4"
            id="fundWalletModalBody"
            style="position: relative"
          >
            <PaymentOptions />
            <BankTransfer />
            <DebitCreditCard />
            <ForeignBankTransfer />
            <UploadEvidenceForm />
            <SavedCard />
            <PaymentForm />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import "@/mixins";
import PaymentOptions from "../../extras/payments/PaymentOptions";
import BankTransfer from "../../extras/payments/BankTransfer";
import DebitCreditCard from "../../extras/payments/DebitCreditCard";
import ForeignBankTransfer from "../../extras/payments/ForeignBankTransfer";
import UploadEvidenceForm from "../../extras/payments/UploadEvidenceForm";
import PaymentForm from "../../extras/payments/PaymentForm";
import SavedCard from "../../extras/payments/SavedCard";
import ModalLoading from "../../loaders/ModalLoading";

import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    PaymentOptions,
    BankTransfer,
    DebitCreditCard,
    ForeignBankTransfer,
    UploadEvidenceForm,
    SavedCard,
    ModalLoading,
    PaymentForm,
  },
  computed: {
    ...mapGetters([
      "selectPaymentOptionModal",
      "paymentOptionTitle",
      "modalLoading",
    ]),

    userPaymentOptions() {
      return this.user.fundWalletOptions;
    },
  },

  methods: {
    ...mapActions(["closePaymentOptions"]),
  },
};
</script>
<style scoped>
#fundWalletModal .modal-dialog {
  max-width: 68%;
  width: 68%;
}

#fundWalletModal img {
  width: 30px;
  margin-left: 40px;
}

#fundWalletModal .badge {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

#fundWalletModal .modal-header {
  justify-content: center !important;
  position: relative;
}

#fundWalletModal .modal-body {
  width: 100% !important;
  position: relative !important;
  padding: 0px !important;
  cursor: default;
}

.modal-open .modal#fundWalletModal {
  overflow: hidden;
  padding-right: 0px !important;
}

.modal-body#fundWalletModalBody {
  height: calc(100vh - 176px);
  overflow-y: scroll;
}

.modal-body#fundWalletModalBody::-webkit-scrollbar {
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

@media screen and (max-width: 1190px) {
  #fundWalletModal .modal-dialog {
    max-width: 88%;
    width: 88%;
  }
}

@media screen and (max-width: 830px) {
  #fundWalletModal .modal-dialog {
    max-width: 90%;
    width: 90%;
  }
}
@media screen and (max-width: 600px) {
  #fundWalletModal .modal-dialog {
    max-width: 98%;
    width: 98%;
  }
}
@media screen and (max-width: 540px) {
  #fundWalletModal .modal-dialog {
    top: unset !important;
    bottom: 0px !important;
    margin: 0px !important;
    max-width: 100%;
    width: 100%;
  }
  #fundWalletModal .modal-dialog-centered {
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
