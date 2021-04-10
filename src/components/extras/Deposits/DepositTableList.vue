<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ deposit.name }}</td>
    <td>{{ deposit.email }}</td>
    <td>
      {{ deposit.amount }}
    </td>
    <td>{{ deposit.message }}</td>
    <td>{{ deposit.paymentMethod }}</td>
    <td>{{ removeTimeZone(deposit.createdOn) }}</td>
  </tr>
</template>

<script>
import "@/mixins";

export default {
  props: ["deposit", "index"],
};
</script>

<style></style>
