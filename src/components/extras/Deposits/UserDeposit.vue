<template>
  <div class="card">
    <div class="header">
      <h2>All Deposits</h2>
    </div>
    <div class="row clearfix">
      <div class="col-12">
        <div class="card" v-if="deposits.length">
          <div class="body">
            <form>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Deposit"
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Message</th>
                  <th>Payment method</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody v-if="searchDeposits.length">
                <DepositTableList
                  v-for="(deposit, index) in searchDeposits"
                  :key="deposit.externalReference"
                  :deposit="deposit"
                  :index="index"
                />
              </tbody>
              <tbody v-else>
                <tr class="text-center">
                  <td colspan="6">No Deposit Found</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br /><br />
        </div>

        <div class="card" v-else>
          <div class="container text-center font-weight-bold mt-5">
            <p>You don't have any deposits.</p>
            <br /><br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/mixins";

import DepositTableList from "./DepositTableList";
export default {
  components: {
    DepositTableList,
  },
  computed: {
    deposits() {
      return this.user.userInfo.walletTopupsInfo
        .getUserWalletTopUpsResponseData;
    },
    searchDeposits() {
      let text = this.searchText.toLowerCase();
      return this.deposits.filter((deposit) =>
        deposit.name.toLowerCase().match(text)
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
