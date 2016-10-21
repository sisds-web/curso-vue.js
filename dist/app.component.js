'use strict';

window.appComponent = Vue.extend({
  components: {
    'bill-component': billComponent
  },
  template: '<bill-component></bill-component>'
});