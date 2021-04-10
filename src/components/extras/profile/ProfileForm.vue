<template>
  <div>
    <div class="oxfordvest_tabs">
      <br />
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#Basic">General</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#AccountManager"
            >Account Manager</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#NextOfKin"
            >Next Of Kin</a
          >
        </li>
      </ul>
    </div>

    <div class="tab-content padding-0" v-if="user">
      <div class="tab-pane active" id="Basic">
        <ProfileBasicInfoForm />
      </div>
      <div class="tab-pane" id="AccountManager">
        <ProfileAccountManagerForm />
      </div>
      <div class="tab-pane" id="NextOfKin">
        <ProfileNextOfKinForm />
      </div>
    </div>
  </div>
</template>

<script>
import "@/mixins";
import ProfileBasicInfoForm from "./ProfileBasicInfoForm";
import ProfileAccountManagerForm from "./ProfileAccountManagerForm";
import ProfileNextOfKinForm from "./ProfileNextOfKinForm";
export default {
  components: {
    ProfileBasicInfoForm,
    ProfileAccountManagerForm,
    ProfileNextOfKinForm,
  },
};
</script>

<style></style>
