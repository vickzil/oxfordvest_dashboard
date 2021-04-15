<template>
  <div id="card" class="card center">
    <p class="cardtype">
      Rewards
      <img class="card_logo" src="http://vccard.ml/img/logo.png" />
    </p>
    <img class="card_chip" src="http://vccard.ml/img/chip.png" />
    <h3 class="card_number">8978-9993-8953-9870</h3>
    <p class="smallcardnumber">8978</p>
    <p class="card_expiry"><span>Valid Thru</span> 12/18</p>
    <img class="merchant_logo" src="http://vccard.ml/img/brand.png" />
    <p class="card_name">Anastázia Machata</p>
    <p class="smallcardnumber">16143941</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  width: 430px;
  height: 240px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.1) url("http://vccard.ml/img/1.jpeg") no-repeat
    center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: hidden;
  padding: 10px;
}

.cardtype {
  font-family: "Pacifico", sans-serif;
  font-size: 22px;
}
.card_logo {
  width: 60px;
  float: right;
  clear: both;
}

.card_chip {
  width: 55px;
  margin-top: 15px;
  margin-left: 20px;
}

.card_number {
  font-family: "Orbitron", sans-serif;
  margin-top: 12px;
  letter-spacing: 6px;
  text-align: center;
}

.smallcardnumber {
  font-size: 8px;
}

.card_expiry {
  font-size: 13px;
  margin-left: 50%;
  margin-top: 4%;
}

.card_expiry span {
  font-size: 8px;
}

.merchant_logo {
  width: 50px;
  float: right;
}

/*##Form Settings##*/

input::-webkit-input-placeholder {
  color: #fff !important;
}

input:-moz-placeholder {
  /* Firefox 18- */
  color: #fff !important;
}

input::-moz-placeholder {
  /* Firefox 19+ */
  color: #fff !important;
}

input:-ms-input-placeholder {
  color: #fff !important;
}

.form_settings {
  margin: 15px 0 0 0;
}
.form_settings p {
  padding: 0 0 4px 0;
}
.form_settings span {
  float: left;
  width: 25%;
  text-align: left;
}
.form_settings input,
.form_settings textarea {
  padding: 5px;
  width: 50%;
  height: 40px;
  border: 0px solid #000000;
  background: hsla(20, 10%, 10%, 0.6);
  color: #ffffff;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  font-family: "Exo", sans-serif;
  font-size: 17px;
}
.form_settings .submit {
  border: 1px solid;
  width: 99px;
  margin: 20px auto;
  height: 33px;
  padding: 2px 0 3px 0;
  cursor: pointer;
  background: hsla(20, 10%, 10%, 0.6);
  color: #ffffff;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.form_settings textarea {
  height: 290px;
  resize: vertical;
}

.form_settings textarea,
.form_settings select {
  width: 100%;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  font-family: "Cabin Condensed", sans-serif;
  box-shadow: 0px 3px 0px 0px #000000;
}
.form_settings select {
  width: 100%;
}
.form_settings .checkbox {
  margin: 4px 0;
  padding: 0;
  width: 14px;
  border: 0;
  background: none;
}
.container #footercont {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  font-size: 11px;
  text-align: right;
  padding: 15px 0 0 0;
  border-top: 1px dashed #ccc;
  text-shadow: 1px 1px 1px #fff;
  color: #888;
}
</style>
