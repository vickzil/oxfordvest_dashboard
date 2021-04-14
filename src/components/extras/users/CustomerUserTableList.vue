<template>
  <tr class="text-center">
    <td>{{ index + 1 }}</td>
    <td>{{ searchedUser.name }}</td>
    <td>{{ searchedUser.email }}</td>
    <td>
      {{ searchedUser.code }}
    </td>
    <td>{{ removeTimeZone(searchedUser.dateOfBirth) }}</td>
    <td>{{ searchedUser.phoneNumber }}</td>
    <td>
      {{ searchedUser.homeAddress == null ? "none" : searchedUser.homeAddress }}
    </td>
    <td>
      {{
        searchedUser.referralCode == null ? "none" : searchedUser.referralCode
      }}
    </td>
    <td>
      <span
        class="badge"
        :class="
          searchedUser.status == 'active' ? 'badge-success' : 'badge-danger'
        "
        >{{ searchedUser.status }}</span
      >
    </td>
    <td>{{ removeTimeZone(searchedUser.createdOn) }}</td>
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
