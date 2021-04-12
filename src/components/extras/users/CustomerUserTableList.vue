<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ user.name }}</td>
    <td>{{ user.email }}</td>
    <td>
      {{ user.code }}
    </td>
    <td>{{ user.dob }}</td>
    <td>{{ user.phoneNumber }}</td>
    <td>{{ user.homeAddress }}</td>
    <td>{{ user.phoneNumber }}</td>
    <td>{{ user.status }}</td>
    <td>{{ removeTimeZone(user.createdOn) }}</td>
  </tr>
</template>

<script>
import "@/mixins";

export default {
  props: ["user", "index"],
};
</script>

<style></style>
