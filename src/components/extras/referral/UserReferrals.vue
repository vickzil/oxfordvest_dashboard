<template>
  <div class="row clearfix">
    <div class="col-lg-12 col-md-12">
      <div class="body">
        <div class="oxfordvest_tabs">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab" href="#AllReferrals"
                >My Referrals</a
              >
            </li>
          </ul>
        </div>

        <div class="tab-content padding-0">
          <div class="tab-pane active" id="AllReferrals">
            <div class="card">
              <div class="header">
                <h2><b>My Referrals</b></h2>
              </div>
              <div class="body">
                <div class="row clearfix">
                  <div class="col-12">
                    <div class="card" v-if="referrals.length">
                      <div class="body">
                        <form>
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Search referral"
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
                        <table class="table table-striped mb-0">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Code</th>
                              <th>Phone</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody v-if="searchReferrals.length">
                            <ReferralTableList
                              v-for="(referral, index) in searchReferrals"
                              :key="referral.id"
                              :referral="referral"
                              :index="index"
                            />
                          </tbody>
                          <tbody v-else>
                            <tr class="text-center">
                              <td colspan="6">No referral Found</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <br /><br />
                    </div>

                    <div class="card" v-else>
                      <div class="container text-center font-weight-bold mt-5">
                        <p>You don't have any referrals.</p>
                        <br /><br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/mixins";

import ReferralTableList from "./ReferralTableList";
export default {
  components: {
    ReferralTableList,
  },
  computed: {
    referrals() {
      return this.user.userInfo.referrals.referralData;
    },
    searchReferrals() {
      let text = this.searchText.toLowerCase();
      return this.referrals.filter((referral) =>
        referral.firstName.toLowerCase().match(text)
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
