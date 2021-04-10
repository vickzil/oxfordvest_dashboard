<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ withdrawal.name }}</td>
    <td>{{ withdrawal.email }}</td>
    <td>
      {{ withdrawal.amount }}
    </td>
    <td>{{ withdrawal.message }}</td>
    <td>{{ withdrawal.paymentMethod }}</td>
    <td>{{ removeTimeZone(withdrawal.createdOn) }}</td>
  </tr>
</template>

<script>
import "@/mixins";

export default {
  props: ["withdrawal", "index"],
};
</script>

<style></style>
