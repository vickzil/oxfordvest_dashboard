<template>
  <span class="allModals">
    <PageProcessing />
    <SelectPaymentOption />
    <CalculateInvestmentModal />
    <PerformInvestmentModal />
    <WithdrawalModal />
    <AddCardModal />
    <TwoFactorModal />
    <PhishingModal />
    <AddBvn />
    <CommingSoon />
    <VerifyActionModal />
    <LogoutModal />
  </span>
</template>

<script>
import PageProcessing from "../loaders/PageProcessing";
import SelectPaymentOption from "./payments/SelectPaymentOption";
import CalculateInvestmentModal from "./investments/CalculateInvestmentModal";
import PerformInvestmentModal from "./investments/PerformInvestmentModal";
import WithdrawalModal from "./withdrawal/WithdrawalModal";
import AddCardModal from "./Banks/AddCardModal";
import TwoFactorModal from "./2factorModal/TwoFactorModal";
import PhishingModal from "./settings/PhishingModal";
import AddBvn from "./bvn/AddBvn";
import CommingSoon from "./comming-soon/CommingSoon";
import LogoutModal from "./LogoutModal";
import VerifyActionModal from "../loaders/VerifyActionModal";

export default {
  components: {
    PageProcessing,
    SelectPaymentOption,
    CalculateInvestmentModal,
    PerformInvestmentModal,
    WithdrawalModal,
    VerifyActionModal,
    AddCardModal,
    TwoFactorModal,
    PhishingModal,
    AddBvn,
    CommingSoon,
    LogoutModal,
  },
};
</script>

<style>
.allModals {
  z-index: 700000000000000000000000000000000000000000000000 !important;
}
</style>
