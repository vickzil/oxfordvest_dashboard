<template>
  <div class="row clearfix card" v-if="user">
    <div class="col-12">
      <div class="section_title">
        <div class="mr-3 pl-2">
          <h3>Activity Logs</h3>
          <br />
        </div>
      </div>
    </div>
    <div class="col-md-12 col-sm-12 card">
      <div class="table-responsive" v-if="userActivities.length">
        <table class="table table-striped mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Fullname</th>
              <th>Ip</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <UserActivitiesTableList
              v-for="(userActivity, index) in userActivities"
              :key="index"
              :index="index"
              :userActivity="userActivity"
            />
          </tbody>
        </table>
      </div>
      <div class="card text-center p-5" v-else>
        <br /><br />
        <p>
          <b>No Activity yet</b>
        </p>
        <br />
      </div>
    </div>
    <br /><br /><br />
  </div>
</template>

<script>
import "@/mixins";
import UserActivitiesTableList from "./UserActivitiesTableList";
export default {
  components: {
    UserActivitiesTableList,
  },
  computed: {
    userActivities() {
      let activities = this.user.userInfo.userActivities;
      let someActivities = activities.slice(0, 5);
      // let sortedActivities = someActivities.sort(function (a, b) {
      //   return a.createdOn < b.createdOn ? -1 : 1;
      // });
      return someActivities;
    },
  },
};
</script>

<style></style>
