<template>
  <div class="card" v-if="paymentOptions">
    <br />
    <br />
    <br />
    <h6 class="text-center font-15 w-75 mx-auto">
      Kindly click on any of the payment options below to fund your wallet
    </h6>
    <br />
    <div class="grid-box text-center">
      <button
        type="submit"
        class="btn btn-outline-danger btn-sm border-0 hrm_button"
        @click="showBankTransferModal"
        v-if="userPaymentOptions.byLCYTransfer.items.length"
      >
        Bank Transfer <i class="fa fa-newspaper-o ml-2"></i>
      </button>
      <button
        type="submit"
        class="btn btn-outline-danger btn-sm hrm_button"
        @click="showDebitCreditCardModal"
        v-if="userPaymentOptions.byCard.items.length"
      >
        Debit/Credit Card <i class="fa fa-credit-card-alt ml-2"></i>
      </button>
      <button
        type="submit"
        class="btn btn-outline-danger btn-sm hrm_button"
        @click="showUploadEvidienceModal"
        v-if="userPaymentOptions.byFCYTransfer.items.length"
      >
        Transfer (USD/EUR/GBP) <i class="fa fa-globe ml-2"></i>
      </button>
    </div>
  </div>
</template>

<script>
import "@/mixins";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["paymentOptions"]),
    userPaymentOptions() {
      return this.user.fundWalletOptions;
    },
  },

  methods: {
    ...mapActions([
      "showBankTransferModal",
      "showDebitCreditCardModal",
      "showUploadEvidienceModal",
    ]),
  },
};
</script>
<style scoped>
.grid-box {
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(3, 1fr);
  width: 80%;
  margin: 40px auto 90px;
}

.grid-box .btn {
  padding: 10px 20px;
}

@media screen and (max-width: 770px) {
  .grid-box {
    grid-template-columns: repeat(2, 1fr);
  }

  .modal-body h6.text-center.font-18 {
    width: 90% !important;
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
