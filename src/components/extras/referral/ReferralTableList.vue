<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ referral.firstName }} {{ referral.lastName }}</td>
    <td>{{ referral.email }}</td>
    <td>
      {{ referral.code }}
    </td>
    <td>{{ referral.phoneNumber }}</td>
    <td>
      <router-link
        :to="{ name: 'SingleReferral', params: { id: referral.code } }"
        class="btn btn-default btn-sm"
        >Details <i class="fa fa-eye"></i
      ></router-link>
      <!-- <button type="button" class="btn btn-default btn-sm" title="Edit">
        
      </button> -->
    </td>
  </tr>
</template>

<script>
export default {
  props: ["referral", "index"],
};
</script>

<style></style>
