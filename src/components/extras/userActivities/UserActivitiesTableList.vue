<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>
      {{ userActivity.name }}
    </td>
    <td>{{ userActivity.description }}</td>
    <td>{{ userActivity.firstName }} {{ userActivity.lastName }}</td>
    <td>{{ userActivity.ip }}</td>
    <td>{{ checkDate }}</td>
    <!-- <td>{{ removeTimeZone(this.userActivity.createdOn) }}</td> -->
  </tr>
</template>

<script>
import "@/mixins";
export default {
  props: ["userActivity", "index"],
  computed: {
    checkDate() {
      let data = this.userActivity.createdOn;

      if (
        new Date(this.userActivity.createdOn).getTime() > new Date().getTime()
      ) {
        //Date greater than today's date

        data = this.userActivity.createdOn;
      } else {
        data = this.getLocalTYime(this.userActivity.createdOn);
      }

      console.log(data);

      return data;
    },
  },

  methods: {},

  mounted() {
    // this.checkDate();
  },
};
</script>

<style></style>
