// TOGGLE WHATSAPP WIDGETS

export const AUTH_REQUEST = (state) => {
  state.status = "loading";
};

export const REGISTRATION_INFO = (state, data) => {
  state.registrationInfo = data;
};

export const SAVE_COUNTRY_BANK_NAMES = (state, data) => {
  // console.log(data)
  state.countryBankName = data;
};

export const SET_REGISTERED_USERS = (state, data) => {
  state.registeredUsers = data;
};

export const SET_USERS_INVESTMENTS = (state, data) => {
  state.UsersInvestments = data;
};

export const SET_SORTED_NUMBER = (state, data) => {
  if (data == "") {
    state.sortNumber = parseInt(state.registeredUsers.length, 10);
  } else {
    state.sortNumber = parseInt(data, 10);
  }
};

export const SAVE_USER_DATA = (state, data) => {
  state.user = data;
  state.isUserLoggedIn = true;
};

export const AUTH_SUCCESS = (state, data) => {
  state.status = "success";
  state.token = data.token.token;
  // state.user = data;
  state.isUserLoggedIn = true;
  // console.log(data)
};

export const SEND_LOGIN_DETAILS_TO_STATE = (state, data) => {
  state.loginToken = data.token;
  state.loginUserCode = data.code;
  state.loginUserExpiry = data.expiresAt;
};

export const AUTH_ERROR = (state) => {
  state.status = "error";
};

export const SHOW_ALERT = (state, payload) => {
  state.alertStatus = true;
  state.alertType = payload.type;
  state.alertMessage = payload.message;

  setTimeout(() => {
    state.alertStatus = false;
    state.alertType = "";
    state.alertMessage = "";
  }, 7000);
};

export const CLOSE_ALERT = (state) => {
  setTimeout(() => {
    state.alertStatus = false;
    state.alertType = "";
    state.alertMessage = "";
  }, 500);
};

export const SAVE_USER_ID = (state, id) => {
  state.userId = id;
};

export const SAVE_EMAIL_TOKEN = (state, token) => {
  state.userId = token;
};

export const SET_USER_EXPIRED_LOGIN_TIME = (state, time) => {
  state.userExpireLoginTime = time;
};

export const SET_REGISTRATION_TEXT = (state, status) => {
  state.registrationText = status;
};

export const SET_MAKE_PAYMENT = (state, status) => {
  state.makePayment = status;
};

export const SET_EMAIL_CONFIRM_MODAL = (state, status) => {
  state.emailConfirmModal = status;
};

export const LOGOUT = (state) => {
  state.status = "";
  state.token = "";
  state.isUserLoggedIn = false;
  // state.user = null;
  // state.userAmount = null;
  state.logoutModal = false;
  state.isPageLoading = false;
  state.user = null;
  state.loginToken = null;
  state.loginUserCode = null;
  state.loginUserExpiry = null;
  // state.appId = null;
  // state.userId = null;
  // state.emailToken = null;
  // state.notifications = []
};

export const SHOW_PAGE_LOADING = (state) => {
  state.pageLoading = true;
};

export const SHOW_PAGE_PROCESSING = (state) => {
  state.pageProcessing = true;
};

export const CLOSE_PAGE_PROCESSING = (state) => {
  state.pageProcessing = false;
};

export const SET_FUND_WALLET_LOADING = (state, payload) => {
  state.modalLoading = payload;
};

export const SAVE_USER_PAYMENT_OPTIONS = (state, payload) => {
  state.userPaymentOptions = payload;
};

export const SAVE_PAYMENT_FEE_INFO = (state, payload) => {
  state.userPaymentFeeInfo = payload;
};

