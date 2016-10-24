"use strict";

//CRIANDO O COMPONENT MENU
window.billDash = Vue.extend({
    template: "\n        <div class=\"section\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col s6\">\n                        <div class=\"card-panel blue accent-2 white-text\">\n                            <h4>Contas a Receber</h4>\n                            <p class=\"flow-text\">Total: R$ {{totalContasReceber | numberFormat 'pt-BR'}}</p>\n                        </div>\n                    </div>\n                    <div class=\"col s6\">\n                        <div class=\"card-panel red lighten-2 white-text\">\n                            <h4>Contas a Pagar</h4>\n                            <p class=\"flow-text\">Total: R$ {{totalContasPagar | numberFormat 'pt-BR'}}</p>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <div class=\"col s6\">\n                        <div class=\"card-panel teal accent-3 white-text\">\n                            <h4>Contas Recebidas</h4>\n                            <p class=\"flow-text\">Total: R$ {{totalContasRecebidas | numberFormat 'pt-BR'}}</p>\n                        </div>\n                    </div>\n                    <div class=\"col s6\">\n                        <div class=\"card-panel orange accent-3 white-text\">\n                            <h4>Contas Pagas</h4>\n                            <p class=\"flow-text\">Total: R$ {{totalContasPagas | numberFormat 'pt-BR'}}</p>\n                        </div>    \n                    </div>\n                </div>\n            </div>\n        </div>   \n    ",
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
    template: "\n        <ul v-bind:id='o.id' class='dropdown-content' v-for=\"o in menusDropdown\">\n            <li v-for=\"item in o.items\">\n                 <a v-link=\"{name: item.routeName}\">\n                    {{item.name}}\n                 </a>\n            </li>\n        </ul>\n        <div class=\"navbar-fixed\">\n            <nav class=\"blue-grey lighten-1\">\n                <div class=\"nav-wrapper\">\n                        <a href=\"#!\" class=\"right hide-on-small-only brand-logo\">Code Contas</a>\n                        <a href=\"#\" data-activates=\"mobile-demo\" class=\"button-collapse\">\n                            <i class=\"material-icons\">menu</i>\n                        </a>\n                        <ul class=\"hide-on-med-and-down\">\n                            <li v-for=\"o in menus\">\n                                <a v-if=\"o.dropdownId\" class=\"dropdown-submenu\" href=\"!#\" v-bind:data-activates=\"o.dropdownId\">\n                                {{o.name}} <i class=\"material-icons right\">arrow_drop_down</i>\n                                </a>\n                                <a v-else v-link=\"{name: o.routeName}\">{{o.name}}</a>\n                            </li>\n                        </ul>\n                        <ul class=\"side-nav\" id=\"mobile-demo\">\n                            <li v-for=\"o in menus\">\n                                <a v-link=\"{name: o.routeName}\">{{o.name}}</a>\n                            </li>\n                        </ul>\n                </div>\n            </nav>\n        </div>\n        <router-view></router-view>\n    ",
    created: function created() {
        $(document).ready(function () {
            $(".button-collapse").sideNav();
            $(".dropdown-submenu").dropdown();
        });
    },
    data: function data() {
        return {
            menus: [{ name: "Contas a Pagar", routeName: 'bill-pays', dropdownId: 'bill-pay' }, { name: "Contas a Receber", routeName: 'bill-receives', dropdownId: 'bill-receive' }, { name: "DashBoard", routeName: 'dashboard' }],
            menusDropdown: [{
                id: 'bill-pay', items: [{ id: 0, name: "Listar Contas", routeName: 'bill-pay.list' }, { id: 1, name: "Nova Conta", routeName: 'bill-pay.create' }]
            }, {
                id: 'bill-receive', items: [{ name: "Listar Contas", routeName: 'bill-receive.list' }, { name: "Nova Conta", routeName: 'bill-receive.create' }]
            }]
        };
    }
});