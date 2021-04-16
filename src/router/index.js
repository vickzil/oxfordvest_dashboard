import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Investment from "../views/Investment.vue";
import Transaction from "../views/Transaction.vue";
import Withdrawal from "../views/Withdrawal.vue";
import Deposit from "../views/Deposit.vue";
import Referral from "../views/Referral.vue";
import SingleReferral from "../views/SingleReferral.vue";
import SingleInvestment from "../views/SingleInvestment.vue";
import SingleCard from "../views/SingleCard.vue";
import Settings from "../views/Settings.vue";
import BankAccount from "../views/BankAccount.vue";
import RegisteredUsers from "../views/RegisteredUsers.vue";
import UserInvestment from "../views/UserInvestment.vue";
import UserManualInvestment from "../views/UserManualInvestment.vue";

import LandingPage from "../views/LandingPage";

import Login from "../views/Login";
import Register from "../views/Register";
import StaffRegister from "../views/StaffRegister";

import ForgotPassword from "../views/ForgotPassword";
import ThankYou from "../views/ThankYou";
import ConfirmLoginEmail from "../views/ConfirmLoginEmail";
import Verify from "../views/Verify";
import VerifyStatus from "../views/VerifyStatus";
import ResetPassword from "../views/ResetPassword";
import FourZeroFour from "../views/FourZeroFour";

Vue.use(VueRouter);

// store.getters["AuthStore/isAuthenticated"]

// store.dispatch('AuthStore/loadUser')

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
    meta: {
      title: "Welcome to Oxfordvest Dashboard",
      guest: true,
    },
  },

  {
    path: "/dashboard",
    name: "Home",
    component: Home,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Dasboard",
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/investment",
    name: "Investment",
    component: Investment,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Investment",
      requiresAuth: true,
    },
  },
  {
    path: "/transaction",
    name: "Transaction",
    component: Transaction,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Transaction",
      requiresAuth: true,
    },
  },
  {
    path: "/withdrawal",
    name: "Withdrawal",
    component: Withdrawal,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Withdrawal",
      requiresAuth: true,
    },
  },
  {
    path: "/deposit",
    name: "Deposit",
    component: Deposit,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Deposit",
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Settings",
      requiresAuth: true,
    },
  },
  {
    path: "/registered-users",
    name: "RegisteredUsers",
    component: RegisteredUsers,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Registered Users",
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: "/users-investment",
    name: "UserInvestment",
    component: UserInvestment,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Users Investment",
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: "/manual-registration",
    name: "UserManualInvestment",
    component: UserManualInvestment,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Users Investment",
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: "/bank-account",
    name: "BankAccount",
    component: BankAccount,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Bank Account",
      requiresAuth: true,
    },
  },
  {
    path: "/referral",
    name: "Referral",
    component: Referral,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Referral",
      requiresAuth: true,
    },
  },
  {
    path: "/referrals/:id",
    name: "SingleReferral",
    component: SingleReferral,
    props: true,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Your Referral",
      requiresAuth: true,
    },
  },
  {
    path: "/cards/:id",
    name: "SingleCard",
    component: SingleCard,
    props: true,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Your Card",
      requiresAuth: true,
    },
  },
  {
    path: "/investment-details/:id",
    name: "SingleInvestment",
    component: SingleInvestment,
    props: true,
    meta: {
      transition: "fade-in-down",
      title: "Oxfordvest - Your Investments",
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Oxfordvest - Login",
      guest: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Oxfordvest - Register",
      guest: true,
    },
  },
  {
    path: "/staff-register",
    name: "StaffRegister",
    component: StaffRegister,
    meta: {
      title: "Oxfordvest - Staff Register",
      guest: true,
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Oxfordvest - Forgot Password",
      guest: true,
    },
  },
  {
    path: "/thank-you",
    name: "ThankYou",
    component: ThankYou,
    meta: {
      title: "Oxfordvest - thank you for registering",
      guest: true,
    },
  },
  {
    path: "/confirm",
    name: "ConfirmLoginEmail",
    component: ConfirmLoginEmail,
    meta: {
      title: "Oxfordvest - Confirm E-mail",
      guest: true,
    },
  },
  {
    path: "/verify-status",
    name: "VerifyStatus",
    component: VerifyStatus,
    meta: {
      title: "Oxfordvest - Verification status",
      guest: true,
    },
  },
  {
    path: "/verify/:id",
    name: "Verify",
    component: Verify,
    props: true,
    meta: {
      title: "Oxfordvest - Verify",
      guest: true,
    },
  },
  {
    path: "/reset-password/:id",
    name: "ResetPassword",
    component: ResetPassword,
    props: true,
    meta: {
      title: "Oxfordvest - Reset Password",
      guest: true,
    },
  },

  {
    path: "*",
    name: "FourZeroFour",
    component: FourZeroFour,
    meta: {
      title: "Oxfordvest - 404 Page",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("appUserThemeSettingsCode");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  let userAdmin = sessionStorage.getItem("draggerability");
  if (to.matched.some((record) => record.meta.isAdmin)) {
    if (userAdmin) {
      next();
    } else {
      next("/dashboard");
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isLoggedIn) {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
