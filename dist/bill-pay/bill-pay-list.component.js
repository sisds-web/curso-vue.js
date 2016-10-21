"use strict";

//COMPONENT LISTAGEM
window.billPayListComponent = Vue.extend({
    template: "\n        <style type=\"text/css\">\n            .pago{\n                color:green;\n            }\n            .nao-pago{\n                color:red;\n            }\n            .nao-cadastro{\n                color:gray;\n            }\n        </style>\n\n        <h3 :class=\"{'pago': !status, 'nao-pago': status > 0, 'nao-cadastro': status=='n'}\">{{status | nContas}}</h3>\n        <table cellpadding=\"10\">\n            <header>\n                <tr>\n                    <th>#</th>\n                    <th>Vencimento</th>\n                    <th>Conta</th>\n                    <th>Valor R$</th>\n                    <th>Situa\xE7\xE3o</th>\n                    <th>A\xE7\xF5es</th>\n                </tr>\n            </header> \n            <body>\n            <!-- LISTANDO O CONTE\xDADO DINAMICAMENTE COM LA\xC7O \"v-for\" -->\n            <tr v-for=\"(index,o) in bills\">\n                <td>{{index+1}}</td>\n                <td>{{o.date_due | dateFormat 'pt-BR' }}</td>\n                <td>{{o.name | upperFormat }}</td>\n                <!-- USANDO FILTRO PARA MODIFICAR A VISUALIZA\xC7\xC3O DOS MEUS DADOS -->\n                <td>{{o.value | numberFormat 'pt-BR' }}</td>\n                <!-- USANDO O PROPERT BINDING \":class\" PARA DE FORMA DINAMICA A COR DA FONTE -->\n                <td :class=\"{'pago': o.done, 'nao-pago': !o.done}\">{{o.done | doneLabel}}</td>\n                <td>\n                    <a v-link=\"{name: 'bill-pay.update', params: {id: o.id}}\">Editar</a>&nbsp;&nbsp;\n                    <a href=\"#\" @click.prevent=\"excluirConta(o)\">Excluir</a>&nbsp;&nbsp;\n                    <a href=\"#\" @click.prevent=\"darBaixa(o)\">Dar Baixa</a>&nbsp;&nbsp;\n                    <a href=\"#\" @click.prevent=\"estornar(o)\">Estornar</a>\n                </td>\n            </tr>\n            </body>\n        </table>\n    ",
    data: function data() {
        return {
            //bills: this.$root.$children[0].billsPay
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX USANDO RESOURCE
        Bill.query().then(function (response) {
            _this.bills = response.data;
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
            this.bill = bill;
            this.bill.done = 1;
            Bill.update({ id: this.bill.id }, this.bill).then(function (response) {
                //this.$router.go({name: 'bill-pay.list'});
            });
        },
        estornar: function estornar(bill) {
            this.bill = bill;
            this.bill.done = 0;
            Bill.update({ id: this.bill.id }, this.bill).then(function (response) {
                //this.$router.go({name: 'bill-pay.list'});
            });
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