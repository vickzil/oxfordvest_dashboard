<template>
  <div class="table-responsive mt-3 mb-4">
    <table class="table table-bordered text-nowrap mb-0">
      <thead>
        <tr style="background: #f5f5f7">
          <th>Name</th>
          <th>E-mail</th>
          <th>Amount</th>
          <th>Charges</th>
          <th>Currency</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-transform: capitalize">
            {{ user.userInfo.user.firstName }} {{ user.userInfo.user.lastName }}
          </td>
          <td>{{ user.userInfo.user.email }}</td>
          <td>
            <span v-if="currency === 'NGN'">₦</span
            >{{ addComma(Math.trunc(paymentForPaystackInfo.amount)) }}
          </td>
          <td>
            <span v-if="currency === 'NGN'">₦</span
            >{{ addComma(Math.trunc(paymentForPaystackInfo.charges)) }}
          </td>
          <td>{{ currency }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="text-right" colspan="4">
            <strong>Total Amount</strong>
          </td>
          <td colspan="4">
            <b
              ><span v-if="currency === 'NGN'">₦</span
              >{{ addComma(Math.trunc(paymentForPaystackInfo.totalDebit)) }}</b
            >
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import "@/mixins";
export default {
  props: ["paymentForPaystackInfo", "currency"],
};
</script>

<style></style>
