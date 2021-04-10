<template>
  <div class="card animated px-4" v-if="debitCreditCardModal">
    <br />
    <button class="btn bg-light hrm_button" @click="goBack">
      <i class="fa fa-arrow-left"></i> Back
    </button>
    <br /><br />
    <h6 class="text-center font-16 w-75 mx-auto" v-if="debitByCardMessage">
      {{ debitByCardMessage }}
    </h6>
    <br />
    <div class="grid-box text-center">
      <button
        type="submit"
        class="btn btn-outline-danger btn-sm border-0 hrm_button"
        @click="makeThisPayment(payment)"
        v-for="payment in debitByCard"
        :key="payment.publicKey"
        style="text-transform: capitalize"
      >
        {{ payment.provider }}
      </button>
    </div>
    <div class="payment_methods_img text-center">
      <img src="@/assets/images/payments.png" alt="" />
    </div>
  </div>
</template>
<script>
import "@/mixins";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["debitCreditCardModal"]),
    debitByCard() {
      let paymentOptions = this.user.fundWalletOptions;

      return paymentOptions.byCard.items;
    },

    debitByCardMessage() {
      return this.user.fundWalletOptions.byCard.message;
    },
  },

  methods: {
    ...mapActions([
      "setAlertModalStatus",
      "closeDebitCreditCardModal",
      "paymentOptionsBack",
      "showPaymentFormModal",
      "setClickedPaymentType",
    ]),
    makeThisPayment: function (payment) {
      if (payment.provider == "paystack" || payment.provider == "rave") {
        this.setClickedPaymentType(payment);
        this.showPaymentFormModal();

        // console.log(this.clickedPaymentType);

        // console.log();
      } else {
        let payload = {
          status: true,
          type: "error",
          message:
            "Unfortunately, " +
            payment.provider +
            " payment method is not available. Please make use of other available payment options",
        };
        this.setAlertModalStatus(payload);
      }
    },

    goBack: function () {
      this.paymentOptionsBack();
    },
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
  border-radius: 4px;
  transition: 800ms ease;
  font-weight: bold;
  padding: 10px 0px;
  box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
}

.grid-box .btn.btn-outline-danger {
  border: 1px solid red !important;
  color: red !important;
}

.grid-box .btn.btn-outline-danger:hover {
  background: red !important;
  color: white !important;
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
