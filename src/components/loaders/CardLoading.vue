<template>
  <div class="cardLaoding">
    <div class="container-fluid text-center mt-5 mb-5">
      <div
        class="spinner-border text-danger mt-5"
        style="width: 2rem; height: 2rem"
        role="status"
      ></div>
      <h3 class="mt-3" id="createSiteLoadingText" style="font-size: 14px">
        please wait...
      </h3>
    </div>
  </div>
</template>

<script>
import "@/mixins";

export default {};
</script>
<style scoped>
.cardLaoding {
  position: absolute !important;
  top: 10px !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden !important;
  z-index: 10;
}
</style>
