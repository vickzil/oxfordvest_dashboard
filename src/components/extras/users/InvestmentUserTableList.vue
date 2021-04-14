<template>
  <tr class="text-center">
    <td>{{ index + 1 }}</td>
    <td>{{ searchedUser.fullName }}</td>
    <td>{{ searchedUser.email }}</td>
    <td>
      {{ searchedUser.userCode }}
    </td>
    <td>₦{{ addComma(searchedUser.amountInvested) }}</td>

    <td>{{ searchedUser.availableInvestmentName }}</td>
    <td>{{ searchedUser.dailyROI }}</td>
    <td>{{ searchedUser.frequency }}</td>
    <td>{{ searchedUser.sourceChannel }}</td>
    <td>
      {{ searchedUser.isRecurring == true ? "Yes" : "No" }}
    </td>
    <td>₦{{ addComma(searchedUser.upfrontRateAmount) }}</td>
    <td>
      {{
        searchedUser.upfrontPaidOn == null
          ? "none"
          : removeTimeZone(searchedUser.upfrontPaidOn)
      }}
    </td>
    <td>
      <span class="badge badge-primary">{{ searchedUser.status }}</span>
    </td>
    <td>{{ searchedUser.duration }} Months</td>
    <td>
      {{
        searchedUser.maturityDate == null
          ? "none"
          : removeTimeZone(searchedUser.maturityDate)
      }}
    </td>
  </tr>
</template>

<script>
import "@/mixins";

export default {
  props: ["searchedUser", "index"],
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
