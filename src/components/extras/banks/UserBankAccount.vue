<template>
  <div class="card" v-if="user">
    <div class="header">
      <div class="row clearfix">
        <div class="col-xl-6 col-md-5 col-sm-12 card_button_right">
          <h2 class="header_header"><b>My Bank Account</b></h2>
        </div>
        <div class="col-xl-6 col-md-7 col-sm-12 text-md-right">
          <div
            class="d-flex align-items-center justify-content-md-end mt-4 mt-md-0 flex-wrap card_button_right"
          >
            <div class="mb-3 mb-xl-0">
              <a
                @click="showAddBank"
                href="javascript:void(0)"
                class="oxfordvest_buttons"
                v-if="!isEditting"
              >
                <span v-if="bankdetails.accountNumber">
                  Edit Bank <i class="fa fa-pencil ml-1"></i>
                </span>
                <span v-else> Add Bank <i class="fa fa-plus ml-1"></i> </span>
              </a>
              <a
                @click="cancelEditting"
                href="javascript:void(0)"
                class="btn btn-outline-danger"
                v-else
              >
                <span>
                  Cancel <i class="fa fa-arrow-circle-left ml-1"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <!-- {{ bankdetails }} -->
    <div class="body">
      <div class="row clearfix">
        <div class="col-12">
          <BankList
            v-if="
              bankdetails.accountNumber !== null && !showForm && !isEditting
            "
            :bankdetails="bankdetails"
          />
          <div
            class="card-body"
            v-if="bankdetails.accountNumber == null && !showForm && !isEditting"
          >
            <div class="container text-center font-weight-bold mt-5">
              <p>You don't have any bank details.</p>
              <br />
              <!-- <div class="text-center">
                <button class="oxfordvest_buttons" @click="showAddBank">
                  <span class="d-flex justify-content-center align-center">
                    <span class="mr-2">Add New</span>
                    <i style="font-size: 22px" class="fe fe-plus"></i>
                  </span>
                </button>
              </div>
              <br /> -->
              <br />
            </div>
          </div>
          <AddUpdateBank
            v-if="bankdetails.accountNumber == null && showForm && !isEditting"
            :bankdetails="bankdetails"
          />
          <EditBank
            v-if="bankdetails.accountNumber !== null && showForm && isEditting"
            :bankdetails="bankdetails"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/mixins";
import BankList from "./BankList";
import AddUpdateBank from "./AddUpdateBank";
import EditBank from "./EditBank";
export default {
  components: {
    BankList,
    AddUpdateBank,
    EditBank,
  },
  data() {
    return {
      showForm: false,
      isEditting: false,
    };
  },
  computed: {
    bankdetails() {
      return this.user.userInfo.userBankAccountInfo.userBankAccount;
    },
  },
  methods: {
    showAddBank: function () {
      this.showForm = true;
      if (this.bankdetails.accountNumber !== null) {
        this.isEditting = true;
      } else {
        this.isEditting = false;
      }
    },
    cancelEditting: function () {
      this.showForm = false;
      this.isEditting = false;
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 530px) {
  h2.header_header {
    text-align: center !important;
  }
  p {
    line-height: 1.4;
  }

  .card_button_right {
    display: block !important;
    text-align: center !important;
  }
}
</style>
