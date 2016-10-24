"use strict";

window.billPayComponent = Vue.extend({
    components: {
        'bill-pay-menu-component': billPayMenuComponent
    },
    template: "\n    <div class=\"section\">\n        <div class=\"container\">\n            <h4>{{title}}</h4>\n        </div>\n    </div>\n     <router-view></router-view>\n",
    data: function data() {
        return {
            title: "Contas a pagar"
        };
    }
});