export const PAYMENT_OPTIONS_BACK = (state) => {
  state.modalLoading = true;
  setTimeout(() => {
    if (state.bankTransferModal == true) {
      state.debitCreditCardModal = false;
      state.uploadEvidienceModal = false;
      state.bankTransferModal = false;
      state.PaymentFormModal = false;
      state.UploadEvidenceFormModal = false;
      state.modalLoading = false;
      state.paymentOptionTitle = "Select Payment Options";
      state.paymentOptions = true;

      return;
    }
    if (state.debitCreditCardModal == true) {
      state.debitCreditCardModal = false;
      state.uploadEvidienceModal = false;
      state.bankTransferModal = false;
      state.PaymentFormModal = false;
      state.UploadEvidenceFormModal = false;
      state.modalLoading = false;
      state.paymentOptionTitle = "Select Payment Options";
      state.paymentOptions = true;

      return;
    }
    if (state.uploadEvidienceModal == true) {
      state.debitCreditCardModal = false;
      state.uploadEvidienceModal = false;
      state.bankTransferModal = false;
      state.PaymentFormModal = false;
      state.UploadEvidenceFormModal = false;
      state.modalLoading = false;
      state.paymentOptionTitle = "Select Payment Options";
      state.paymentOptions = true;

      return;
    }
    if (state.UploadEvidenceFormModal == true) {
      state.debitCreditCardModal = false;
      state.uploadEvidienceModal = true;
      state.bankTransferModal = false;
      state.PaymentFormModal = false;
      state.UploadEvidenceFormModal = false;
      state.modalLoading = false;
      state.paymentOptionTitle = "Select Payment Options";
      state.paymentOptions = false;

      return;
    }
    if (state.PaymentFormModal == true) {
      state.debitCreditCardModal = true;
      state.uploadEvidienceModal = false;
      state.bankTransferModal = false;
      state.PaymentFormModal = false;
      state.UploadEvidenceFormModal = false;
      state.modalLoading = false;
      state.paymentOptionTitle = "Select Payment Options";
      state.paymentOptions = false;

      return;
    }
  }, 500);

  // if (state.bankTransferModal == true) {
  //     state.debitCreditCardModal = false;
  //     state.uploadEvidienceModal = false
  //     state.bankTransferModal = false;
  //     state.PaymentFormModal = false;
  //     state.UploadEvidenceFormModal = false;
  //     state.modalLoading = false;
  //     state.paymentOptionTitle = "Select Payment Options"
  //     state.paymentOptions = true;

  //     return

  // }
  // state.selectPaymentOptionModal = true;
  // state.debitCreditCardModal = false;
  // state.uploadEvidienceModal = false
  // state.bankTransferModal = false;
  // state.PaymentFormModal = false;
  // state.UploadEvidenceFormModal = false;
  // state.paymentOptions = true;
  // state.modalLoading = false;
  // state.paymentOptionTitle = "Select Payment Options"
};

export const SHOW_PAYMENT_OPTIONS = (state) => {
  state.selectPaymentOptionModal = true;
  state.debitCreditCardModal = false;
  state.uploadEvidienceModal = false;
  state.bankTransferModal = false;
  state.PaymentFormModal = false;
  state.UploadEvidenceFormModal = false;
  state.paymentOptions = true;
  state.modalLoading = false;
  state.paymentOptionTitle = "Select Payment Options";
};

export const CLOSE_PAYMENT_OPTIONS = (state) => {
  state.selectPaymentOptionModal = false;
  state.debitCreditCardModal = false;
  state.uploadEvidienceModal = false;
  state.bankTransferModal = false;
  state.PaymentFormModal = false;
  state.UploadEvidenceFormModal = false;
  state.paymentOptions = false;
  state.modalLoading = false;
};

export const SHOW_BANK_TRANSFER_MODAL = (state) => {
  state.debitCreditCardModal = false;
  state.uploadEvidienceModal = false;
  // state.bankTransferModal = false;
  state.PaymentFormModal = false;
  state.UploadEvidenceFormModal = false;

  state.modalLoading = true;

  setTimeout(() => {
    state.paymentOptionTitle = "Fund Wallet by Bank Transfer";
    state.modalLoading = false;
    state.paymentOptions = false;
    state.bankTransferModal = true;
    state.amount = 0;
    state.currency = "";
    state.processing = false;
    state.buttonText = "Proceed";
    state.emptyFields = true;
    state.inputError = false;
    state.formError = false;
    state.payWithPaystack = false;
    state.payWithRave = false;
    state.paymentForPaystackInfo = null;
    state.paymentForRaveInfo = null;
    state.errorMessage = "";
    state.showError = false;
  }, 1500);
};

