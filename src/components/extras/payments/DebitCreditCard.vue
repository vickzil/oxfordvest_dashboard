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
      <!-- <button
        type="submit"
        class="btn btn-outline-danger btn-sm border-0 hrm_button"
        @click="makeThisPayment(payment)"
        v-for="payment in debitByCard"
        :key="payment.publicKey"
        style="text-transform: capitalize"
      >
        {{ payment.provider }}
      </button> -->

      <div
        class="payment_grid card"
        @click="makeThisPayment(payment)"
        v-for="payment in debitByCard"
        :key="payment.publicKey"
      >
        <div class="body">
          <img
            v-if="payment.provider == 'paystack'"
            src="data:image/png;base64,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"
            alt="paystack"
          />

          <img
            v-if="payment.provider == 'rave'"
            src="data:image/png;base64,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"
            alt="flutterwave"
          />

          <svg
            v-if="payment.provider == 'stripe'"
            viewBox="0 0 60 25"
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            class="UserLogo variant--"
          >
            <title>Stripe logo</title>
            <path
              fill="var(--userLogoColor, #0A2540)"
              d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zm-4.32 9.35v9.79H19.8V5.57h3.7l.12 1.22c1-1.77 3.07-1.41 3.62-1.22v3.79c-.52-.17-2.29-.43-3.32.86zm-8.55 4.72c0 2.43 2.6 1.68 3.12 1.46v3.36c-.55.3-1.54.54-2.89.54a4.15 4.15 0 0 1-4.27-4.24l.01-13.17 4.02-.86v3.54h3.14V9.1h-3.13v5.85zm-4.91.7c0 2.97-2.31 4.66-5.73 4.66a11.2 11.2 0 0 1-4.46-.93v-3.93c1.38.75 3.1 1.31 4.46 1.31.92 0 1.53-.24 1.53-1C6.26 13.77 0 14.51 0 9.95 0 7.04 2.28 5.3 5.62 5.3c1.36 0 2.72.2 4.09.75v3.88a9.23 9.23 0 0 0-4.1-1.06c-.86 0-1.44.25-1.44.9 0 1.85 6.29.97 6.29 5.88z"
              fill-rule="evenodd"
            ></path>
          </svg>

          <!-- <p>{{ payment.provider }}</p> -->
        </div>
      </div>
    </div>
    <br /><br />
    <div class="payment_methods_img text-center">
      <img src="@/assets/images/payments.png" alt="" />
    </div>
    <br /><br />
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
            " payment method is not available. Please try other available payment options",
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

.payment_grid.card {
  /* box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%); */
  /* box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 10px 0px; */
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 19px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 300ms ease-in-out;
}
/* .payment_grid.card .body {
  padding: 16px;
} */

.payment_grid.card:hover {
  background: rgb(247, 239, 239);
}
.payment_grid.card:hover img,
.payment_grid.card:hover svg {
  background: rgb(231, 230, 230);
}

.payment_grid.card img {
  width: 140px;
  height: 90px;
  border-radius: 4px;
}

.payment_grid.card p {
  font-size: 14.5px;
  margin-top: 40px;
  font-weight: bold;
  color: rgb(48, 43, 43);
  text-transform: capitalize;
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

@media screen and (max-width: 970px) {
  .grid-box {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(2, 1fr);
  }

  .modal-body h6.text-center.font-18 {
    width: 90% !important;
  }
}

@media screen and (max-width: 530px) {
  .grid-box {
    gap: 20px;
    grid-template-columns: 1fr;
    width: 95%;
  }

  /* .payment_grid.card img,
  .payment_grid.card svg {
    width: 100px;
    height: 70px;
  } */

  .modal-body h6.text-center.font-18 {
    font-size: 13px !important;
  }
}
</style>
