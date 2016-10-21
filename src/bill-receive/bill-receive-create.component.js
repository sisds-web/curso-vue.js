//CRIANDO COMPONENT FORMULARIO PARA CADASTRO
window.billReceiveCreateComponent = Vue.extend({
    template:`
        <form name="" action="">
            <!-- USANDO O TWO-WEY DATA BIND ATRAVES DA DIRETIVA "v-model" O DADOS É ALTERADO DE FORMA BILATERAL -->
            <label>Vencimento</label><br>
            <input type="text" v-model="receive.date_receipt | dateFormat"><br>
            <label>Descrição</label><br>
            <input type="text" v-model="receive.description"><br>
            <label>Valor</label><br>
            <input type="text" v-model="receive.value"><br><br>
            <button @click.prevent="submit">OK</button>
        </form>
    `,
    data(){
        return{
            formType: 'insert',
            receive: {
                date_receipt:'',
                description:'',
                value:0,
                done:0
            }
        };
    },
    created(){
        if(this.$route.name == 'bill-receive.update'){
            this.formType = "update";
            this.getBillReceive(this.$route.params.id);
        }
    },
    methods:{
        submit(){
            let data = Vue.util.extend(this.receive,{date_receipt: this.getDateReceipt(this.receive.date_receipt)});
            if(this.formType == "insert"){
                if(this.receive.date_receipt==""){
                    alert("Informe o Vencimento");
                    return false;
                }else if(this.receive.description==""){
                    alert("Informe uma conta");
                    return false;
                }else if(this.receive.value==0 || this.receive.value==""){
                    alert("Informe o valor");
                    return false;
                }else {
                    //INSERINDO A NOVA CONTA ATRAVES DE EVENTO
                    //this.$root.$children[0].billsReceive.push(this.receive);
                    Receive.save({},data).then((response) => {
                        this.$router.go({name: 'bill-receive.list'});
                    });
                    //this.$dispatch('new-bill',this.bill);
                }
            }else{
                Receive.update({id: this.receive.id},data).then((response) => {
                    this.$router.go({name: 'bill-receive.list'});
                });
            }

        },
        getBillReceive(id){
            //this.receive = this.$root.$children[0].billsReceive[cod];
            //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX
            Receive.get({id: id}).then((response) => {
                this.receive = response.data;
            });
        },
        getDateReceipt(date_receipt){
            let dateReceiptObject = date_receipt;
            if(!(dateReceiptObject instanceof Date)){
                dateReceiptObject = new Date(dateReceiptObject.split('/').reverse().join('-') + "T03:00:00");
            }
            return dateReceiptObject.toISOString().split('T')[0];

        }
    }
});

//FIM DO COMPONENT FORMULARIO PARA CADASTRO
