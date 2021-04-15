<template>
  <div>
    <div class="card profile-header">
      <div class="body text-center">
        <div class="mb-4">
          <p class="font-15 font-weight-bold">Change Profile Picture</p>
        </div>
        <input
          type="file"
          ref="profile_input"
          style="display: none"
          @change="changeProfileImage($event)"
        />
        <img
          v-if="user.userInfo.user.photo"
          :src="user.userInfo.user.photo"
          class="rounded-circle profile_image"
          style="
            cursor: pointer;
            width: 140px;
            height: 140px;
            border: 2px dotted #ff828c;
            padding: 8px;
          "
          @click="$refs.profile_input.click()"
        />
        <div class="mt-3">
          <h5 class="mb-0">
            <span style="text-transform: capitalize">
              {{ user.userInfo.user.firstName }}
              <span v-if="user.userInfo.user.middleName !== 'null'">{{
                user.userInfo.user.middleName
              }}</span>
              {{ user.userInfo.user.lastName }}
            </span>
          </h5>
          <span
            ><small class="badge badge-success">{{
              user.userInfo.user.code
            }}</small></span
          >
        </div>
      </div>
    </div>
    <div class="card">
      <div class="header">
        <h2>About Me</h2>
      </div>
      <div class="body">
        <small class="text-muted">Email address: </small>
        <p v-if="user.userInfo.user.email">{{ user.userInfo.user.email }}</p>
        <br />
        <small class="text-muted">Mobile: </small>
        <p v-if="user">{{ user.userInfo.user.phoneNumber }}</p>
        <br />
        <small class="text-muted">Address: </small>
        <p v-if="user.userInfo.user.homeAddress !== 'null'">
          {{ user.userInfo.user.homeAddress }}
        </p>
        <p v-else class="text-secondary">None</p>
        <br />
        <small class="text-muted">Date of Birthday: </small>
        <p v-if="user">{{ removeTimeZone(user.userInfo.user.dateOfBirth) }}</p>
        <br />
        <small class="text-muted">BVN: </small>
        <p v-if="user.userInfo.user.bvn !== 'null'">
          <!-- {{ user.userInfo.user.bvn }} -->
          {{ getHiddenBvn }}
        </p>
        <p v-else class="text-secondary">None</p>
      </div>
    </div>
  </div>
</template>

<script>
import "@/mixins";

export default {
  computed: {
    getHiddenBvn() {
      let initialBVn = this.user.userInfo.user.bvn;
      let firstThreeWord = initialBVn.slice(0, 3);
      let LastThreeWord = initialBVn.slice(initialBVn.length - 3);

      return firstThreeWord + "******" + LastThreeWord;
    },
  },
  methods: {
    changeProfileImage: function (event) {
      if (event.target.files[0]) {
        this.$store.state.profilePlaceholder = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function (event) {
          let images = document.querySelectorAll(".profile_image");

          images.forEach((image) => {
            image.setAttribute("src", event.target.result);
          });
        };

        reader.readAsDataURL(event.target.files[0]);
      }
    },
  },
};
</script>

<style></style>
