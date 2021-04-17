<template>
  <tr class="text-center">
    <td>{{ index + 1 }}</td>
    <td>₦{{ addComma(withdrawal.payoutAmount) }}</td>
    <td>{{ withdrawal.narration }}</td>
    <td>{{ withdrawal.message == "" ? "none" : withdrawal.message }}</td>
    <td>{{ withdrawal.provider }}</td>

    <td>
      <span class="badge badge-primary">{{ withdrawal.status }}</span>
    </td>
    <td>{{ formatDate(withdrawal.createdOn) }}</td>
    <!-- <td>{{ removeTimeZone(withdrawal.createdOn) }}</td> -->
  </tr>
</template>

<script>
import "@/mixins";

export default {
  props: ["withdrawal", "index"],
};
</script>

<style></style>
