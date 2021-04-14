<template>
  <div class="card">
    <div class="header">
      <h2><b>Basic Information</b></h2>
    </div>
    <div class="body">
      <form v-on:submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="row clearfix">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group c_form_group">
              <label>First Name<span class="text-danger">*</span></label>
              <input
                type="text"
                class="form-control"
                placeholder="First Name"
                v-model.trim="firstName"
              />
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group c_form_group">
              <label>Last Name<span class="text-danger">*</span></label>
              <input
                type="text"
                class="form-control"
                placeholder="Last Name"
                v-model.trim="lastName"
              />
            </div>
          </div>
        </div>
        <div class="row clearfix">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group c_form_group">
              <label>Middle Name<span class="text-danger">*</span></label>
              <input
                type="text"
                class="form-control"
                placeholder="Middle Name"
                v-model.trim="middleName"
              />
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group c_form_group disabled">
              <label>Email<span class="text-danger">*</span></label>
              <input
                type="email"
                class="form-control"
                disabled
                placeholder="Your email"
                v-model.trim="user.userInfo.user.email"
              />
            </div>
          </div>
        </div>
        <div class="row clearfix">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group c_form_group">
              <label>Phone Number <span class="text-danger">*</span></label>
              <input
                type="tel"
                class="form-control"
                placeholder="Phone Number"
                v-model.trim="phoneNumber"
              />
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group c_form_group">
              <label>Date of Birth <span class="text-danger">*</span></label>
              <input
                type="text"
                data-provide="datepicker"
                data-date-autoclose="true"
                class="form-control"
                placeholder="Select Date"
                v-model.trim="dateOfBirth"
              />
            </div>
          </div>
        </div>
        <div class="row clearfix">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group c_form_group">
              <label class="form-label"
                >Gender <span class="text-danger">*</span></label
              >
              <select class="form-control show-tick" v-model="gender">
                <option
                  :value="gen.code"
                  v-for="gen in registrationInfo.gender"
                  :key="gen.code"
                >
                  {{ gen.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="form-group c_form_group disabled">
              <label>Username </label>
              <input
                type="text"
                class="form-control"
                v-model.trim="userName"
                disabled
                placeholder="Username"
              />
            </div>
          </div>
        </div>
        <div class="row clearfix">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="form-group c_form_group">
              <label class="form-label">Address</label>
              <textarea
                rows="2"
                style="min-height: 50px"
                class="form-control"
                v-model="homeAddress"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="text-md-right text-sm-center">
          <button
            type="submit"
            class="btn btn-danger oxfordvest_button"
            :disabled="firstName == '' || lastName == '' || phoneNumber == ''"
          >
            Update Profile
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
    ...mapGetters([
      "userAmount",
      "countries",
      "registrationInfo",
      "profilePlaceholder",
    ]),
    userAmount() {
      return this.$store.getters.userAmount;
    },

    checkGender() {
      return "male";
    },
    firstName: {
      get() {
        return this.user.userInfo.user.firstName;
      },
      set(value) {
        return (this.user.userInfo.user.firstName = value);
      },
    },
    lastName: {
      get() {
        return this.user.userInfo.user.lastName;
      },
      set(value) {
        return (this.user.userInfo.user.lastName = value);
      },
    },
    middleName: {
      get() {
        return this.user.userInfo.user.middleName == "null"
          ? ""
          : this.user.userInfo.user.middleName;
      },
      set(value) {
        return (this.user.userInfo.user.middleName = value);
      },
    },
    userName: {
      get() {
        return this.user.userInfo.user.userName;
      },
      set(value) {
        return (this.user.userInfo.user.userName = value);
      },
    },
    dateOfBirth: {
      get() {
        return this.removeTimeZone(this.user.userInfo.user.dateOfBirth);
      },
      set(value) {
        return (this.user.userInfo.user.dateOfBirth = value);
      },
    },
    phoneNumber: {
      get() {
        return this.user.userInfo.user.phoneNumber;
      },
      set(value) {
        return (this.user.userInfo.user.phoneNumber = value);
      },
    },
    homeAddress: {
      get() {
        return this.user.userInfo.user.homeAddress == "null"
          ? ""
          : this.user.userInfo.user.homeAddress;
      },
      set(value) {
        return (this.user.userInfo.user.homeAddress = value);
      },
    },
    country: {
      get() {
        return this.user.userInfo.user.countryName;
      },
      set(value) {
        return (this.user.userInfo.user.countryName = value);
      },
    },
    countryCode: {
      get() {
        return this.user.userInfo.user.country;
      },
      set(value) {
        return (this.user.userInfo.user.country = value);
      },
    },
    subsidiaryCode: {
      get() {
        return this.user.userInfo.user.subsidiaryCode;
      },
      set(value) {
        return (this.user.userInfo.user.subsidiaryCode = value);
      },
    },
    gender: {
      get() {
        return this.user.userInfo.user.gender;
      },
      set(value) {
        return (this.user.userInfo.user.gender = value);
      },
    },
  },

  methods: {
    ...mapActions(["setActionLoading", "fetchUserData", "setAlertModalStatus"]),
    changeProfileImage: function (event) {
      if (event.target.files[0]) {
        this.photo = event.target.files[0];
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

    submitForm: function () {
      this.setActionLoading(true);

      const url = `${this.hrmURL}/v1.0/User/updateUserInfo`;
      var fd = new FormData();

      fd.append("AppId", this.AppId);
      fd.append("RequestId", this.RequestId);
      fd.append("Email", this.user.userInfo.user.email);
      fd.append("UserCode", this.user.userInfo.user.code);
      fd.append("BVN", this.user.userInfo.user.bvn);
      fd.append("HomeAddress", this.homeAddress);
      fd.append("PhoneNumber", this.phoneNumber);
      fd.append("SubsidiaryCode", this.subsidiaryCode);
      fd.append("Country", this.countryCode);
      fd.append("DateOfBirth", this.dateOfBirth);
      fd.append("FirstName", this.firstName);
      fd.append("LastName", this.lastName);
      fd.append("MiddleName", this.middleName);
      fd.append("PhotoFile", this.profilePlaceholder);

      // console.log(this.profilePlaceholder);

      axios
        .post(url, fd)
        .then((response) => {
          this.setActionLoading(false);

          let payload;

          if (response.data.success == true) {
            payload = {
              status: true,
              type: "success",
              message: "Profile updated successfully!!",
            };
            // let userCode = sessionStorage.getItem("activeformations");
            // this.fetchUserData(userCode);
          } else {
            payload = {
              status: true,
              type: "error",
              message: response.data.message,
            };
          }

          let userCode = this.user.userInfo.user.code;
          this.fetchUserData(userCode);

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
