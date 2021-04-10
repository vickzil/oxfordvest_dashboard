<template>
  <div class="card p-3">
    <div class="table-responsive mt-3 mb-4">
      <table class="table table-bordered text-nowrap mb-0">
        <thead>
          <tr style="background: #f5f5f7">
            <th>Investment</th>
            <th>Duration</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Post Charges</th>
            <th>Mgt. Fee</th>
            <th v-if="calculatedItem.frequency">Frequency</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-transform: capitalize">
              {{ calculatedItem.name }}
            </td>
            <td>{{ calculatedItem.durationInMonths }} months</td>
            <td>
              <span>₦</span>{{ addComma(Math.trunc(calculatedItem.principal)) }}
            </td>
            <td>
              <span>₦</span
              >{{ addComma(Math.trunc(calculatedItem.interestRate)) }}
            </td>
            <td>
              <span>₦</span
              >{{ addComma(Math.trunc(calculatedItem.interestPostCharges)) }}
            </td>
            <td>
              <span>₦</span
              >{{ addComma(Math.trunc(calculatedItem.managementFee)) }}
            </td>
            <td>{{ calculatedItem.frequency }}</td>
            <td>{{ calculatedItem.currency }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="text-right" colspan="6">
              <br />
              <strong>Total Payout</strong>
            </td>
            <td colspan="6">
              <br />
              <b
                ><span>₦</span
                >{{ addComma(Math.trunc(calculatedItem.total)) }}</b
              >
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <p class="py-2 text-center font-weight-bold">
      <small
        ><b>{{ calculatedItem.frequencyInformation }}</b></small
      >
    </p>

    <p class="py-2 text-center">
      <small>{{ calculatedItem.message }}</small>
    </p>
  </div>
</template>

<script>
import "@/mixins";
export default {
  props: ["calculatedItem"],
};
</script>

<style></style>
