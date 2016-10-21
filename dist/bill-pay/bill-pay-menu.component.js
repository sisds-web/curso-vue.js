"use strict";

//CRIANDO O COMPONENT MENU
window.billPayMenuComponent = Vue.extend({
    template: "\n        <nav>\n            <ul>\n                <!-- CARREGANDO MENU DINAMICAMENTE COM LA\xC7O \"v-for\" -->\n                <li v-for=\"o in menus\">\n                    <!-- USANDO EVENDO NO VUE.JE COM \"v-on\" -->\n                    <!-- MODIFICANDO EVENTO NO VUE.JE COM \"prevent\" -->\n                    <!-- PARA SIMPLIFICAR A DECLARA\xC7\xC3O DE UM EVENTO NO VUE.JE SUBSTITUIMOS O \"v-on\" POR UM \"@\" -->\n                    <a v-link=\"{name: o.routeName}\">{{o.name}}</a>\n                </li>\n            </ul>\n        </nav>\n    ",
    data: function data() {
        return {
            menus: [
            //{id: 0, name: "Listar Contas", url: '/bills'},
            //{id: 1, name: "Nova Conta", url: '/bill/create'}
            { id: 0, name: "Listar Contas", routeName: 'bill-pay.list' }, { id: 1, name: "Nova Conta", routeName: 'bill-pay.create' }]
        };
    }
});