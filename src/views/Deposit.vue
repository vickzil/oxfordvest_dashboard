/* eslint-disable */
<template>
  <div>
    <PageLoadingOverlay />
    <div class="main-content">
      <div class="container-fluid">
        <!-- Page header section  -->
        <PageHeader :topPageName="topPageName" />

        <div class="row clearfix">
          <div class="col-lg-12 col-md-12">
            <div class="card">
              <ul class="nav nav-tabs3">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    data-toggle="tab"
                    href="#AllDeposit"
                    >Deposit History</a
                  >
                </li>
              </ul>
            </div>

            <div class="tab-content padding-0">
              <div class="tab-pane active" id="AllDeposit">
                <div class="card">
                  <div class="header">
                    <h2>My Deposit History</h2>
                  </div>
                  <div class="row clearfix">
                    <div class="col-12">
                      <div class="card">
                        <div class="body">
                          <form>
                            <div class="input-group">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="Search Deposit (by Name)"
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
                                <th>Date &amp; Time</th>
                                <th>Consulting</th>
                                <th>Injury/Condition</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>
                                  <div>Jason Porter</div>
                                  <p class="mb-0">+ 264-625-5858</p>
                                </td>
                                <td>jason-porter@example.com</td>
                                <td>
                                  <div>13 June 2019</div>
                                  <span class="text-muted font-12"
                                    >7:12PM to 8:30PM</span
                                  >
                                </td>
                                <td>Dr. David</td>
                                <td>Fever</td>
                                <td>
                                  <button
                                    type="button"
                                    class="btn btn-default btn-sm"
                                    title="Edit"
                                  >
                                    <i class="fa fa-pencil"></i>
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-default btn-sm"
                                    title="Delete"
                                  >
                                    <i class="fa fa-trash-o"></i>
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br />
      </div>
    </div>
  </div>
</template>
<script>
// import Map from "../components/charts/Map";
// import Navbar from "@/components/navbar/Navbar";
import PageHeader from "../components/header/PageHeader";
import PageLoadingOverlay from "../components/loaders/PageLoadingOverlay";

import "@/mixins";

export default {
  name: "Deposit",
  components: {
    PageLoadingOverlay,
    PageHeader,
  },

  data() {
    return {
      topPageName: "Deposit",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },

  methods: {
    removeOffcanvas: function () {
      document.body.classList.remove("offcanvas-active");
    },
  },

  mounted() {
    this.$store.dispatch("currentSitePage", this.$router.history.current.path);
    this.$store.dispatch("closePageLoading");
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("showPageLoading");
    this.removeOffcanvas();
    next();
  },
};
</script>
<style scoped></style>
