'use strict';

//CRIANDO COMPONENT FORMULARIO PARA CADASTRO
window.billReceiveCreateComponent = Vue.extend({
    template: '\n        <form name="" action="">\n            <!-- USANDO O TWO-WEY DATA BIND ATRAVES DA DIRETIVA "v-model" O DADOS \xC9 ALTERADO DE FORMA BILATERAL -->\n            <label>Vencimento</label><br>\n            <input type="text" v-model="receive.date_receipt | dateFormat"><br>\n            <label>Descri\xE7\xE3o</label><br>\n            <input type="text" v-model="receive.description"><br>\n            <label>Valor</label><br>\n            <input type="text" v-model="receive.value"><br><br>\n            <button @click.prevent="submit">OK</button>\n        </form>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            receive: {
                date_receipt: '',
                description: '',
                value: 0,
                done: 0
            }
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = "update";
            this.getBillReceive(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = Vue.util.extend(this.receive, { date_receipt: this.getDateReceipt(this.receive.date_receipt) });
            if (this.formType == "insert") {
                if (this.receive.date_receipt == "") {
                    alert("Informe o Vencimento");
                    return false;
                } else if (this.receive.description == "") {
                    alert("Informe uma conta");
                    return false;
                } else if (this.receive.value == 0 || this.receive.value == "") {
                    alert("Informe o valor");
                    return false;
                } else {
                    //INSERINDO A NOVA CONTA ATRAVES DE EVENTO
                    //this.$root.$children[0].billsReceive.push(this.receive);
                    Receive.save({}, data).then(function (response) {
                        _this.$router.go({ name: 'bill-receive.list' });
                    });
                    //this.$dispatch('new-bill',this.bill);
                }
            } else {
                Receive.update({ id: this.receive.id }, data).then(function (response) {
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBillReceive: function getBillReceive(id) {
            var _this2 = this;

            //this.receive = this.$root.$children[0].billsReceive[cod];
            //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX
            Receive.get({ id: id }).then(function (response) {
                _this2.receive = response.data;
            });
        },
        getDateReceipt: function getDateReceipt(date_receipt) {
            var dateReceiptObject = date_receipt;
            if (!(dateReceiptObject instanceof Date)) {
                dateReceiptObject = new Date(dateReceiptObject.split('/').reverse().join('-') + "T03:00:00");
            }
            return dateReceiptObject.toISOString().split('T')[0];
        }
    }
});

//FIM DO COMPONENT FORMULARIO PARA CADASTRO