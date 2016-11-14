<template>
    <div class="container">
        <div class="card-panel">
            <form name="" action="">

                <div class="row">
                    <label class="active">Vencimento</label>
                    <input type="text"  v-model="bill.date_due | dateFormat">
                </div>
                <div class="row">
                    <label class="active">Conta</label>
                    <select id="name" v-model="bill.name" class="browser-default">
                        <option valuue="" disabled selected>Informe uma conta</option>
                        <option v-for="o in names" :value="o">{{ o }}</option>
                    </select>
                </div>
                <div class="row">
                    <label class="active">Valor</label>
                    <input placeholder="0.00" type="text" v-model="bill.value | numberFormat">
                </div>
                <div class="row">
                    <button @click.prevent="submit" class="btn waves-effect waves-light">
                        <i class="material-icons right">send</i>Salvar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {Bill} from '../resources';

    const nomes =[
        'Conta de luz',
        'Conta de água',
        'Conta de telefone',
        'Supermercado',
        'Cartão de crédito',
        'Empréstimo',
        'Gasolina'
    ];

    export default {

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
        ready(){
            $('#name').material_select();
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
                            Materialize.toast('<strong><i class="material-icons left">done</i>Conta cadastrada com sucesso</strong>'
                                    ,4000,'green lighten-3');
                            this.$router.go({name: 'bill-pay.list'});
                        });

                    }
                }else{
                    Bill.update({id: this.bill.id},data).then((response) => {
                        Materialize.toast('<strong><i class="material-icons left">done</i>Conta alterada com sucesso</strong>'
                                ,4000,'green lighten-3');
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
                //let dateDueObject = (date_due.length == 10) ? date_due : date_due.substring(0,14);
                //if(!(dateDueObject instanceof Date)){
                //    dateDueObject = new Date(dateDueObject.split('/').reverse().join('-') + "T03:00:00");
                //}
                //return dateDueObject.toISOString().split('T')[0];
                return date_due;
            }
        }
    };
</script>
