<template>
  <div class="card animated px-4" id="fbtModal" v-if="uploadEvidienceModal">
    <br />
    <button class="btn bg-light" @click="goBack">
      <i class="fa fa-arrow-left"></i> Back
    </button>
    <br />
    <br />
    <h6 class="text-center font-18 w-75 mx-auto">
      Fund wallet by bank transfer (USD/EUR/GBP)
    </h6>
    <br />
    <p
      style="font-size: 14px"
      class="mb-4 text-center"
      v-if="byFCYTransferMessage !== ''"
    >
      {{ byFCYTransferMessage }}
    </p>
    <div class="table-responsive mt-3">
      <table id="lstProblems" class="table table-bordered text-nowrap mb-0">
        <thead>
          <tr style="background: #f5f5f7">
            <th>Bank Swift code(Local)</th>
            <th>Bank IBAN</th>
            <th>Bank Name</th>
            <th>Bank SortCode</th>
            <th>Bank SwiftCode(corresponding)</th>
            <th>currency</th>
            <th>Description</th>
            <th>local Account Name</th>
            <th>local Account Number</th>
            <th>local Bank Name</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bank in foreignTransfers" :key="bank.accountNumber">
            <td v-if="bank.bankSwiftCode">{{ bank.bankSwiftCode }}</td>
            <td v-else>.</td>
            <td v-if="bank.correspondingBankIBAN">
              {{ bank.correspondingBankIBAN }}
            </td>
            <td v-else>.</td>
            <td v-if="bank.correspondingBankName">
              {{ bank.correspondingBankName }}
            </td>
            <td v-else>.</td>
            <td v-if="bank.correspondingBankSortCode">
              {{ bank.correspondingBankSortCode }}
            </td>
            <td v-else>.</td>
            <td v-if="bank.correspondingBankSwiftCode">
              {{ bank.correspondingBankSwiftCode }}
            </td>
            <td v-else>.</td>
            <td v-if="bank.currency">{{ bank.currency }}</td>
            <td v-else>.</td>
            <td v-if="bank.description">{{ bank.description }}</td>
            <td v-else>.</td>
            <td v-if="bank.localAccountName">{{ bank.localAccountName }}</td>
            <td v-else>.</td>
            <td v-if="bank.localAccountNumber">
              {{ bank.localAccountNumber }}
            </td>
            <td v-else>.</td>
            <td v-if="bank.localBankName">{{ bank.localBankName }}</td>
            <td v-else>.</td>
            <td v-if="bank.rate">{{ bank.rate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-right pt-3 mt-5">
      <p class="text-right"><b>Already made payment??</b></p>
      <button
        type="submit"
        class="btn btn-danger oxfordvest_button"
        @click="uploadPaymentEvidence"
      >
        Upload Evidence
        <i style="font-size: 16px" class="fa fa-upload ml-2"></i>
      </button>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
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
    ...mapGetters(["uploadEvidienceModal"]),
    foreignTransfers() {
      let paymentOptions = this.user.fundWalletOptions;

      return paymentOptions.byFCYTransfer.items;
    },
    byFCYTransferMessage() {
      return this.user.fundWalletOptions.byFCYTransfer.message;
    },
  },

  methods: {
    ...mapActions([
      "closeUploadEvidienceModal",
      "showUploadEvidenceFormModal",
      "paymentOptionsBack",
    ]),

    uploadPaymentEvidence: function () {
      this.processing = false;
      this.showUploadEvidenceFormModal();
    },

    goBack: function () {
      this.paymentOptionsBack();
    },
  },
  mounted() {
    $("#AUDdetailsModal").on("shown.bs.modal", function () {
      var table = $("#lstProblems").DataTable();
      table.columns.adjust();
    });
  },
};
</script>
<style scoped>
table thead th {
  color: #222 !important;
  font-weight: bold;
}

#fbtModal .btn {
  border-radius: 4px;
  transition: 800ms ease;
  font-weight: bold;
  /* padding: 10px 15px; */
  box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
}

#fbtModal .btn.btn-outline-danger {
  border: 1px solid red !important;
  color: red !important;
}

#fbtModal .btn.btn-outline-danger:hover {
  background: red !important;
  color: white !important;
}

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
  background-color: #b1b1b1;
  border-radius: 10px;
  border: 2px solid #ffffff;
}

.table-responsive::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #ffffff;
}

@media screen and (max-width: 600px) {
  h6 {
    font-size: 15px !important;
  }
}
</style>
