<template>
  <div class="card">
    <div class="header">
      <h2><b>All Withdrawals</b></h2>
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
                  placeholder="Search Withdrawal by Narration"
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
                <tr class="text-center">
                  <th>#</th>
                  <th>Amount</th>
                  <th>Narration</th>
                  <th>Message</th>
                  <th>Provider</th>
                  <th>Status</th>
                  <th>Date</th>
                  <!-- <th>Date</th> -->
                </tr>
              </thead>
              <tbody v-if="searchWithdrawals.length">
                <WithdrawalTableList
                  v-for="(withdrawal, index) in searchWithdrawals"
                  :key="withdrawal.externalId"
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
        withdrawal.narration.toLowerCase().match(text)
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
