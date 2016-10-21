"use strict";

//CRIANDO O COMPONENT MENU
window.billDash = Vue.extend({
    template: "\n        <div>\n        <h2>Contas a Receber e Recebidas</h2>\n        <span>Total Contas a Resceber: R$ {{totalContasReceber}}</span><br>\n        <span>Total Contas Recebidas: R$ {{totalContasRecebidas}}</span><br><br>\n        <h2>Contas a Pagar e Pagas</h2>\n        <span>Total Contas a Pagar: R$ {{totalContasPagar}}<span><br>\n        <span>Total Contas Pagas: R$ {{totalContasPagas}}<span>\n        </div>   \n    ",
    data: function data() {
        return {
            totalContasPagar: 0,
            totalContasPagas: 0,
            totalContasReceber: 0,
            totalContasRecebidas: 0
        };
    },
    created: function created() {
        var _this = this;

        Bill.query().then(function (response) {
            _this.bills = response.data;
            for (var i in _this.bills) {
                //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                if (_this.bills[i].done == 0) {
                    _this.totalContasPagar = (parseFloat(_this.totalContasPagar) + parseFloat(_this.bills[i].value)).toFixed(2);
                } else {
                    _this.totalContasPagas = (parseFloat(_this.totalContasPagas) + parseFloat(_this.bills[i].value)).toFixed(2);
                }
            }
        });

        Receive.query().then(function (response) {
            _this.receives = response.data;
            for (var i in _this.receives) {
                //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                if (_this.receives[i].done == 0) {
                    _this.totalContasReceber = (parseFloat(_this.totalContasReceber) + parseFloat(_this.receives[i].value)).toFixed(2);
                } else {
                    _this.totalContasRecebidas = (parseFloat(_this.totalContasRecebidas) + parseFloat(_this.receives[i].value)).toFixed(2);
                }
            }
        });
    }
});

window.billComponent = Vue.extend({
    template: "\n        <nav>\n            <ul>\n                <!-- CARREGANDO MENU DINAMICAMENTE COM LA\xC7O \"v-for\" -->\n                <li v-for=\"o in menus\">\n                    <!-- USANDO EVENDO NO VUE.JE COM \"v-on\" -->\n                    <!-- MODIFICANDO EVENTO NO VUE.JE COM \"prevent\" -->\n                    <!-- PARA SIMPLIFICAR A DECLARA\xC7\xC3O DE UM EVENTO NO VUE.JE SUBSTITUIMOS O \"v-on\" POR UM \"@\" -->\n                    <a v-link=\"{name: o.routeName}\">{{o.name}}</a>\n                </li>\n            </ul>\n        </nav>\n        <router-view></router-view>\n    ",
    data: function data() {
        return {
            menus: [{ name: "Contas a Pagar", routeName: 'bill-pays' }, { name: "Contas a Receber", routeName: 'bill-receives' }, { name: "DashBoard", routeName: 'dashboard' }]
        };
    }
});