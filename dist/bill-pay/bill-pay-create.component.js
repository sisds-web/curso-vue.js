'use strict';

var nomes = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina'];

window.billPayCreateComponent = Vue.extend({
    template: '\n        <form name="" action="">\n            <!-- USANDO O TWO-WEY DATA BIND ATRAVES DA DIRETIVA "v-model" O DADOS \xC9 ALTERADO DE FORMA BILATERAL -->\n            <label>Vencimento</label><br>\n            <input type="text" v-model="bill.date_due | dateFormat"><br>\n            <label>Conta</label><br>\n            <select name="" id="" v-model="bill.name">\n                <!-- USANDO O PROPERT BINDING ":value" PARA LIGAR MEU DADO AO MODEL -->\n                <option v-for="o in names" :value="o">{{ o }}</option>\n            </select><br>\n            <label>Valor</label><br>\n            <input type="text" v-model="bill.value | numberFormat"><br><br>\n            <button @click.prevent="submit">OK</button>\n        </form>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: nomes,
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: 0
            }
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = "update";
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = Vue.util.extend(this.bill, { date_due: this.getDateDue(this.bill.date_due) });
            if (this.formType == "insert") {
                if (this.bill.date_due == "") {
                    alert("Informe o Vencimento");
                    return false;
                } else if (this.bill.name == "") {
                    alert("Informe uma conta");
                    return false;
                } else if (this.bill.value == 0 || this.bill.value == "") {
                    alert("Informe o valor");
                    return false;
                } else {
                    //INSERINDO A NOVA CONTA ATRAVES DE EVENTO
                    //this.$root.$children[0].billsPay.push(this.bill);
                    //this.$dispatch('new-bill',this.bill);
                    Bill.save({}, data).then(function (response) {
                        _this.$router.go({ name: 'bill-pay.list' });
                    });
                }
            } else {
                Bill.update({ id: this.bill.id }, data).then(function (response) {
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX
            Bill.get({ id: id }).then(function (response) {
                _this2.bill = response.data;
            });
            //this.bill = this.$root.$children[0].billsPay[index];
        },
        getDateDue: function getDateDue(date_due) {
            var dateDueObject = date_due;
            if (!(dateDueObject instanceof Date)) {
                dateDueObject = new Date(dateDueObject.split('/').reverse().join('-') + "T03:00:00");
            }
            return dateDueObject.toISOString().split('T')[0];
        }
    }
});

//FIM DO COMPONENT FORMULARIO PARA CADASTRO