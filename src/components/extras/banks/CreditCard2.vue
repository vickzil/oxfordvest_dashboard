<template>
  <router-link
    class="creditcard"
    :to="{ name: 'SingleCard', query: { code: searchBank.code } }"
  >
    <div class="front">
      <div id="ccsingle"></div>
      <svg
        version="1.1"
        id="cardfront"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 750 471"
        style="enable-background: new 0 0 750 471"
        xml:space="preserve"
      >
        <g id="Front">
          <g id="CardBackground">
            <g id="Page-1_1_">
              <g id="amex_1_">
                <path
                  id="Rectangle-1_1_"
                  class="lightcolor grey"
                  d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                            C0,17.9,17.9,0,40,0z"
                />
              </g>
            </g>
            <path
              class="darkcolor greydark"
              d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z"
            />
          </g>
          <text
            transform="matrix(1 0 0 1 60.106 295.0121)"
            id="svgnumber"
            class="st3 st4 grey"
          >
            **** **** **** {{ searchBank.cardLast4 }}
          </text>
          <text
            transform="matrix(1 0 0 1 54.1064 428.1723)"
            id="svgname"
            class="st5 st6 grey"
          >
            {{ searchBank.cardFirstName }} {{ searchBank.cardLastName }}
          </text>
          <text
            transform="matrix(1 0 0 1 54.1074 389.8793)"
            class="st7 st5 st8 grey"
          >
            cardholder name
          </text>
          <text
            transform="matrix(1 0 0 1 479.7754 388.8793)"
            class="st7 st5 st8 grey"
          >
            expiration
          </text>
          <text
            transform="matrix(1 0 0 1 65.1054 241.5)"
            class="st7 st5 st8 grey"
          >
            card number
          </text>
          <g>
            <text
              transform="matrix(1 0 0 1 574.4219 433.8095)"
              id="svgexpire"
              class="st2 st5 st9 grey"
            >
              {{ searchBank.cardExpireMonth }}/{{
                searchBank.cardExpireYear.substr(
                  searchBank.cardExpireYear.length - 2
                )
              }}
            </text>
            <text
              transform="matrix(1 0 0 1 479.3848 417.0097)"
              class="st2 st10 st11 grey"
            >
              VALID
            </text>
            <text
              transform="matrix(1 0 0 1 479.3848 435.6762)"
              class="st2 st10 st11 grey"
            >
              THRU
            </text>
            <polygon class="st2" points="554.5,421 540.4,414.2 540.4,427.9 		" />
          </g>
          <g id="cchip">
            <g>
              <path
                class="st2"
                d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3
                        c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z"
              />
            </g>
            <g>
              <g>
                <rect x="82" y="70" class="st12" width="1.5" height="60" />
              </g>
              <g>
                <rect x="167.4" y="70" class="st12" width="1.5" height="60" />
              </g>
              <g>
                <path
                  class="st12"
                  d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3
                            c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3
                            C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5
                            c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5
                            c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z"
                />
              </g>
              <g>
                <rect
                  x="82.8"
                  y="82.1"
                  class="st12"
                  width="25.8"
                  height="1.5"
                />
              </g>
              <g>
                <rect
                  x="82.8"
                  y="117.9"
                  class="st12"
                  width="26.1"
                  height="1.5"
                />
              </g>
              <g>
                <rect
                  x="142.4"
                  y="82.1"
                  class="st12"
                  width="25.8"
                  height="1.5"
                />
              </g>
              <g>
                <rect
                  x="142"
                  y="117.9"
                  class="st12"
                  width="26.2"
                  height="1.5"
                />
              </g>
            </g>
          </g>
        </g>
        <g id="Back"></g>
      </svg>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["searchBank", "index"],
};
</script>

<style scoped>
.payment-title {
  width: 100%;
  text-align: center;
}

.form-container .field-container:first-of-type {
  grid-area: name;
}

.form-container .field-container:nth-of-type(2) {
  grid-area: number;
}

.form-container .field-container:nth-of-type(3) {
  grid-area: expiration;
}

.form-container .field-container:nth-of-type(4) {
  grid-area: security;
}

.field-container input {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.field-container {
  position: relative;
}

.form-container {
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: auto auto;
  grid-template-rows: 90px 90px 90px;
  grid-template-areas: "name name" "number number" "expiration security";
  max-width: 400px;
  padding: 20px;
  color: #d37d7d;
}

label {
  padding-bottom: 5px;
  font-size: 13px;
}

input {
  margin-top: 3px;
  padding: 15px;
  font-size: 16px;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #dcdcdc;
}

.ccicon {
  height: 38px;
  position: absolute;
  right: 6px;
  top: calc(50% - 17px);
  width: 60px;
}

/* CREDIT CARD IMAGE STYLING */
.preload * {
  transition: none !important;
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -ms-transition: none !important;
  -o-transition: none !important;
}

/* .container {
  width: 100%;
  max-width: 400px;
  max-height: 251px;
  height: 54vw;
  padding: 20px;
} */

#ccsingle {
  position: absolute;
  right: 15px;
  top: 20px;
}

