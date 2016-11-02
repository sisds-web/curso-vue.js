//COMPONENT LISTAGEM
window.billPayListComponent = Vue.extend({
    components:{
        'modal': modalComponent
    },
    template:`
            <div class="container">
                <div class="row">
                    <div class="col s7">
                        <div class="card blue-grey lighten-5">
                            <div class="card-content">
                                <span class="flow-text" :class="{'green-text': !status, 'red-text': status > 0, 'gray-text': status=='n'}">
                                    <b>{{status | nContas}}</b>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col s5">
                        <div class="card z-depth-1">
                            <div class="card-content flow-text right-align">
                               <b>Total: R$ {{totPagar | numberFormat 'pt-BR'}}</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="container">
            <div class="divider"></div>
            <div class="row">
                <div class="col s12">
                    <span class="gray-text flow-text">
                        Minhas contas
                    </span>
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
                <td class="center white-text" :class="{'green lighten-3': o.done, 'red lighten-3': !o.done}">{{o.done | doneLabel}}</td>
                <td class="center">
                    <a v-link="{name: 'bill-pay.update', params: {id: o.id}}">Editar</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="openModalDelete(o)">Excluir</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="darBaixa(o)">Dar Baixa</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="estornar(o)">Estornar</a>
                </td>
            </tr>
            </body>
            </table>
        </div>
        <modal :modal="modal">
            <div slot="content">
                <h4>Confirmação de exclusão</h4>
                <p class="red-text"><strong>Deseja realmente excluir esta conta?</strong></p>
                <div class="divider"></div>
                <p>Conta: <strong>{{ billToDelete.name }}</strong></p>
                <p>Valor: R$ <strong>{{ billToDelete.value | numberFormat 'pt-BR'}}</strong></p>
                <p>Vencimento: <strong>{{ billToDelete.date_due | dateFormat 'pt-BR' }}</strong></p>
                <div class="divider"></div>
            </div>
            <div slot="footer">
                <button class="btn modal-action modal-close waves-effect green lighten-4 btn-flat" @click="excluirConta()">OK</button>
                <button class="btn modal-action modal-close waves-effect red lighten-4 btn-flat">Cancelar</button>
            </div>
        </modal>
    `,
    data(){
        return{
            bills: [],
            totPagar: 0,
            billToDelete: null,
            modal:{
                id: 'modal-delete'
            }
        };
    },
    created(){
        //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX USANDO RESOURCE
        Bill.query().then((response) => {
            this.bills = response.data;
            for (var i in this.bills) {
                //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                if (this.bills[i].done == 0) {
                    this.totPagar = (parseFloat(this.totPagar) + parseFloat(this.bills[i].value)).toFixed(2);
                }
            }
        });

    },
    methods:{
        excluirConta(){

                Bill.delete({id: this.billToDelete.id}).then((response) => {
                    this.bills.$remove(this.billToDelete);
                    this.billToDelete = null;
                    Materialize.toast('<strong><i class="material-icons left">done</i>Conta excluida com sucesso</strong>',4000,
                        'green lighten-3');
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
        },
        darBaixa(bill){
            this.bill = bill;
            if(this.bill.done==0){
                this.bill.done=1;
                Bill.update({id: this.bill.id},this.bill).then((response) =>{
                    Bill.query().then((response) => {
                        this.bills = response.data;
                        this.totPagar=0;
                        Materialize.toast('<strong><i class="material-icons left">done</i>Baixa realizada com sucesso</strong>',4000,'green lighten-3');
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
                        Materialize.toast('<strong><i class="material-icons left">done</i>Estorno realizado com sucesso</strong>',4000,'green lighten-3');
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
        openModalDelete(bill){
            this.billToDelete = bill;
            $('#modal-delete').openModal();
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
