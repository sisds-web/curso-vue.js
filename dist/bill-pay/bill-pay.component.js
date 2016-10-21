"use strict";

window.billPayComponent = Vue.extend({
    components: {
        'bill-pay-menu-component': billPayMenuComponent
    },
    template: "\n    <h1>{{title}}</h1>\n    <!-- CHAMANDO O COMPONENT MENU -->\n    <bill-pay-menu-component></bill-pay-menu-component>\n    <router-view></router-view>\n    <!-- ESTRUTURA CONDICIONAL \"v-if\" SO CARREGA O HTML SE A CONDI\xC7\xC3O FOR SATISFATORIA-->\n     <!-- ESTRUTURA CONDICIONAL \"v-show\" CARREGA O HTML E O MANTEM ESCONDIDO-->\n    <!--<div v-show=\"activedView == 0\">\n    <!-- ESTRUTURA \"v-ref\" CRIA UMA REFERENCIA DO COMPONENT QUE PODE SER RECUPERADA DENTRO DE UM OURO COMPONENT\n        <bill-list-component v-ref:bill-list-component></bill-list-component>\n    </div>\n    <div v-show=\"activedView == 1\">\n        <form-component :bill.sync=\"bill\" ></form-component>\n    </div>-->\n",
    data: function data() {
        return {
            title: "Contas a pagar"
        };
    }
});