#ccsingle svg {
  width: 100px;
  max-height: 60px;
}

.creditcard svg#cardfront,
.creditcard svg#cardback {
  width: 100%;
  /* -webkit-box-shadow: 1px 5px 6px 0px black;
  box-shadow: 1px 5px 6px 0px black; */
  border-radius: 22px;
  box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 19px 10px;
}

#generatecard {
  cursor: pointer;
  float: right;
  font-size: 12px;
  color: #fff;
  padding: 2px 4px;
  background-color: #909090;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

/* CHANGEABLE CARD ELEMENTS */
.creditcard .lightcolor,
.creditcard .darkcolor {
  -webkit-transition: fill 0.5s;
  transition: fill 0.5s;
}

.creditcard .lightblue {
  fill: #03a9f4;
}

.creditcard .lightbluedark {
  fill: #0288d1;
}

.creditcard .red {
  fill: #ef5350;
}

.creditcard .reddark {
  fill: #d32f2f;
}

.creditcard .purple {
  fill: #ab47bc;
}

.creditcard .purpledark {
  fill: #7b1fa2;
}

.creditcard .cyan {
  fill: #26c6da;
}

.creditcard .cyandark {
  fill: #0097a7;
}

.creditcard .green {
  fill: #66bb6a;
}

.creditcard .greendark {
  fill: #388e3c;
}

.creditcard .lime {
  fill: #d4e157;
}

.creditcard .limedark {
  fill: #afb42b;
}

.creditcard .yellow {
  fill: #ffeb3b;
}

.creditcard .yellowdark {
  fill: #f9a825;
}

.creditcard .orange {
  fill: #ff9800;
}

.creditcard .orangedark {
  fill: #ef6c00;
}

.creditcard .grey {
  fill: #ffffff;
}

.creditcard .greydark {
  fill: #940505;
}

/* FRONT OF CARD */
#svgname {
  text-transform: uppercase;
}

#cardfront .st2 {
  fill: #fcf0ba;
}

#cardfront .st3 {
  font-family: "Source Code Pro", monospace;
  font-weight: 600;
}

#cardfront .st4 {
  font-size: 44.7817px;
}

#cardfront .st5 {
  font-family: "Source Code Pro", monospace;
  font-weight: 400;
}

#cardfront .st6 {
  font-size: 33.1112px;
}

#cardfront .st7 {
  opacity: 0.6;
  fill: #ffffff;
}

#cardfront .st8 {
  font-size: 24px;
}

#cardfront .st9 {
  font-size: 36.5498px;
}

#cardfront .st10 {
  font-family: "Source Code Pro", monospace;
  font-weight: 300;
}

#cardfront .st11 {
  font-size: 16.1716px;
}

#cardfront .st12 {
  fill: #4c4c4c;
}

/* BACK OF CARD */
#cardback .st0 {
  fill: none;
  stroke: #0f0f0f;
  stroke-miterlimit: 10;
}

#cardback .st2 {
  fill: #111111;
}

#cardback .st3 {
  fill: #f2f2f2;
}

#cardback .st4 {
  fill: #d8d2db;
}

#cardback .st5 {
  fill: #c4c4c4;
}

#cardback .st6 {
  font-family: "Source Code Pro", monospace;
  font-weight: 400;
}

#cardback .st7 {
  font-size: 27px;
}

#cardback .st8 {
  opacity: 0.6;
}

#cardback .st9 {
  fill: #ffffff;
}

#cardback .st10 {
  font-size: 24px;
}

#cardback .st11 {
  fill: #eaeaea;
}

#cardback .st12 {
  font-family: "Rock Salt", cursive;
}

#cardback .st13 {
  font-size: 37.769px;
}

/* FLIP ANIMATION */
.container {
  perspective: 1000px;
}

.creditcard {
  width: 100%;
  max-width: 400px;

  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: -webkit-transform 0.6s;
  -webkit-transition: -webkit-transform 0.6s;
  transition: transform 0.6s;
  transition: transform 0.6s, -webkit-transform 0.6s;
  cursor: pointer;
  position: relative;
}

.creditcard .front,
.creditcard .back {
  /* position: absolute; */
  width: 100%;
  max-width: 400px;

  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  color: #47525d;
}

.creditcard .back {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.creditcard.flipped {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
</style>
