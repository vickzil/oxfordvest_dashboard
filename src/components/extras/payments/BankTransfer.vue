<template>
  <div class="card animated px-4" v-if="bankTransferModal">
    <br />
    <button class="btn bg-light hrm_button" @click="goBack">
      <i class="fa fa-arrow-left"></i> Back
    </button>
    <br />

    <br />
    <h6 class="text-center font-18 w-75 mx-auto">
      Fund wallet by bank transfer (NGN)
    </h6>
    <br />
    <p
      style="font-size: 14px"
      class="mb-4 text-center"
      v-if="byLCFTransferMessage !== ''"
    >
      {{ byLCFTransferMessage }}
    </p>
    <div class="table-responsive mt-3">
      <table class="table table-bordered text-nowrap mb-0">
        <thead>
          <tr style="background: #f5f5f7">
            <th>Bank</th>
            <th>Acc No</th>
            <th>Acc Name</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bank in localTransfers" :key="bank.accountNumber">
            <td>{{ bank.accountBank }}</td>
            <td>{{ bank.accountNumber }}</td>
            <td>{{ bank.accountName }}</td>
            <td>{{ bank.currency }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br /><br /><br />
  </div>
</template>
<script>
import "@/mixins";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      amount: this.addComma(0),
      lowAmount: false,
      processing: false,
      formText: "Proceed",
    };
  },
  computed: {
    ...mapGetters(["bankTransferModal"]),
    localTransfers() {
      let paymentOptions = this.user.fundWalletOptions;

      return paymentOptions.byLCYTransfer.items;
    },
    byLCFTransferMessage() {
      return this.user.fundWalletOptions.byLCYTransfer.message;
    },
  },

  methods: {
    ...mapActions([
      "closeBankTransferModal",
      "setMakePayment",
      "paymentOptionsBack",
      "setAlertModalStatus",
    ]),

    goBack: function () {
      this.paymentOptionsBack();
    },

    proceedToPayment: function () {
      this.processing = true;
      this.formText = "please wait ...";

      setTimeout(() => {
        this.processing = false;
        this.formText = "Proceed";

        this.setMakePayment(false);

        let payload = {
          status: true,
          type: "success",
          message: "Payment Successfull!!",
        };
        this.setAlertModalStatus(payload);
      }, 4000);
    },
  },
};
</script>
<style scoped>
table thead th {
  color: #333 !important;
  font-weight: bold;
}
</style>
