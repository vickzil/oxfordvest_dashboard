/* eslint-disable */
export default {
  // PROCESSING/LOADING
  pageLoading: true,
  pageProcessing: false,
  actionProcessing: false,
  isPageLoading: sessionStorage.getItem("appexrat"),
  fundWalletLoading: false,
  modalLoading: false,

  // MODALS
  logoutModal: false,
  addRefereeModal: false,
  selectPaymentOptionModal: false,
  bankTransferModal: false,
  debitCreditCardModal: false,
  uploadEvidienceModal: false,
  UploadEvidenceFormModal: false,
  addBvnModal: false,
  PaymentFormModal: false,
  commingSoonModal: false,
  calCulateInvestmentModal: false,
  performInvestmentModal: false,
  investNowModal: false,
  withdrawFundModal: false,

  // NOTIFICATIONS
  alertModalStatus: false,
  alertModalType: "",
  alertModalMessage: "",
  alertStatus: false,
  alertType: "",
  alertMessage: "",
  verifyStatus: false,
  verifyType: "",
  verifyMessageHeader: "",
  verifyMessagedescription: "",
  currentClickPayload: null,

  // AUTHS
  status: false,
  token: sessionStorage.getItem("appUserThemeSettingsCode") || "",
  isUserAdmin: sessionStorage.getItem("draggerability") || "",
  user: null,
  currentSitePage: "/",

  // GLOBAL PROPERTIES
  profilePlaceholder: null,
  userAmount: 520,
  makePayment: false,
  registrationText: false,
  countries: [],
  isUserLoggedIn: false,
  AppId: "001",
  RequestId: Math.floor(Math.random()),
  registrationInfo: null,
  subsidiaries: [],
  hrmURL: "http://api.oxfordvest.com/api",
  // hrmURL: "https://oxfordvest-api.conveyor.cloud/api",
  walletURL: "http://walletgateway.oxfordvest.com/api",
  // walletURL: "https://oxfordvest-api.conveyor.cloud/api",

  // PAYMENTS
  currentpayment: null,
  userPaymentOptions: null,
  clickedPaymentType: null,
  userBankDetails: null,
  emailConfirmModal: false,
  countryBankName: [],
  paymentOptions: true,
  paymentOptionTitle: "Select Payment Options",

  // WITHDRAW

  // INVESTMENTS
  currentInvestment: null,
  investmentCategoryText: "",

  // PAYMENT FORM FIELDS
  amount: 0,
  currency: "",
  processing: false,
  buttonText: "Proceed",
  emptyFields: true,
  inputError: false,
  formError: false,
  payWithPaystack: false,
  payWithRave: false,
  paymentForPaystackInfo: null,
  paymentForRaveInfo: null,
  errorMessage: "",
  showError: false,
};