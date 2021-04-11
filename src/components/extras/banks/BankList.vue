<template>
  <div class="card">
    <div class="table-responsive">
      <table class="table table-hover table-striped mb-0">
        <thead>
          <tr>
            <th>Bank Name</th>
            <th>Account No.</th>
            <th>Account Name</th>
            <th>Currency</th>
            <th>status</th>
            <!-- <th>Action</th> -->
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ bankdetails.bankName }}</td>
            <td>
              {{ bankdetails.accountNumber }}
            </td>
            <td>{{ bankdetails.accountName }}</td>
            <td>{{ bankdetails.currency }}</td>
            <td>
              <span class="badge badge-success">{{ bankdetails.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br /><br />
  </div>
</template>

<script>
export default {
  props: ["bankdetails"],
};
</script>

<style></style>
