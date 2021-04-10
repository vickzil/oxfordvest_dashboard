<template>
  <!-- Stiky note div  -->
  <div class="sticky-note">
    <a href="javascript:void(0);" class="right_note"
      ><i class="fa fa-close"></i
    ></a>
    <div class="form-group c_form_group">
      <label>Write your note here</label>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Enter here..." />
        <div class="input-group-append">
          <button class="btn btn-dark btn-sm" type="button">Add</button>
        </div>
      </div>
    </div>
    <div class="note-body">
      <div class="card note-item">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="font-10 text-muted">12 Apr 2020</span>
          </div>
          <div>
            <a href="javascript:void(0);" class="star"
              ><i class="fa fa-star-o"></i
            ></a>
            <a href="javascript:void(0);" class="delete"
              ><i class="fa fa-trash"></i
            ></a>
          </div>
        </div>
        <div class="note-detail">
          <span>Commit code on github branch development</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/mixins";
import $ from "jquery";

export default {
  computed: {
    userAmount() {
      return this.user.userWalletBalance.availableBalance;
    },
  },

  methods: {
    closeUserNav: function () {
      $(".user_div").removeClass("open");
    },
  },

  created() {
    if (document.querySelector(".page")) {
      var err = document.querySelector(".page");

      err.onclick = function () {
        err.classList.toggle("open");
      };
    }
  },
};
</script>
<style></style>
