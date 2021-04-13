<template>
  <div class="card" v-if="paymentOptions">
    <br />
    <br />
    <br />
    <h6 class="text-center font-15 w-75 mx-auto">
      Kindly click on any of the payment options below to fund your wallet
    </h6>
    <br />
    <br />
    <div class="grid-box text-center">
      <!-- <button
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
      </button> -->

      <div
        class="payment_grid card"
        @click="showBankTransferModal"
        v-if="userPaymentOptions.byLCYTransfer.items.length"
      >
        <div class="body">
          <i class="fa fa-newspaper-o"></i>
          <p>Bank Transfer</p>
        </div>
      </div>
      <div
        class="payment_grid card"
        @click="showDebitCreditCardModal"
        v-if="userPaymentOptions.byCard.items.length"
      >
        <div class="body">
          <i class="fa fa-credit-card-alt"></i>
          <p>Debit/Credit Card</p>
        </div>
      </div>
      <div
        class="payment_grid card"
        @click="showUploadEvidienceModal"
        v-if="userPaymentOptions.byFCYTransfer.items.length"
      >
        <div class="body">
          <i class="fa fa-globe"></i>
          <p>Transfer (USD/EUR/GBP)</p>
        </div>
      </div>
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
  width: 90%;
  margin: 40px auto 90px;
}

.payment_grid.card {
  /* box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%); */
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 19px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 300ms ease-in-out;
}
/* .payment_grid.card .body {
  padding: 16px;
} */

.payment_grid.card:hover {
  background: rgb(231, 230, 230);
}

.payment_grid.card i {
  font-size: 39px;
  margin-top: 20px;
  color: rgb(230, 45, 45);
}

.payment_grid.card p {
  font-size: 14.5px;
  margin-top: 40px;
  font-weight: bold;
  color: rgb(48, 43, 43);
}
button {
  background: rgba(245, 0, 0, 0.07) !important;
}
button:hover {
  color: #555 !important;
}

.grid-box .btn {
  padding: 10px 20px;
}

@media screen and (max-width: 1100px) {
  .payment_grid.card i {
    font-size: 28px;
    margin-top: 20px;
  }

  .payment_grid.card p {
    font-size: 15px;
    margin-top: 28px;
  }
}
@media screen and (max-width: 990px) {
  .grid-box {
    grid-template-columns: repeat(2, 1fr);
  }

  .modal-body h6.text-center.font-18 {
    width: 90% !important;
  }
}

@media screen and (max-width: 590px) {
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
