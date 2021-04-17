<template>
  <div class="card">
    <div class="header">
      <h2><b>Registered Users</b></h2>
      <!-- <p class="text-center mt-5 mb-4"><b>Search registered users</b></p> -->
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
                    <label>Status</label>
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
          <div class="body">
            <div class="dataTables_length mb-3" id="tbData_length">
              <label
                >Show
                <select
                  name="tbData_length"
                  aria-controls="tbData"
                  class=""
                  @change="sortTable($event)"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="">All</option>
                </select>
                entries</label
              >
            </div>
            <div
              class="text-center mt-3 mb-3"
              v-if="registeredUsers.length > 0"
            >
              <p class="badge badge-dark">
                <b>{{ registeredUsers.length }} user(s) Found</b>
              </p>
            </div>

            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr
                    style="background: rgba(245, 0, 0, 0.07)"
                    class="text-center"
                  >
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Code</th>
                    <th>D.o.b</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Acc officer Code</th>
                    <th>Status</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody v-if="Users.length">
                  <CustomerUserTableList
                    v-for="(searchedUser, index) in Users"
                    :key="searchedUser.id"
                    :searchedUser="searchedUser"
                    :index="index"
                  />
                </tbody>
                <tbody v-else>
                  <tr class="text-center">
                    <td colspan="10">
                      <div>
                        <br />
                        <br />
                        <b>No Record</b>
                        <br />
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot v-if="Users.length && searchUserTotals !== null">
                  <tr>
                    <td class="text-right" colspan="9">
                      <strong>Total Active</strong>
                    </td>
                    <td colspan="9">
                      <span class="badge badge-success">{{
                        searchUserTotals.totalActive
                      }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" colspan="9">
                      <strong>Total Inactive</strong>
                    </td>
                    <td colspan="9">
                      <span class="badge badge-warning">{{
                        searchUserTotals.totalInActive
                      }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-right" colspan="9">
                      <strong>Total Users</strong>
                    </td>
                    <td colspan="9">
                      <b>{{ searchUserTotals.totalNumber }}</b>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div
                class="dataTables_info"
                id="tbData_info"
                role="status"
                aria-live="polite"
              >
                Showing
                {{
                  registeredUsers.length > 0
                    ? sortNumber
                    : registeredUsers.length
                }}
                of {{ registeredUsers.length }} entries
              </div>
            </div>
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
import CustomerUserTableList from "./CustomerUserTableList";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    CustomerUserTableList,
  },
  computed: {
    ...mapGetters(["registrationInfo", "registeredUsers", "sortNumber"]),

    Users() {
      let text = this.searchText.toLowerCase();

      let filteredUsers = this.registeredUsers.filter((user) =>
        user.name.toLowerCase().match(text)
      );

      let sortedUser = filteredUsers.splice(0, this.sortNumber);
      return sortedUser;
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
      searchUserTotals: null,
    };
  },

  methods: {
    ...mapActions([
      "setActionLoading",
      "setAlertModalStatus",
      "setRegisteredUsers",
      "setSortedNumber",
    ]),

    sortTable: function (event) {
      this.setSortedNumber(event.target.value);
    },
    searchUsers: function () {
      this.setActionLoading(true);

      const url = `${this.hrmURL}/Report/searchUsers`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.userCode,
        FromDate: this.from,
        ToDate: this.to,
        Status: this.status,
        Email: this.email,
        AccountNumber: "",
        Preview: true,
      };

      // console.log(data);

      axios
        .post(url, data)
        .then((res) => {
          this.setActionLoading(false);
          if (res.data.users.length > 0) {
            this.setRegisteredUsers(res.data.users);
            // console.log(res.data.users);

            const { totalActive, totalInActive, totalNumber } = res.data;
            let newPayload = {
              totalActive,
              totalInActive,
              totalNumber,
            };

            this.searchUserTotals = newPayload;
          } else {
            let payload = {
              status: true,
              type: "error",
              message: "No Record found",
            };

            this.setRegisteredUsers([]);

            this.setAlertModalStatus(payload);
          }

          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
          this.serverErrorMessage();
        });
    },
  },
};
</script>

<style scoped>
.table-responsive::-webkit-scrollbar {
  -webkit-appearance: none !important;
}

.table-responsive::-webkit-scrollbar:vertical {
  width: 12px !important;
}

.table-responsive::-webkit-scrollbar:horizontal {
  height: 12px !important;
}

.table-responsive::-webkit-scrollbar-thumb {
  background-color: #b1b1b1 !important;
  border-radius: 10px !important;
  border: 2px solid #ffffff !important;
}

.table-responsive::-webkit-scrollbar-track {
  border-radius: 10px !important;
  background-color: #ffffff !important;
}
</style>
