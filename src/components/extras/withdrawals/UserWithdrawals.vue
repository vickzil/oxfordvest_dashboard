<template>
  <div class="card">
    <div class="header">
      <h2>All Withdrawals</h2>
    </div>
    <div class="row clearfix">
      <div class="col-12">
        <div class="card" v-if="withdrawals.length">
          <div class="body">
            <form>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Withdrawal by amount"
                  v-model="searchText"
                />
                <div class="input-group-append">
                  <span class="input-group-text" id="search-mail"
                    ><i class="icon-magnifier"></i
                  ></span>
                </div>
              </div>
            </form>
          </div>
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Message</th>
                  <th>Payment method</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody v-if="searchWithdrawals.length">
                <WithdrawalTableList
                  v-for="(withdrawal, index) in searchWithdrawals"
                  :key="withdrawal.requestId"
                  :withdrawal="withdrawal"
                  :index="index"
                />
              </tbody>
              <tbody v-else>
                <tr class="text-center">
                  <td colspan="6">No withdrawals Found</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br /><br />
        </div>

        <div class="card" v-else>
          <div class="container text-center font-weight-bold mt-5">
            <p>You don't have any withdrawals.</p>
            <br /><br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/mixins";

import WithdrawalTableList from "./WithdrawalTableList";
export default {
  components: {
    WithdrawalTableList,
  },
  computed: {
    withdrawals() {
      return this.user.userInfo.userWalletWithdrawalInfo.userWithdrawals;
    },
    searchWithdrawals() {
      let text = this.searchText.toLowerCase();
      return this.withdrawals.filter((withdrawal) =>
        withdrawal.name.toLowerCase().match(text)
      );
    },
  },
  data() {
    return {
      searchText: "",
    };
  },
};
</script>

<style></style>
