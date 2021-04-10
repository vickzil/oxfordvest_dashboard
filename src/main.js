import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from 'axios';

import HighchartsVue from 'highcharts-vue'

Vue.use(HighchartsVue)


Vue.prototype.$http = Axios;

Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const token = sessionStorage.getItem('appUserThemeSettingsCode')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
} else {
    sessionStorage.clear();
}


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");