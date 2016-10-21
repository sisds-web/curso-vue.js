const nomes =[
    'Conta de luz',
    'Conta de água',
    'Conta de telefone',
    'Supermercado',
    'Cartão de crédito',
    'Empréstimo',
    'Gasolina'
];

window.billPayCreateComponent = Vue.extend({
    template:`
        <form name="" action="">
            <!-- USANDO O TWO-WEY DATA BIND ATRAVES DA DIRETIVA "v-model" O DADOS É ALTERADO DE FORMA BILATERAL -->
            <label>Vencimento</label><br>
            <input type="text" v-model="bill.date_due | dateFormat"><br>
            <label>Conta</label><br>
            <select name="" id="" v-model="bill.name">
                <!-- USANDO O PROPERT BINDING ":value" PARA LIGAR MEU DADO AO MODEL -->
                <option v-for="o in names" :value="o">{{ o }}</option>
            </select><br>
            <label>Valor</label><br>
            <input type="text" v-model="bill.value | numberFormat"><br><br>
            <button @click.prevent="submit">OK</button>
        </form>
    `,
    data(){
        return{
            formType: 'insert',
            names: nomes,
            bill: {
                date_due:'',
                name:'',
                value:0,
                done:0
            }
        };
    },
    created(){
        if(this.$route.name == 'bill-pay.update'){
            this.formType = "update";
            this.getBill(this.$route.params.id);
        }
    },
    methods:{
        submit(){
            let data = Vue.util.extend(this.bill,{date_due: this.getDateDue(this.bill.date_due)});
            if(this.formType == "insert"){
                if(this.bill.date_due==""){
                    alert("Informe o Vencimento");
                    return false;
                }else if(this.bill.name==""){
                    alert("Informe uma conta");
                    return false;
                }else if(this.bill.value==0 || this.bill.value==""){
                    alert("Informe o valor");
                    return false;
                }else {
                    //INSERINDO A NOVA CONTA ATRAVES DE EVENTO
                    //this.$root.$children[0].billsPay.push(this.bill);
                    //this.$dispatch('new-bill',this.bill);
                    Bill.save({},data).then((response) => {
                        this.$router.go({name: 'bill-pay.list'});
                    });
                }
            }else{
                Bill.update({id: this.bill.id},data).then((response) => {
                    this.$router.go({name: 'bill-pay.list'});
                });
            }

        },
        getBill(id){
            //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX
            Bill.get({id: id}).then((response) => {
                this.bill = response.data;
            });
            //this.bill = this.$root.$children[0].billsPay[index];
        },
        getDateDue(date_due){
            let dateDueObject = date_due;
            if(!(dateDueObject instanceof Date)){
                dateDueObject = new Date(dateDueObject.split('/').reverse().join('-') + "T03:00:00");
            }
            return dateDueObject.toISOString().split('T')[0];

        }
    }
});

//FIM DO COMPONENT FORMULARIO PARA CADASTRO
