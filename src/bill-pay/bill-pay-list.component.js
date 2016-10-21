//COMPONENT LISTAGEM
window.billPayListComponent = Vue.extend({
    template:`
        <style type="text/css">
            .pago{
                color:green;
            }
            .nao-pago{
                color:red;
            }
            .nao-cadastro{
                color:gray;
            }
        </style>

        <h3 :class="{'pago': !status, 'nao-pago': status > 0, 'nao-cadastro': status=='n'}">{{status | nContas}}</h3>
        <table cellpadding="10">
            <header>
                <tr>
                    <th>#</th>
                    <th>Vencimento</th>
                    <th>Conta</th>
                    <th>Valor R$</th>
                    <th>Situação</th>
                    <th>Ações</th>
                </tr>
            </header> 
            <body>
            <!-- LISTANDO O CONTEÚDO DINAMICAMENTE COM LAÇO "v-for" -->
            <tr v-for="(index,o) in bills">
                <td>{{index+1}}</td>
                <td>{{o.date_due | dateFormat 'pt-BR' }}</td>
                <td>{{o.name | upperFormat }}</td>
                <!-- USANDO FILTRO PARA MODIFICAR A VISUALIZAÇÃO DOS MEUS DADOS -->
                <td>{{o.value | numberFormat 'pt-BR' }}</td>
                <!-- USANDO O PROPERT BINDING ":class" PARA DE FORMA DINAMICA A COR DA FONTE -->
                <td :class="{'pago': o.done, 'nao-pago': !o.done}">{{o.done | doneLabel}}</td>
                <td>
                    <a v-link="{name: 'bill-pay.update', params: {id: o.id}}">Editar</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="excluirConta(o)">Excluir</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="darBaixa(o)">Dar Baixa</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="estornar(o)">Estornar</a>
                </td>
            </tr>
            </body>
        </table>
    `,
    data(){
        return{
            //bills: this.$root.$children[0].billsPay
            bills: []
        };
    },
    created(){
        //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX USANDO RESOURCE
        Bill.query().then((response) => {
           this.bills = response.data;
        });

        //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX
        //this.$http.get('bills').then(function(response){
        //    this.bills = response.data;
        //})
    },
    methods:{
        excluirConta(bill){
            let resp = confirm("Deseja Realmente Excluir a Conta?");
            if (resp == true) {

                Bill.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                });
                //this.$root.$children[0].billsPay.splice(index,1);
            } else {
                return false;
            }
        },
        darBaixa(bill){
            this.bill = bill;
            this.bill.done=1;
            Bill.update({id: this.bill.id},this.bill).then((response) =>{
                //this.$router.go({name: 'bill-pay.list'});
            });
        },
        estornar(bill){
            this.bill = bill;
            this.bill.done=0;
            Bill.update({id: this.bill.id},this.bill).then((response) => {
                //this.$router.go({name: 'bill-pay.list'});
            });
        }
    },
    // AQUI SÃO COLOCADAS AS FUNÇÕES QUE EXIBIRÃO E TRATARÃO CONTEÚDOS DINAMICAMENTE
    computed:{
        status(){
            let count=0;
            for(let i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }
            if(this.bills.length==0){
                return 'n';
            }else{
                return count;
            }
        },
    }
});
//FIM COMPONENT LISTAGEM
