"use strict";

//COMPONENT LISTAGEM
window.billPayListComponent = Vue.extend({
    template: "\n        <style type=\"text/css\">\n            .pago{\n                color:green;\n            }\n            .nao-pago{\n                color:red;\n            }\n            .nao-cadastro{\n                color:gray;\n            }\n        </style>\n\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col s7\">\n                        <div class=\"card blue-grey lighten-5\">\n                            <div class=\"card-content\">\n                                <span class=\"flow-text\" :class=\"{'pago': !status, 'nao-pago': status > 0, 'nao-cadastro': status=='n'}\">{{status | nContas}}</span>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col s5\">\n                        <div class=\"card z-depth-1\">\n                            <div class=\"card-content flow-text right-align\">\n                               Total: R$ {{totPagar | numberFormat 'pt-BR'}}\n                            </div>\n                        </div>\n                    </div>\n                </div>\n \n            </div>\n        \n        <div class=\"container z-depth-1\">\n            <table class=\"bordered striped responsive-table\">\n            <header>\n                <tr>\n                    <th class=\"center\">#</th>\n                    <th class=\"center\">Vencimento</th>\n                    <th class=\"center\">Conta</th>\n                    <th class=\"center\">Valor R$</th>\n                    <th class=\"center\">Situa\xE7\xE3o</th>\n                    <th class=\"center\">A\xE7\xF5es</th>\n                </tr>\n            </header> \n            <body>\n            <!-- LISTANDO O CONTE\xDADO DINAMICAMENTE COM LA\xC7O \"v-for\" -->\n            <tr v-for=\"(index,o) in bills\">\n                <td class=\"center\">{{index+1}}</td>\n                <td class=\"center\">{{o.date_due | dateFormat 'pt-BR' }}</td>\n                <td>{{o.name | upperFormat }}</td>\n                <!-- USANDO FILTRO PARA MODIFICAR A VISUALIZA\xC7\xC3O DOS MEUS DADOS -->\n                <td class=\"right\">{{o.value | numberFormat 'pt-BR' }}</td>\n                <!-- USANDO O PROPERT BINDING \":class\" PARA DE FORMA DINAMICA A COR DA FONTE -->\n                <td class=\"center\" :class=\"{'pago': o.done, 'nao-pago': !o.done}\">{{o.done | doneLabel}}</td>\n                <td class=\"center\">\n                    <a v-link=\"{name: 'bill-pay.update', params: {id: o.id}}\">Editar</a>&nbsp;&nbsp;\n                    <a href=\"#\" @click.prevent=\"excluirConta(o)\">Excluir</a>&nbsp;&nbsp;\n                    <a href=\"#\" @click.prevent=\"darBaixa(o)\">Dar Baixa</a>&nbsp;&nbsp;\n                    <a href=\"#\" @click.prevent=\"estornar(o)\">Estornar</a>\n                </td>\n            </tr>\n            </body>\n            </table>\n        </div>\n    ",
    data: function data() {
        return {
            //bills: this.$root.$children[0].billsPay
            bills: [],
            totPagar: 0
        };
    },
    created: function created() {
        var _this = this;

        //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX USANDO RESOURCE
        // Bill.query().then((response) => {
        // this.bills = response.data;
        //});

        Bill.query().then(function (response) {
            _this.bills = response.data;
            for (var i in _this.bills) {
                //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                if (_this.bills[i].done == 0) {
                    _this.totPagar = (parseFloat(_this.totPagar) + parseFloat(_this.bills[i].value)).toFixed(2);
                }
            }
        });

        //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX
        //this.$http.get('bills').then(function(response){
        //    this.bills = response.data;
        //})
    },

    methods: {
        excluirConta: function excluirConta(bill) {
            var _this2 = this;

            var resp = confirm("Deseja Realmente Excluir a Conta?");
            if (resp == true) {

                Bill.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                });
                //this.$root.$children[0].billsPay.splice(index,1);
            } else {
                return false;
            }
        },
        darBaixa: function darBaixa(bill) {
            var _this3 = this;

            this.bill = bill;
            if (this.bill.done == 0) {
                this.bill.done = 1;
                Bill.update({ id: this.bill.id }, this.bill).then(function (response) {
                    Bill.query().then(function (response) {
                        _this3.bills = response.data;
                        _this3.totPagar = 0;
                        for (var i in _this3.bills) {
                            //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                            if (_this3.bills[i].done == 0) {
                                _this3.totPagar = (parseFloat(_this3.totPagar) + parseFloat(_this3.bills[i].value)).toFixed(2);
                            }
                        }
                    });
                });
            }
        },
        estornar: function estornar(bill) {
            var _this4 = this;

            this.bill = bill;
            if (this.bill.done == 1) {
                this.bill.done = 0;
                Bill.update({ id: this.bill.id }, this.bill).then(function (response) {
                    //this.$router.go({name: 'bill-pay.list'});
                    Bill.query().then(function (response) {
                        _this4.bills = response.data;
                        _this4.totPagar = 0;
                        for (var i in _this4.bills) {
                            //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                            if (_this4.bills[i].done == 0) {
                                _this4.totPagar = (parseFloat(_this4.totPagar) + parseFloat(_this4.bills[i].value)).toFixed(2);
                            }
                        }
                    });
                });
            }
        }
    },
    // AQUI SÃO COLOCADAS AS FUNÇÕES QUE EXIBIRÃO E TRATARÃO CONTEÚDOS DINAMICAMENTE
    computed: {
        status: function status() {
            var count = 0;
            for (var i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }
            if (this.bills.length == 0) {
                return 'n';
            } else {
                return count;
            }
        }
    }
});
//FIM COMPONENT LISTAGEM