<template>
  <div class="row clearfix">
    <div class="col-lg-12 col-md-12">
      <div class="card">
        <div class="body">
          <div class="row clearfix">
            <div class="col-md-12">
              <div class="row clearfix">
                <div class="col-md-6 col-sm-12">
                  <div class="h6">Referral Code</div>
                  <div class="card_copy" @click="copyCode">
                    <i class="fa fa-clone mr-1"></i>
                    <span v-if="!copied">
                      <span class="mr-1">Tap to copy-</span>
                      <span class="h6">{{ user.userInfo.user.code }}</span>
                    </span>
                    <span v-if="copied">
                      <transition name="fade">
                        <span class="mr-1">Copied</span>
                        >
                      </transition>
                    </span>
                  </div>

                  <div class="mt-4 copt_div">
                    <div class="h6">Referral Link</div>
                    <form class="mb-3">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control referral_link"
                          :value="referrals.link"
                        />
                        <div
                          class="input-group-append"
                          @click="copyReferralLink"
                        >
                          <span class="input-group-text" id="search-mail">
                            <i class="fa fa-clone" v-if="!linkCopied"></i>
                            <i class="fa fa-check" v-else></i>
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div>Total Sign ups</div>
                  <h3 class="mb-1 ml-2">{{ referrals.noOfReferrals }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/mixins";
export default {
  computed: {
    referrals() {
      return this.user.userInfo.referrals;
    },
  },
  data() {
    return {
      copied: false,
      linkCopied: false,
    };
  },

  methods: {
    copyCode: function () {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);

      var input = document.createElement("input");
      input.setAttribute("value", this.user.userInfo.user.code);
      document.body.appendChild(input);
      input.select();
      var result = document.execCommand("copy");
      document.body.removeChild(input);
      return result;
    },
    copyReferralLink: function () {
      this.linkCopied = true;
      setTimeout(() => {
        var copyText = document.querySelector(".referral_link");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        this.linkCopied = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>
/* .copt_div {
  display: grid;
  grid-template-columns: 1fr;
  align-content: flex-end;
} */
form {
  width: 240px !important;
  /* margin-right: auto;
  text-align: right; */
}

.input-group-append {
  cursor: pointer;
  transition: all 300ms ease-in-out;
}
.input-group-append:hover {
  background: rgb(243, 243, 243);
}

.ref_p {
  width: 78%;
}

@media screen and (max-width: 767px) {
  form {
    float: none !important;
  }
  .copt_div {
    text-align: left;
  }

  .ref_p {
    width: 98%;
  }
}
</style>
