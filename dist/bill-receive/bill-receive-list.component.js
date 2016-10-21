"use strict";

//COMPONENT LISTAGEM
window.billReceiveListComponent = Vue.extend({
    template: "\n        <style type=\"text/css\">\n            .recebido{\n                color:green;\n            }\n            .nao-recebido{\n                color:blue;\n            }\n            .nao-cadastro{\n                color:gray;\n            }\n        </style>\n\n        <h3 :class=\"{'recebido': !status, 'nao-recebido': status > 0, 'nao-cadastro': status=='n'}\">{{status | nReceive}}</h3>\n        <table cellpadding=\"10\">\n            <header>\n                <tr>\n                    <th>#</th>\n                    <th>Recebimento</th>\n                    <th>Descri\xE7\xE3o</th>\n                    <th>Valor</th>\n                    <th>Situa\xE7\xE3o</th>\n                    <th>A\xE7\xF5es</th>\n                </tr>\n            </header>\n            <body>\n            <!-- LISTANDO O CONTE\xDADO DINAMICAMENTE COM LA\xC7O \"v-for\" -->\n            <tr v-for=\"(index,r) in receives\">\n                <td>{{index+1}}</td>\n                <td>{{ r.date_receipt | dateFormat 'pt-BR' }}</td>\n                <td>{{ r.description | upperFormat }}</td>\n                <!-- USANDO FILTRO PARA MODIFICAR A VISUALIZA\xC7\xC3O DOS MEUS DADOS -->\n                <td>{{r.value | numberFormat 'pt-BR' }}</td>\n                <!-- USANDO O PROPERT BINDING \":class\" PARA DE FORMA DINAMICA A COR DA FONTE -->\n                <td :class=\"{'recebido': r.done, 'nao-recebido': !r.done}\">{{r.done | doneLabelReceive}}</td>\n                <td>\n                    <a v-link=\"{name: 'bill-receive.update', params: {id: r.id}}\">Editar</a>&nbsp;&nbsp;\n                    <a href=\"#\" @click.prevent=\"excluirConta(r)\">Excluir</a>&nbsp;&nbsp;\n                    <a href=\"#\" @click.prevent=\"receber(r)\">Receber</a>&nbsp;&nbsp;\n                    <a href=\"#\" @click.prevent=\"devolver(r)\">Devolver</a>\n                </td>\n            </tr>\n            </body>\n        </table>\n    ",
    data: function data() {
        return {
            receives: []
        };
    },
    created: function created() {
        var _this = this;

        //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX USANDO RESOURCE
        Receive.query().then(function (response) {
            _this.receives = response.data;
        });
    },

    methods: {
        excluirConta: function excluirConta(receive) {
            var _this2 = this;

            var resp = confirm("Deseja Realmente Excluir o recebimento?");
            if (resp == true) {
                Receive.delete({ id: receive.id }).then(function (response) {
                    _this2.receives.$remove(receive);
                });
            } else {
                return false;
            }
        },
        receber: function receber(obj) {
            this.receive = obj;
            this.receive.done = 1;
            Receive.update({ id: this.receive.id }, this.receive).then(function (response) {});
        },
        devolver: function devolver(obj) {
            this.receive = obj;
            this.receive.done = 0;
            Receive.update({ id: this.receive.id }, this.receive).then(function (response) {});
        }
    },
    // AQUI SÃO COLOCADAS AS FUNÇÕES QUE EXIBIRÃO E TRATARÃO CONTEÚDOS DINAMICAMENTE
    computed: {
        status: function status() {
            var count = 0;
            for (var i in this.receives) {
                if (!this.receives[i].done) {
                    count++;
                }
            }
            if (this.receives.length == 0) {
                return 'n';
            } else {
                return count;
            }
        }
    }
});
//FIM COMPONENT LISTAGEM