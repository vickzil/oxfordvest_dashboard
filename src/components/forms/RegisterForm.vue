<template>
  <form
    class="form oxfordvest_foorm"
    style="position: relative"
    v-on:submit.prevent="register"
  >
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
    <CardLoading v-if="registrationInfo == null" />
    <div v-if="registrationInfo !== null">
      <div class="input_grid">
        <div>
          <label class="d-flex" style="text-align: left !important"
            >First Name <span class="text-danger ml-1">*</span></label
          >
          <input
            type="text"
            class="account_input"
            v-model.trim="firstname"
            @input="checkform"
            placeholder="First Name"
          />
        </div>
        <div>
          <label class="d-flex" style="text-align: left !important"
            >Last Name <span class="text-danger ml-1">*</span></label
          >
          <input
            type="text"
            class="account_input"
            v-model.trim="lastname"
            @input="checkform"
            placeholder="Last Name"
          />
        </div>
      </div>

      <div class="input_grid">
        <div>
          <label class="d-flex" style="text-align: left !important"
            >E-mail <span class="text-danger ml-1">*</span></label
          >
          <input
            type="email"
            v-model.trim="email"
            @input="checkform"
            class="account_input"
            placeholder="your email"
          />
        </div>
        <div>
          <label class="d-flex" style="text-align: left !important"
            >Phone <span class="text-danger ml-1">*</span></label
          >
          <input
            type="number"
            class="account_input"
            v-model="phone"
            @input="checkform"
            placeholder="Phone Number"
          />
        </div>
      </div>

      <div class="input_grid">
        <div>
          <label class="d-flex" style="text-align: left !important"
            >Date of Birth <span class="text-danger ml-1">*</span></label
          >
          <input
            type="date"
            v-model="dob"
            @input="checkform"
            class="account_input"
          />
        </div>
        <div>
          <label class="d-flex" style="text-align: left !important"
            >Country <span class="text-danger ml-1">*</span></label
          >
          <select
            class="account_input"
            v-model.trim="country"
            @change="checkform"
          >
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
      <!--
      <div class="input_grid">
        <div class="form-group">
          <label class="d-flex" style="text-align: left !important"
            >Group <span class="text-danger ml-1">*</span></label
          >
          <v-select
            :options="options"
            :reduce="(name) => name.code"
            label="name"
            class="select_input"
            @input="getSubsidiaries($event)"
            v-model="group"
          ></v-select>
        </div>
        <div class="form-group">
          <label class="d-flex" style="text-align: left !important"
            >Subsidiary <span class="text-danger ml-1">*</span></label
          >
          <v-select
            :options="subsidiaries"
            :reduce="(name) => name.code"
            label="name"
            class="select_input"
            v-model="subsidiary"
          ></v-select>
        </div>
      </div> -->

      <div class="input_grid">
        <div>
          <label style="text-align: left !important"
            >BVN
            <i
              class="fa fa-question-circle ml-2"
              style="cursor: pointer"
              @click="showInvestmentByOilvestInfo"
            ></i
          ></label>
          <input
            type="number"
            @input="checkform"
            v-model="bvn"
            class="account_input"
            placeholder="BVN"
          />

          <!-- <label class="d-flex" style="text-align: left !important"
            >Gender <span class="text-danger ml-1">*</span></label
          >
          <select
            class="account_input"
            v-model.trim="gender"
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
          </select> -->
        </div>
        <div>
          <label class="d-flex" style="text-align: left !important"
            >Password <span class="text-danger ml-1">*</span></label
          >
          <input
            class="account_input"
            :type="showpassword ? 'text' : 'password'"
            @input="checkform"
            v-model.trim="password"
            placeholder="your password"
          />
          <span
            toggle="#password-field"
            @click="toggleShowPassword"
            :class="showpassword && 'fa-eye-slash'"
            class="fa fa-fw fa-eye field-icon"
          ></span>
        </div>
      </div>
      <div>
        <label style="text-align: left !important">Account manager code</label>
        <input
          type="text"
          class="account_input"
          @input="checkform"
          v-model.trim="accMgtCode"
          placeholder="Account manager code"
          @blur="verifyManagerCode"
        />
      </div>
      <div class="mb-5" v-if="hasVerifiedManager">
        <ul class="list-group">
          <li class="list-group-item">
            <b class="mr-1">Account Manager Name:</b> {{ accountMangerName }}
          </li>
          <!-- <li class="list-group-item">
            <b class="mr-1">Email:</b> {{ accountMangerEmail }}
          </li>
          <li class="list-group-item">
            <b class="mr-1">Group:</b> {{ accountMangerGroup }}
          </li>
          <li class="list-group-item">
            <b class="mr-1">Subsidiary:</b> {{ accountMangerSub }}
          </li> -->
        </ul>
      </div>

      <div class="text-right">
        <button
          type="submit"
          class="btn-sm filled-button oxfordvest_button button_control nextButton"
          style="text-align: center"
          v-bind:disabled="emptyFields"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
    <p class="signupp text-center">
      Already have an account?
      <router-link to="/login" class="font-weight-bold"> Login </router-link>
    </p>
  </form>
</template>

