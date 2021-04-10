<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>{{ searchBank.alias }}</td>
    <td>{{ searchBank.provider }}</td>
    <td>{{ searchBank.accountName }}</td>
    <td>{{ searchBank.accountNumber }}</td>
    <td>{{ searchBank.cardType }}</td>

    <td>
      <span
        class="badge"
        :class="
          searchBank.defaultPayoutAccount ? 'badge-success' : 'badge-secondary'
        "
        >{{ searchBank.cardType }}</span
      >
    </td>

    <td>{{ searchBank.cardExpireMonth }}/{{ searchBank.cardExpireYear }}</td>
    <td>
      <a class="btn btn-danger btn-sm" @click="deleteCard(searchBank)">
        Delete <i class="fa fa-trash-o"></i>
      </a>
    </td>
  </tr>
</template>

<script>
import "@/mixins";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["searchBank", "index"],
  computed: {
    ...mapGetters(["currentClickPayload"]),
  },
  methods: {
    ...mapActions(["setCurrentClickPayload", "setVerifyAction"]),
    deleteCard: function (payload) {
      this.setCurrentClickPayload(payload);
      let payload1 = {
        status: true,
        type: "DELETE_CARD",
        title: "Delete Card",
        des: "Are you sure you want to delete this card",
      };
      this.setVerifyAction(payload1);
    },
  },
};
</script>

<style></style>
