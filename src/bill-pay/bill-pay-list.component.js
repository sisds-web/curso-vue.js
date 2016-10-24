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

            <div class="container">
                <div class="row">
                    <div class="col s7">
                        <div class="card blue-grey lighten-5">
                            <div class="card-content">
                                <span class="flow-text" :class="{'pago': !status, 'nao-pago': status > 0, 'nao-cadastro': status=='n'}">{{status | nContas}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col s5">
                        <div class="card z-depth-1">
                            <div class="card-content flow-text right-align">
                               Total: R$ {{totPagar | numberFormat 'pt-BR'}}
                            </div>
                        </div>
                    </div>
                </div>
 
            </div>
        
        <div class="container z-depth-1">
            <table class="bordered striped responsive-table">
            <header>
                <tr>
                    <th class="center">#</th>
                    <th class="center">Vencimento</th>
                    <th class="center">Conta</th>
                    <th class="center">Valor R$</th>
                    <th class="center">Situação</th>
                    <th class="center">Ações</th>
                </tr>
            </header> 
            <body>
            <!-- LISTANDO O CONTEÚDO DINAMICAMENTE COM LAÇO "v-for" -->
            <tr v-for="(index,o) in bills">
                <td class="center">{{index+1}}</td>
                <td class="center">{{o.date_due | dateFormat 'pt-BR' }}</td>
                <td>{{o.name | upperFormat }}</td>
                <!-- USANDO FILTRO PARA MODIFICAR A VISUALIZAÇÃO DOS MEUS DADOS -->
                <td class="right">{{o.value | numberFormat 'pt-BR' }}</td>
                <!-- USANDO O PROPERT BINDING ":class" PARA DE FORMA DINAMICA A COR DA FONTE -->
                <td class="center" :class="{'pago': o.done, 'nao-pago': !o.done}">{{o.done | doneLabel}}</td>
                <td class="center">
                    <a v-link="{name: 'bill-pay.update', params: {id: o.id}}">Editar</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="excluirConta(o)">Excluir</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="darBaixa(o)">Dar Baixa</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="estornar(o)">Estornar</a>
                </td>
            </tr>
            </body>
            </table>
        </div>
    `,
    data(){
        return{
            //bills: this.$root.$children[0].billsPay
            bills: [],
            totPagar: 0
        };
    },
    created(){
        //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX USANDO RESOURCE
       // Bill.query().then((response) => {
          // this.bills = response.data;
        //});

        Bill.query().then((response) => {
            this.bills = response.data;
            for (var i in this.bills) {
                //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                if (this.bills[i].done == 0) {
                    this.totPagar = (parseFloat(this.totPagar) + parseFloat(this.bills[i].value)).toFixed(2);
                }
            }
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
            if(this.bill.done==0){
                this.bill.done=1;
                Bill.update({id: this.bill.id},this.bill).then((response) =>{
                    Bill.query().then((response) => {
                        this.bills = response.data;
                        this.totPagar=0;
                        for (var i in this.bills) {
                            //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                            if (this.bills[i].done == 0) {
                                this.totPagar = (parseFloat(this.totPagar) + parseFloat(this.bills[i].value)).toFixed(2);
                            }
                        }
                    });
                });
            }
        },
        estornar(bill){
            this.bill = bill;
            if(this.bill.done==1){
                this.bill.done=0;
                Bill.update({id: this.bill.id},this.bill).then((response) => {
                    //this.$router.go({name: 'bill-pay.list'});
                    Bill.query().then((response) => {
                        this.bills = response.data;
                        this.totPagar=0;
                        for (var i in this.bills) {
                            //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                            if (this.bills[i].done == 0) {
                                this.totPagar = (parseFloat(this.totPagar) + parseFloat(this.bills[i].value)).toFixed(2);
                            }
                        }
                    });
                });
            }
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
        }
    }
});
//FIM COMPONENT LISTAGEM
