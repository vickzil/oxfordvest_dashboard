<template>
  <tr class="text-center">
    <td>{{ index + 1 }}</td>
    <td>{{ deposit.name }}</td>
    <td>{{ deposit.email }}</td>
    <!-- <td>
      {{ deposit.amount }}
    </td> -->
    <td>₦{{ addComma(deposit.amount) }}</td>
    <td>{{ deposit.message }}</td>
    <td>{{ deposit.paymentMethod }}</td>
    <td>{{ checkDate }}</td>
  </tr>
</template>

<script>
import "@/mixins";

export default {
  props: ["deposit", "index"],
  computed: {
    checkDate() {
      let data = this.deposit.createdOn;

      if (new Date(this.deposit.createdOn).getTime() > new Date().getTime()) {
        //Date greater than today's date

        data = this.removeTimeZone(this.deposit.createdOn);
      } else {
        data = this.getLocalTYime(this.deposit.createdOn);
      }

      // console.log(
      //   !!new Date(this.deposit.createdOn).getTime() > new Date().getTime()
      // );
      // console.log(!!new Date().getTime());

      return data;
    },
  },
};
</script>

<style></style>
