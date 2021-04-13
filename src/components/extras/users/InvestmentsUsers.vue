<template>
  <div class="card">
    <div class="header">
      <h2><b>Users Investments</b></h2>
      <p class="text-center mt-5 mb-4"><b>Search users Investments</b></p>
    </div>
    <div class="row clearfix">
      <div class="col-12">
        <div class="card">
          <div class="body">
            <form v-on:submit.prevent="searchUsers">
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Email"
                      v-model.trim="email"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>User code</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="User code"
                      v-model.trim="userCode"
                    />
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-group">
                    <label>Investment Status</label>
                    <select class="form-control" v-model="status">
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-group">
                    <label>From date</label>
                    <input type="date" class="form-control" v-model="from" />
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-group">
                    <label>To date</label>
                    <input type="date" class="form-control" v-model="to" />
                  </div>
                </div>
              </div>
              <div class="text-center">
                <div class="btn-group mt-3 text-center">
                  <button type="submit" class="btn btn-outline-dark">
                    Search <i class="icon-magnifier ml-2"></i>
                  </button>
                  <button
                    v-if="download"
                    type="button"
                    class="btn btn-success ml-2"
                  >
                    Download <i class="fa fa-download ml-2"></i>
                  </button>
                </div>
              </div>
            </form>

            <form class="mt-5">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search user by name"
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
                <tr style="background: rgba(245, 0, 0, 0.07)">
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Code</th>
                  <th>D.o.b</th>
                  <th>Phone</th>
                  <th>Acc officer Code</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody v-if="UsersInvestments.length">
                <CustomerUserTableList
                  v-for="(user, index) in Users"
                  :key="user.id"
                  :user="user"
                  :index="index"
                />
              </tbody>
              <tbody v-else>
                <tr class="text-center">
                  <td colspan="10">
                    <div>
                      <br />
                      <br />
                      <b>No Information Found</b>
                      <br />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br /><br />
        </div>

        <!-- <div class="card" v-else>
          <div class="container text-center font-weight-bold mt-5">
            <p>You don't have any deposits.</p>
            <br /><br />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import "@/mixins";
// import CustomerUserTableList from "./CustomerUserTableList"
// import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    // CustomerUserTableList
  },
  computed: {
    ...mapGetters(["UsersInvestments", "registrationInfo"]),
    // deposits() {
    //   return this.user.userInfo.walletTopupsInfo
    //     .getUserWalletTopUpsResponseData;
    // },
    Users() {
      let text = this.searchText.toLowerCase();
      return this.UsersInvestments.filter((user) =>
        user.name.toLowerCase().match(text)
      );
    },
  },
  data() {
    return {
      download: false,
      searchText: "",
      email: "",
      userCode: "",
      status: "",
      from: "",
      to: "",
    };
  },

  methods: {
    ...mapActions(["setActionLoading", "setAlertModalStatus"]),
    searchUsers: function () {
      this.setActionLoading(true);

      setTimeout(() => {
        this.setActionLoading(false);

        var data = {
          Email: this.email,
          UserCode: this.userCode,
          Status: this.status,
          From: this.from,
          To: this.to,
        };
        console.log(data);
      }, 4000);
    },
  },
};
</script>

<style></style>
