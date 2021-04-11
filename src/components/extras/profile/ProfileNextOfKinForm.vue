<template>
  <div class="card">
    <div class="header">
      <h2>Next of Kin</h2>
    </div>
    <div class="body">
      <form v-on:submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="row clearfix">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="form-group c_form_group">
              <label>Full Name<span class="text-danger">*</span></label>
              <input
                type="text"
                class="form-control"
                placeholder="fullname"
                v-model.trim="fullName"
              />
            </div>
          </div>
        </div>
        <div class="row clearfix">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="form-group c_form_group">
              <label>Email<span class="text-danger">*</span></label>
              <input
                type="email"
                class="form-control"
                placeholder="Your email"
                v-model.trim="email"
              />
            </div>
          </div>
        </div>
        <div class="row clearfix">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="form-group c_form_group">
              <label>Phone Number <span class="text-danger">*</span></label>
              <input
                type="number"
                class="form-control"
                placeholder="Phone Number"
                v-model.trim="phoneNumber"
              />
            </div>
          </div>
        </div>
        <div class="row clearfix">
          <div class="col-lg-12 col-md-12 col-sm-12" v-if="registrationInfo">
            <div class="form-group c_form_group">
              <label class="form-label"
                >Gender <span class="text-danger">*</span></label
              >
              <select class="form-control show-tick" v-model.trim="gender">
                <option value="">Select Gender</option>
                <option
                  :value="gen.code"
                  v-for="gen in registrationInfo.gender"
                  :key="gen.code"
                >
                  <!-- :selected="
                    gen.name.toLowerCase() ==
                    user.userInfo.user.gender.toLowerCase()
                  " -->
                  {{ gen.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row clearfix">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="form-group c_form_group">
              <label class="form-label">Address</label>
              <textarea
                rows="4"
                style="min-height: 50px"
                class="form-control"
                v-model="homeAddress"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="row clearfix">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="form-group c_form_group">
              <label class="form-label"
                >Relationship <span class="text-danger">*</span></label
              >
              <select class="form-control show-tick">
                <option value="spouse">Spouse</option>
                <option value="parent">Parent</option>
                <option value="child">child</option>
                <option value="sibling">sibling</option>
                <option value="other">other</option>
              </select>
            </div>
          </div>
        </div>
        <br /><br />
        <div class="text-md-right text-sm-center">
          <button type="submit" class="btn btn-danger oxfordvest_button">
            Update next of kin
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "@/mixins";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["userAmount", "countries", "registrationInfo"]),

    checkGender() {
      return "male";
    },
    fullName: {
      get() {
        return this.user.userInfo.user.nextOfKinName == null
          ? ""
          : this.user.userInfo.user.nextOfKinName;
      },
      set(value) {
        return (this.user.userInfo.user.nextOfKinName = value);
      },
    },
    email: {
      get() {
        return this.user.userInfo.user.nextOfKinEmail == null
          ? ""
          : this.user.userInfo.user.nextOfKinEmail;
      },
      set(value) {
        return (this.user.userInfo.user.nextOfKinEmail = value);
      },
    },
    gender: {
      get() {
        return this.user.userInfo.user.nextOfKinGender == null
          ? ""
          : this.user.userInfo.user.nextOfKinGender;
      },
      set(value) {
        return (this.user.userInfo.user.nextOfKinGender = value);
      },
    },
    phoneNumber: {
      get() {
        return this.user.userInfo.user.nextOfKinPhoneNumber == null
          ? ""
          : this.user.userInfo.user.nextOfKinPhoneNumber;
      },
      set(value) {
        return (this.user.userInfo.user.nextOfKinPhoneNumber = value);
      },
    },
    homeAddress: {
      get() {
        return this.user.userInfo.user.nextOfKinAddress == null
          ? ""
          : this.user.userInfo.user.nextOfKinAddress;
      },
      set(value) {
        return (this.user.userInfo.user.nextOfKinAddress = value);
      },
    },
    relationship: {
      get() {
        return this.user.userInfo.user.nextOfKinRelationship == null
          ? ""
          : this.user.userInfo.user.nextOfKinRelationship;
      },
      set(value) {
        return (this.user.userInfo.user.nextOfKinRelationship = value);
      },
    },
  },

  methods: {
    ...mapActions(["setActionLoading", "fetchUserData", "setAlertModalStatus"]),

    submitForm: function () {
      this.setActionLoading(true);

      const url = `${this.hrmURL}/v1.0/User/updateUserNextOfKin`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.user.userInfo.user.code,
        FirstName: this.user.userInfo.user.FirstName,
        LastName: this.user.userInfo.user.LastName,
        MiddleName: this.user.userInfo.user.MiddleName,
        NextOfKinName: this.fullName,
        NextOfKinPhoneNumber: this.phoneNumber,
        NextOfKinEmail: this.email,
        NextOfKinAddress: this.homeAddress,
      };

      axios
        .post(url, data)
        .then((response) => {
          this.setActionLoading(false);

          let payload;

          if (response.data.success == true) {
            payload = {
              status: true,
              type: "success",
              message: "Next of Kin updated successfully!!",
            };

            let userCode = this.user.userInfo.user.code;
            this.fetchUserData(userCode);
          } else {
            payload = {
              status: true,
              type: "error",
              message: "Next of Kin not updated!!",
            };
          }

          this.setAlertModalStatus(payload);
        })
        .catch((err) => {
          err;
          this.serverErrorMessage();
        });
    },
  },
};
</script>

<style></style>