export const CLOSE_BANK_TRANSFER_MODAL = (state) => {
  state.bankTransferModal = false;
};

export const SHOW_DEBIT_CREDIT_CARD_MODAL = (state) => {
  // state.debitCreditCardModal = false;
  state.uploadEvidienceModal = false;
  state.bankTransferModal = false;
  state.PaymentFormModal = false;
  state.UploadEvidenceFormModal = false;

  state.modalLoading = true;

  setTimeout(() => {
    state.paymentOptions = false;
    state.paymentOptionTitle = "Make Payment By Card";
    state.modalLoading = false;
    state.debitCreditCardModal = true;
    state.amount = 0;
    state.currency = "";
    state.processing = false;
    state.buttonText = "Proceed";
    state.emptyFields = true;
    state.inputError = false;
    state.formError = false;
    state.payWithPaystack = false;
    state.payWithRave = false;
    state.paymentForPaystackInfo = null;
    state.paymentForRaveInfo = null;
    state.errorMessage = "";
    state.showError = false;
  }, 1500);
};

export const CLOSE_DEBIT_CREDIT_CARD_MODAL = (state) => {
  // state.selectPaymentOptionModal = false
  state.debitCreditCardModal = false;

  state.amount = 0;
  state.currency = "";
  state.processing = false;
  state.buttonText = "Proceed";
  state.emptyFields = true;
  state.inputError = false;
  state.formError = false;
  state.payWithPaystack = false;
  state.payWithRave = false;
  state.paymentForPaystackInfo = null;
  state.paymentForRaveInfo = null;
  state.errorMessage = "";
  state.showError = false;
};

export const SHOW_UPLOAD_EVIDIENCE_MODAL = (state) => {
  state.debitCreditCardModal = false;
  // state.uploadEvidienceModal = false
  state.bankTransferModal = false;
  state.PaymentFormModal = false;
  state.UploadEvidenceFormModal = false;

  state.modalLoading = true;

  setTimeout(() => {
    state.paymentOptions = false;
    state.paymentOptionTitle = "Upload Transfer Evidence";
    state.modalLoading = false;
    state.uploadEvidienceModal = true;
    state.amount = 0;
    state.currency = "";
    state.processing = false;
    state.buttonText = "Proceed";
    state.emptyFields = true;
    state.inputError = false;
    state.formError = false;
    state.payWithPaystack = false;
    state.payWithRave = false;
    state.paymentForPaystackInfo = null;
    state.paymentForRaveInfo = null;
    state.errorMessage = "";
    state.showError = false;
  }, 1500);
};

export const CLOSE_UPLOAD_EVIDIENCE_MODAL = (state) => {
  state.selectPaymentOptionModal = false;
  state.uploadEvidienceModal = false;
};

export const SHOW_PAYMENT_FORM_MODAL = (state) => {
  state.uploadEvidienceModal = false;
  state.bankTransferModal = false;
  // state.PaymentFormModal = false;
  state.UploadEvidenceFormModal = false;
  state.paymentOptions = false;
  state.modalLoading = true;

  setTimeout(() => {
    state.debitCreditCardModal = false;
    state.paymentOptionTitle = "Fill Out this field";
    state.modalLoading = false;
    state.PaymentFormModal = true;
    state.amount = 0;
    state.currency = "";
    state.processing = false;
    state.buttonText = "Proceed";
    state.emptyFields = true;
    state.inputError = false;
    state.formError = false;
    state.payWithPaystack = false;
    state.payWithRave = false;
    state.paymentForPaystackInfo = null;
    state.paymentForRaveInfo = null;
    state.errorMessage = "";
    state.showError = false;
  }, 1500);
};

export const CLOSE_PAYMENT_FORM_MODAL = (state) => {
  state.debitCreditCardModal = false;
  state.PaymentFormModal = false;
};