<script>
import axios from "axios";
import "@/mixins";
import { mapGetters, mapActions } from "vuex";
// import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import CardLoading from "../loaders/CardLoading";
export default {
  components: {
    CardLoading,
    // vSelect,
  },
  computed: {
    ...mapGetters(["countries", "registrationInfo"]),
    options() {
      return this.registrationInfo.groupCompanies;
    },

    subsidiaries: {
      get() {
        return this.$store.getters.subsidiaries;
      },

      set(value) {
        return (this.$store.state.subsidiaries = value);
      },
    },
    accMgtCode: {
      get() {
        return this.$store.getters.accMgtCode;
      },

      set(value) {
        return (this.$store.state.accMgtCode = value);
      },
    },
  },
  data() {
    return {
      step: 0,
      loading: false,
      buttonText: "Submit",
      firstname: "",
      lastname: "",
      middlename: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
      gender: "",
      country: "",
      postalCode: "",
      group: "",
      subsidiary: "",
      // subsidiaries: [],
      dob: "",
      bvn: "",
      accountMangerName: "",
      accountMangerEmail: "",
      accountMangerGroup: "",
      accountMangerSub: "",
      terms: null,
      hasVerifiedManager: false,
      accountType: "staff",
      roleName: "staff",
      formError: false,
      emptyFields: true,
      formMessage: "",
      showpassword: false,
      status: false,
      response: null,
    };
  },

  methods: {
    ...mapActions([
      "setActionLoading",
      "setRegistrationText",
      "setAlertModalStatus",
    ]),
    getSubsidiaries: function (value) {
      // let value = event.target.value;
      // console.log(value);

      this.checkform();

      if (value == "002") {
        this.subsidiary = value;
      }

      if (value !== "") {
        this.subsidiaries = this.registrationInfo.groupSubsidiaries.filter(
          (Subsidiary) => {
            return Subsidiary.groupCode === value;
          }
        );
        // console.log(this.subsidiaries);
      }
    },
    toggleShowPassword: function () {
      this.showpassword = !this.showpassword;
    },

    showInvestmentByOilvestInfo: function () {
      let payload = {
        status: true,
        type: "success",
        message:
          "We need your BVN to verify your personal information. Your BVN does not give us access to your bank account or transactions.",
      };
      this.setAlertModalStatus(payload);
    },

    register: function () {
      if (this.formError == false && this.emptyFields == false) {
        this.submitForm();
        return true;
      } else {
        this.checkform();
      }
    },
    checkform: function () {
      if (
        !this.firstname ||
        !this.lastname ||
        !this.email ||
        !this.phone ||
        !this.dob ||
        !this.country ||
        !this.password
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
      if (this.password && this.password.length < 8) {
        this.emptyFields = true;
        this.formError = true;
        this.formMessage = "Passwords must be at least 8 characters.";
        return;
      }

      if (this.country == "NG" && !this.bvn) {
        this.emptyFields = true;
        this.formError = true;
        this.formMessage = "States in Nigeria must supply their BVN";
        return;
      }
      // if (this.group !== "002" && !this.subsidiary) {
      //   this.emptyFields = true;
      //   this.formError = true;
      //   this.formMessage = "Please select subsidiary";
      //   return;
      // }
      // if (this.group !== "002" && !this.accMgtCode) {
      //   this.emptyFields = true;
      //   this.formError = true;
      //   this.hasVerifiedManager = false;
      //   this.formMessage = "Account manager code is required!!";
      //   return;
      // }

      this.hasVerifiedManager = false;
      this.formError = false;
      this.formMessage = "";
      this.emptyFields = false;
      this.passwordError = false;
      this.formError = false;
      return true;
    },

    submitForm: function () {
      this.emptyFields = true;

      this.setActionLoading(true);

      const url = `${this.hrmURL}/v1.0/OAuth/register`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        PhoneNumber: this.phone,
        Country: this.country,
        DateOfBirth: this.dob.toLowerCase(),
        Password: this.password,
        ConfirmPassword: this.password,
        Email: this.email.toLowerCase(),
        AccountType: "staff",
        RoleName: "staff",
        FirstName: this.firstname.toLowerCase(),
        LastName: this.lastname.toLowerCase(),
        BVN: this.bvn,
        Name: this.RequestId,
        SubsidiaryCode: this.subsidiary,
        ReferredBy: this.accMgtCode,
      };

      // console.log(data);

      axios
        .post(url, data)
        .then((response) => {
          if (response.data.success) {
            // this.sendConfirmEmail(this.email.toLowerCase());
            sessionStorage.setItem("hasStatus", this.status);
            // this.formError = true;
            this.hasError = false;

            this.setRegistrationText(true);

            let payload;

            this.setActionLoading(false);

            setTimeout(() => {
              payload = {
                status: true,
                type: "success",
                message: "Registration Successfull",
              };
              this.setAlertModalStatus(payload);
            }, 200);

            setTimeout(() => {
              payload = {
                status: true,
                type: "success",
                message: "Redirecting, Please wait ...",
              };
              this.setAlertModalStatus(payload);
            }, 1500);

            setTimeout(() => {
              payload = {
                status: false,
                type: "",
                message: "",
              };

              this.setAlertModalStatus(payload);
              this.$router.push({ path: "/thank-you" });
            }, 3000);
          } else {
            let message = response.data.message;
            // this.formError = true;
            // this.hasError = true;
            this.emptyFields = true;

            this.setActionLoading(false);
            setTimeout(() => {
              let payload = {
                status: true,
                type: "error",
                message: message,
              };
              this.setAlertModalStatus(payload);
            }, 200);
          }
          this.processing = false;
          this.formText = "Register";
        })
        .catch((err) => {
          console.log(err);
          this.serverErrorMessage();
          this.formText = "Register";
        });
    },

    sendConfirmEmail: function (email) {
      const url = `${this.hrmURL}/v1.0/OAuth/generateEmailToken`;

      let data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: email,
      };

      axios
        .post(url, data)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => {
          console.log(err);
          //   this.serverErrorMessage();
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
              response.data.data.firstName + " " + response.data.data.lastName;
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

          // console.log(response.data);

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

  mounted() {
    if (this.$route.query.code) {
      this.accMgtCode = this.$route.query.code;

      setTimeout(() => {
        this.apiVerifyManagerCode();
      }, 2000);
    }
  },
};
</script>

<style></style>
