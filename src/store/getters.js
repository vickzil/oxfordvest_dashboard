/* eslint-disable */
import router from "../router";

// PAGE LOADING STATUS
export const checkCurrentRoute = () => {
  return router.history.current.meta.requiresAuth;
};
export const getCurrentdate = () => {
  var d = new Date();
  var month = new Array();
  var date = d.getDate();
  var year = d.getFullYear();

  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sept";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  var m = month[d.getMonth()];

  let currentD = date + "-" + m + "-" + year;

  return currentD;
};

export const isLoggedIn = (state) => {
  return !!state.token;
  // return state.isUserLoggedIn;
};
export const isUserAdmin = (state) => {
  return !!state.isUserAdmin;
  // return state.isUserLoggedIn;
};

export const isAdmin = (state) => {
  let userRole = state.user.userInfo.user.roles;
  let adminRole;

  if (userRole) {
    adminRole = userRole.includes("admin");
  }
  return !!adminRole;
};

export const isAuthenticated = () => {
  let expiresAt = sessionStorage.getItem("appexrat");

  let date = new Date(expiresAt);

  let minusHour = date.setMinutes(date.getMinutes() - 60);
  let newExpiry = new Date().setMinutes(new Date().getMinutes());

  let newDate = newExpiry < minusHour;
  return !!newDate;
};

export const status = (state) => {
  return state.status;
};
export const authStatus = (state) => {
  return state.status;
};

export const isUserLoggedIn = (state) => {
  return state.isUserLoggedIn;
};

export const registrationInfo = (state) => {
  return state.registrationInfo;
};

export const isPageLoading = (state) => {
  return !!state.isPageLoading;
};

export const pageLoading = (state) => {
  return state.pageLoading;
};

export const modalLoading = (state) => {
  return state.modalLoading;
};

export const pageProcessing = (state) => {
  return state.pageProcessing;
};

export const actionProcessing = (state) => {
  return state.actionProcessing;
};

export const alertModalMessage = (state) => {
  return state.alertModalMessage;
};

export const alertModalType = (state) => {
  return state.alertModalType;
};

export const alertModalStatus = (state) => {
  return state.alertModalStatus;
};

export const alertStatus = (state) => {
  return state.alertStatus;
};
export const alertType = (state) => {
  return state.alertType;
};

export const alertMessage = (state) => {
  return state.alertMessage;
};

export const verifyStatus = (state) => {
  return state.verifyStatus;
};
export const verifyType = (state) => {
  return state.verifyType;
};
export const verifyMessageHeader = (state) => {
  return state.verifyMessageHeader;
};
export const verifyMessagedescription = (state) => {
  return state.verifyMessagedescription;
};

export const currentClickPayload = (state) => {
  return state.currentClickPayload;
};

export const profilePlaceholder = (state) => {
  return state.profilePlaceholder;
};

export const user = (state) => {
  return state.user;
};

export const userAmount = (state) => {
  return state.userAmount;
};

export const currentpayment = (state) => {
  return state.currentpayment;
};

export const countries = (state) => {
  return state.countries;
};
export const subsidiaries = (state) => {
  return state.subsidiaries;
};

export const logoutModal = (state) => {
  return state.logoutModal;
};

export const addWorkHistoryModal = (state) => {
  return state.addWorkHistoryModal;
};

export const addschoolHistoryModal = (state) => {
  return state.addschoolHistoryModal;
};

export const guarantorModal = (state) => {
  return state.guarantorModal;
};

export const addCertificationModal = (state) => {
  return state.addCertificationModal;
};

export const addGuarantorModal = (state) => {
  return state.addGuarantorModal;
};

export const addRefereeModal = (state) => {
  return state.addRefereeModal;
};

export const userBankDetails = (state) => {
  return state.userBankDetails;
};

export const addCardModal = (state) => {
  return state.addCardModal;
};

export const makePayment = (state) => {
  return state.makePayment;
};

export const fundWalletLoading = (state) => {
  return state.fundWalletLoading;
};

export const paymentOptionTitle = (state) => {
  return state.paymentOptionTitle;
};

export const selectPaymentOptionModal = (state) => {
  return state.selectPaymentOptionModal;
};

export const paymentOptions = (state) => {
  return state.paymentOptions;
};

export const userPaymentOptions = (state) => {
  return state.userPaymentOptions;
};

export const userPaymentFeeInfo = (state) => {
  return state.userPaymentFeeInfo;
};

export const bankTransferModal = (state) => {
  return state.bankTransferModal;
};

export const debitCreditCardModal = (state) => {
  return state.debitCreditCardModal;
};

export const uploadEvidienceModal = (state) => {
  return state.uploadEvidienceModal;
};

export const UploadEvidenceFormModal = (state) => {
  return state.UploadEvidenceFormModal;
};

export const addBvnModal = (state) => {
  return state.addBvnModal;
};

export const PaymentFormModal = (state) => {
  return state.PaymentFormModal;
};

