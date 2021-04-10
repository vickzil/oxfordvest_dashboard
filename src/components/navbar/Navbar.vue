/* eslint-disable */ /*eslint no-unused-vars: ["error", {"ards": "none"}]*/
<template>
  <!--###################### NAVBAR ##################### -->
  <span class="all_navs">
    <!-- <PageLoadingOverlay /> -->
    <HeaderTop />
    <LeftSideBar />
    <RightSideBar />
    <StickyNotes />
  </span>
</template>

<script>
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import StickyNotes from "./StickyNotes";
import HeaderTop from "./HeaderTop";
// import PageLoadingOverlay from "../loaders/PageLoadingOverlay";

export default {
  name: "Navbar",
  components: {
    LeftSideBar,
    RightSideBar,
    StickyNotes,
    HeaderTop,
    // PageLoadingOverlay,
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25 ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.all_navs {
  z-index: 4000 !important;
}
</style>