export const SHOW_UPLOAD_EVIDIENCE_FORM_MODAL = (state) => {
  if (state.bankTransferModal == true) {
    state.uploadEvidienceModal = false;
  }

  if (state.uploadEvidienceModal == true) {
    state.bankTransferModal = false;
  }
  state.debitCreditCardModal = false;
  state.paymentOptions = false;

  state.PaymentFormModal = false;
  // state.UploadEvidenceFormModal = false;
  state.modalLoading = true;

  setTimeout(() => {
    state.bankTransferModal = false;
    state.uploadEvidienceModal = false;
    state.paymentOptionTitle = "Upload Payment Evidence";
    state.modalLoading = false;
    state.UploadEvidenceFormModal = true;
    state.amount = 0;
    state.currency = "";
    state.processing = false;
    state.buttonText = "Proceed";
    state.emptyFields = true;
    state.inputError = false;
    state.formError = false;
    state.payWithPaystack = false;
    state.payWithRave = false;
    state.paymentForPaystackInfo = null;
    state.paymentForRaveInfo = null;
    state.errorMessage = "";
    state.showError = false;
  }, 1500);
};

export const CLOSE_UPLOAD_EVIDIENCE_FORM_MODAL = (state) => {
  state.UploadEvidenceFormModal = false;
};

export const SET_ADD_MODAL = (state, status) => {
  state.addCardModal = status;
};

export const SET_BVN_MODAL = (state, status) => {
  state.bvnModal = status;
};

export const SET_TWO_FACTOR_MODAL = (state, status) => {
  state.twoFactorModal = status;
};

export const SET_PHISHING_MODAL = (state, status) => {
  state.phishingModal = status;
};

export const CLOSE_ALERT_MESSAGE = (state) => {
  state.isclosed = true;
};

export const SET_ALERT_MODAL_STATUS = (state, payload) => {
  setTimeout(() => {
    state.alertModalStatus = payload.status;
    state.alertModalType = payload.type;
    state.alertModalMessage = payload.message;
  }, 200);
};

export const SET_ACTION_LOADING = (state, payload) => {
  setTimeout(() => {
    state.actionProcessing = payload;
  }, 200);
};

export const SHOW_COMMING_SOON_MODAL = (state) => {
  state.commingSoonModal = true;
};

export const CLOSE_COMMING_SOON_MODAL = (state) => {
  state.commingSoonModal = false;
};

export const SHOW_LOGOUT_MODAL = (state) => {
  state.logoutModal = true;
};

export const CLOSE_LOGOUT_MODAL = (state) => {
  state.logoutModal = false;
};

export const SET_VERIFY_ACTION = (state, payload) => {
  state.verifyStatus = payload.status;
  state.verifyType = payload.type;
  state.verifyMessageHeader = payload.title;
  state.verifyMessagedescription = payload.des;
};

export const SET_CURRENT_CLICKED_PAYLOAD = (state, payload) => {
  state.currentClickPayload = payload;
};

export const SHOW_REFEREE_MODAL = (state) => {
  state.addRefereeModal = true;
};

export const CLOSE_REFEREE_MODAL = (state) => {
  state.addRefereeModal = false;
};

export const CLOSE_PAGE_LOADING = (state) => {
  setTimeout(() => {
    state.pageLoading = false;
    state.logoutModal = false;
  }, 800);
};

export const GET_COUNTRIES = (state, countries) => {
  state.countries = countries;
};

export const CURRENT_SITE_PAGE = (state, page) => {
  state.currentSitePage = page;
};

export const SET_CLICKED_PAYMENT_TYPE = (state, payload) => {
  state.clickedPaymentType = payload;
};

// INVESTMENT

export const SET_MODAL_LOADING = (state, payload) => {
  state.modalLoading = payload;
};

export const SET_CALCULATE_INVESTMENT_MODAL = (state, payload) => {
  state.calCulateInvestmentModal = payload;
};

export const STORE_CURRENT_INVESTMENT = (state, payload) => {
  state.currentInvestment = payload;
};

export const INVESTMENT_CATEGORY_TEXT = (state, payload) => {
  state.investmentCategoryText = payload;
};

export const SET_PERFORM_INVESTMENT_MODAL = (state, payload) => {
  state.performInvestmentModal = payload;
};

// WIDTHDRAWAL
export const SET_WITHDRAWAL_MODAL = (state, status) => {
  state.withdrawFundModal = status;
};