export const clickedPaymentType = (state) => {
  return state.clickedPaymentType;
};

export const commingSoonModal = (state) => {
  return state.commingSoonModal;
};

export const currentSitePage = (state) => {
  return state.currentSitePage;
};

export const userId = (state) => {
  return state.userId;
};

export const AppId = (state) => {
  return state.AppId;
};

export const emailToken = (state) => {
  return state.emailToken;
};

export const emailConfirmModal = (state) => {
  return state.emailConfirmModal;
};

export const userExpireLoginTime = (state) => {
  return state.userExpireLoginTime;
};

export const registrationText = (state) => {
  return state.registrationText;
};

export const countryBankName = (state) => {
  return state.countryBankName;
};

export const RequestId = () => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

// INVESTMENT
export const investmentOptions = () => {
  let data = {
    chart: {
      type: "column",
    },
    title: {
      text: " Current Investment Growth",
    },
    xAxis: {
      type: "category",
      title: {
        text: "Investment rate",
      },
    },

    yAxis: {
      title: {
        text: "Investment growth",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> out of 20<br/>',
    },
    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        data: [
          {
            name: "Chrome",
            y: 62.74,
            drilldown: "Chrome",
          },
          {
            name: "Firefox",
            y: 10.57,
            drilldown: "Firefox",
          },
          {
            name: "Internet Explorer",
            y: 7.23,
            drilldown: "Internet Explorer",
          },
          {
            name: "Safari",
            y: 5.58,
            drilldown: "Safari",
          },
          {
            name: "Edge",
            y: 4.02,
            drilldown: "Edge",
          },
          {
            name: "Opera",
            y: 1.92,
            drilldown: "Opera",
          },
          {
            name: "Other",
            y: 7.62,
            drilldown: null,
          },
        ],
      },
    ],
    drilldown: {
      series: [
        {
          name: "Chrome",
          id: "Chrome",
          data: [
            ["v65.0", 0.1],
            ["v64.0", 1.3],
            ["v63.0", 53.02],
            ["v62.0", 1.4],
            ["v61.0", 0.88],
            ["v60.0", 0.56],
            ["v59.0", 0.45],
            ["v58.0", 0.49],
            ["v57.0", 0.32],
            ["v56.0", 0.29],
            ["v55.0", 0.79],
            ["v54.0", 0.18],
            ["v51.0", 0.13],
            ["v49.0", 2.16],
            ["v48.0", 0.13],
            ["v47.0", 0.11],
            ["v43.0", 0.17],
            ["v29.0", 0.26],
          ],
        },
        {
          name: "Firefox",
          id: "Firefox",
          data: [
            ["v58.0", 1.02],
            ["v57.0", 7.36],
            ["v56.0", 0.35],
            ["v55.0", 0.11],
            ["v54.0", 0.1],
            ["v52.0", 0.95],
            ["v51.0", 0.15],
            ["v50.0", 0.1],
            ["v48.0", 0.31],
            ["v47.0", 0.12],
          ],
        },
        {
          name: "Internet Explorer",
          id: "Internet Explorer",
          data: [
            ["v11.0", 6.2],
            ["v10.0", 0.29],
            ["v9.0", 0.27],
            ["v8.0", 0.47],
          ],
        },
        {
          name: "Safari",
          id: "Safari",
          data: [
            ["v11.0", 3.39],
            ["v10.1", 0.96],
            ["v10.0", 0.36],
            ["v9.1", 0.54],
            ["v9.0", 0.13],
            ["v5.1", 0.2],
          ],
        },
        {
          name: "Edge",
          id: "Edge",
          data: [
            ["v16", 2.6],
            ["v15", 0.92],
            ["v14", 0.4],
            ["v13", 0.1],
          ],
        },
        {
          name: "Opera",
          id: "Opera",
          data: [
            ["v50.0", 0.96],
            ["v49.0", 0.82],
            ["v12.1", 0.14],
          ],
        },
      ],
    },
  };

  return data;
};

export const calCulateInvestmentModal = (state) => {
  return state.calCulateInvestmentModal;
};

export const performInvestmentModal = (state) => {
  return state.performInvestmentModal;
};

export const currentInvestment = (state) => {
  return state.currentInvestment;
};

export const investmentCategoryText = (state) => {
  return state.investmentCategoryText;
};

export const investmentByCode = (state) => {
  return (investmentCode) => {
    return state.user.userInfo.userInvestmentInfo.userInvestments.find(
      (investment) => investment.code == investmentCode
    );
  };
};

// WIDTHRAWALS

export const withdrawFundModal = (state) => {
  return state.withdrawFundModal;
};

// REFERRALS

export const referralByCode = (state) => {
  return (referralcode) => {
    return state.user.userInfo.referrals.referralData.find(
      (referral) => referral.code == referralcode
    );
  };
};

// export const projectById = (state) => {
//     return (projectid) => {
//         return state.projects.find((project) => project.id == projectid);
//     };
// };
