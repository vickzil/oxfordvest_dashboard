<template>
  <div class="card">
    <div class="header">
      <h2>Manual Registration</h2>
    </div>
    <div class="body">
      <transition name="fade">
        <p
          v-if="formError"
          style="
            color: red !important;
            font-size: 13px !important;
            margin-top: 4px;
            text-align: center;
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 20 20"
            svg-inline=""
            role="presentation"
            focusable="false"
            tabindex="-1"
            style="color: red !important"
            fill="red"
          >
            <path
              d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"
            ></path>
          </svg>
          {{ formMessage }}
        </p>
      </transition>
      <br /><br />
      <div class="row clearfix">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group c_form_group">
            <label>First Name<span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              placeholder="First Name"
              @input="checkform"
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
              @input="checkform"
              v-model.trim="lastName"
            />
          </div>
        </div>
      </div>
      <div class="row clearfix">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group c_form_group">
            <label>Middle Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Middle Name"
              @input="checkform"
              v-model.trim="middleName"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group c_form_group">
            <label>Email<span class="text-danger">*</span></label>
            <input
              type="email"
              class="form-control"
              placeholder="Your email"
              v-model.trim="email"
              @input="checkform"
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
              @input="checkform"
              v-model.trim="phoneNumber"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group c_form_group">
            <label>Date of Birth <span class="text-danger">*</span></label>
            <input
              type="date"
              class="form-control"
              placeholder="Select Date"
              v-model="dateOfBirth"
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
            <select
              class="form-control show-tick"
              v-model="gender"
              @change="checkform"
            >
              <option value="">Select Gender</option>
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
          <div class="form-group c_form_group">
            <label>Country <span class="text-danger">*</span> </label>
            <select class="form-control" v-model="country" @change="checkform">
              <option value="">Select Country</option>
              <option
                :value="country.code"
                v-for="country in registrationInfo.countries"
                :key="country.code"
              >
                {{ country.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row clearfix">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group c_form_group">
            <label>Group <span class="text-danger">*</span> </label>
            <v-select
              :options="options"
              :reduce="(name) => name.code"
              label="name"
              class="select_input"
              @input="getSubsidiaries($event)"
              v-model="group"
            ></v-select>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group c_form_group">
            <label>Subsidiary <span class="text-danger">*</span> </label>
            <v-select
              :options="subsidiaries"
              :reduce="(name) => name.code"
              label="name"
              class="select_input"
              v-model="subsidiary"
            ></v-select>
          </div>
        </div>
      </div>
      <div class="row clearfix">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group">
            <label>Account manager code</label>
            <input
              type="text"
              class="form-control"
              @input="checkform"
              v-model="accMgtCode"
              autocomplete="false"
              @blur="verifyManagerCode"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="form-group">
            <label>Bvn</label>
            <input
              type="text"
              class="form-control"
              @input="checkform"
              v-model="bvn"
              placeholder="Bvn"
            />
          </div>
        </div>

        <div class="col-lg-12">
          <div class="mb-5" v-if="hasVerifiedManager">
            <ul class="list-group">
              <li class="list-group-item">
                <b class="mr-1">Fullname:</b> {{ accountMangerName }}
              </li>
              <li class="list-group-item">
                <b class="mr-1">Email:</b> {{ accountMangerEmail }}
              </li>
              <li class="list-group-item">
                <b class="mr-1">Group:</b> {{ accountMangerGroup }}
              </li>
              <li class="list-group-item">
                <b class="mr-1">Subsidiary:</b> {{ accountMangerSub }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- <div class="text-md-right text-sm-center">
          <button
            type="submit"
            class="btn btn-danger oxfordvest_button"
            :disabled="firstName == '' || lastName == '' || phoneNumber == ''"
          >
            Update Profile
          </button>
        </div> -->
    </div>
  </div>
</template>

<script>
import "@/mixins";
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    vSelect,
  },
  computed: {
    ...mapGetters(["countries", "registrationInfo", "manualUserReg"]),

    firstName: {
      get() {
        return this.manualUserReg.userFirstName;
      },
      set(value) {
        return (this.manualUserReg.userFirstName = value);
      },
    },
    lastName: {
      get() {
        return this.manualUserReg.userLastName;
      },
      set(value) {
        return (this.manualUserReg.userLastName = value);
      },
    },
    middleName: {
      get() {
        return this.manualUserReg.userMiddleName;
      },
      set(value) {
        return (this.manualUserReg.userMiddleName = value);
      },
    },
    email: {
      get() {
        return this.manualUserReg.userEmail;
      },
      set(value) {
        return (this.manualUserReg.userEmail = value);
      },
    },
    userName: {
      get() {
        return this.manualUserReg.userName;
      },
      set(value) {
        return (this.manualUserReg.userName = value);
      },
    },
    dateOfBirth: {
      get() {
        return this.manualUserReg.userDob;
      },
      set(value) {
        return (this.manualUserReg.userDob = value);
      },
    },
    phoneNumber: {
      get() {
        return this.manualUserReg.userPhone;
      },
      set(value) {
        return (this.manualUserReg.userPhone = value);
      },
    },
    homeAddress: {
      get() {
        return this.manualUserReg.userAddress;
      },
      set(value) {
        return (this.manualUserReg.homeAddress = value);
      },
    },
    country: {
      get() {
        return this.manualUserReg.userCountry;
      },
      set(value) {
        return (this.manualUserReg.userCountry = value);
      },
    },
    group: {
      get() {
        return this.manualUserReg.userGroups;
      },
      set(value) {
        return (this.manualUserReg.userGroups = value);
      },
    },
    subsidiary: {
      get() {
        return this.manualUserReg.userSubsidaiary;
      },
      set(value) {
        return (this.manualUserReg.userSubsidaiary = value);
      },
    },
    bvn: {
      get() {
        return this.manualUserReg.userBvn;
      },
      set(value) {
        return (this.manualUserReg.userBvn = value);
      },
    },
    gender: {
      get() {
        return this.manualUserReg.userGender;
      },
      set(value) {
        return (this.manualUserReg.userGender = value);
      },
    },
    accMgtCode: {
      get() {
        return this.manualUserReg.userAcctMgtCode == "null"
          ? ""
          : this.manualUserReg.userAcctMgtCode;
      },
      set(value) {
        return (this.manualUserReg.userAcctMgtCode = value);
      },
    },
    password: {
      get() {
        return this.manualUserReg.userPassword;
      },
      set(value) {
        return (this.manualUserReg.userPassword = value);
      },
    },
    hasVerifiedManager: {
      get() {
        return this.manualUserReg.hasVerifiedManager;
      },
      set(value) {
        return (this.manualUserReg.hasVerifiedManager = value);
      },
    },
    emptyFields: {
      get() {
        return this.manualUserReg.emptyFields;
      },
      set(value) {
        return (this.manualUserReg.emptyFields = value);
      },
    },
    formError: {
      get() {
        return this.manualUserReg.formError;
      },
      set(value) {
        return (this.manualUserReg.formError = value);
      },
    },
    options() {
      return this.registrationInfo.groupCompanies;
    },
  },

  data() {
    return {
      subsidiaries: [],
      accountMangerName: "",
      accountMangerEmail: "",
      accountMangerGroup: "",
      accountMangerSub: "",
      terms: null,
      accountType: "staff",
      roleName: "staff",
      formMessage: "",
      showpassword: false,
      status: false,
      response: null,
    };
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

    getSubsidiaries: function (value) {
      //   this.checkform();

      if (value == "002") {
        this.subsidiary = value;
      }

      if (value !== "") {
        this.subsidiaries = this.registrationInfo.groupSubsidiaries.filter(
          (Subsidiary) => {
            return Subsidiary.groupCode === value;
          }
        );
      }
    },
    toggleShowPassword: function () {
      this.showpassword = !this.showpassword;
    },

    checkform: function () {
      if (
        this.firstname == "" ||
        this.lastname == "" ||
        this.email == "" ||
        this.country == ""
      ) {
        this.formError = true;
        this.formMessage = "Please fill out required fields";
        this.emptyFields = true;
        return false;
      }

      if (!this.validEmail(this.email)) {
        this.emptyFields = true;
        this.formError = true;
        this.formMessage = "Invalid Email address";
        return;
      }

      if (this.country == "NG" && !this.bvn) {
        this.emptyFields = true;
        this.formError = true;
        this.formMessage = "States in Nigeria must supply their BVN";
        return;
      }
      if (this.group !== "002" && !this.subsidiary) {
        this.emptyFields = true;
        this.formError = true;
        this.formMessage = "Please select subsidiary";
        return;
      }
      if (this.group !== "002" && !this.accMgtCode) {
        this.emptyFields = true;
        this.formError = true;
        this.hasVerifiedManager = false;
        this.formMessage = "Account manager code is required!!";
        return;
      }

      this.hasVerifiedManager = false;
      this.formError = false;
      this.formMessage = "";
      this.emptyFields = false;
      this.passwordError = false;
      this.formError = false;
      return true;
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

    verifyManagerCode: function () {
      // this.hasVerifiedManager = false;
      if (!this.hasVerifiedManager) {
        if (this.accMgtCode !== "") {
          this.apiVerifyManagerCode();
        } else {
          return;
        }
      }
    },
    apiVerifyManagerCode: function () {
      this.$store.dispatch("setActionLoading", true);
      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.accMgtCode,
      };

      const url = `${this.hrmURL}/v1.0/User/getUserInfo`;

      axios
        .post(url, data)
        .then((response) => {
          if (response.data.success) {
            this.hasVerifiedManager = true;
            this.accountMangerName =
              response.data.data.firstName + "" + response.data.data.lastName;
            this.accountMangerEmail = response.data.data.email;
            this.accountMangerGroup = response.data.data.groupName;
            this.accountMangerSub = response.data.data.subsidiaryName;
          } else {
            this.hasVerifiedManager = false;
            let payload = {
              status: true,
              type: "error",
              message: response.data.message,
            };

            this.accountMangerName = "";
            this.accountMangerEmail = "";
            this.accountMangerGroup = "";
            this.accountMangerSub = "";
            this.accMgtCode = "";

            this.$store.dispatch("setAlertModalStatus", payload);
          }

          this.$store.dispatch("setActionLoading", false);
        })
        .catch((err) => {
          console.log(err);
          this.accMgtCode = "";
          this.hasVerifiedManager = false;
          this.$store.dispatch("setActionLoading", false);
          this.serverErrorMessage();
        });
    },
  },
};
</script>

<style scoped>
.field-icon {
  margin-top: -29px;
}
</style>
