"use strict";

window.billReceiveComponent = Vue.extend({
    components: {
        'bill-receive-menu-component': billReceiveMenuComponent
    },
    template: "\n    <h1>{{title}}</h1>\n    <!-- CHAMANDO O COMPONENT MENU -->\n    \n    \n    <bill-receive-menu-component></bill-receive-menu-component>\n    <router-view></router-view>\n    \n    \n    <!-- ESTRUTURA CONDICIONAL \"v-if\" SO CARREGA O HTML SE A CONDI\xC7\xC3O FOR SATISFATORIA-->\n     <!-- ESTRUTURA CONDICIONAL \"v-show\" CARREGA O HTML E O MANTEM ESCONDIDO-->\n    <!--<div v-show=\"activedView == 0\">\n    <!-- ESTRUTURA \"v-ref\" CRIA UMA REFERENCIA DO COMPONENT QUE PODE SER RECUPERADA DENTRO DE UM OURO COMPONENT\n        <bill-list-component v-ref:bill-list-component></bill-list-component>\n    </div>\n    <div v-show=\"activedView == 1\">\n        <form-component :bill.sync=\"bill\" ></form-component>\n    </div>-->\n",
    data: function data() {
        return {
            title: "Contas a receber"
        };
    }
});