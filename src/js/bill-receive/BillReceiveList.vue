<template>
    <div class="container">
        <div class="row">
            <div class="col s7">
                <div class="card blue-grey lighten-5">
                    <div class="card-content">
                                <span class="flow-text" :class="{'green-text': !status, 'blue-text': status > 0, 'gray-text': status=='n'}">
                                    <b>{{status | nReceive}}</b>
                                </span>
                    </div>
                </div>
            </div>
            <div class="col s5">
                <div class="card z-depth-1">
                    <div class="card-content flow-text right-align">
                        <b>Total: R$ {{totReceber | numberFormat 'pt-BR'}}</b>
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
                        Meus recebimentos
                    </span>
            </div>
        </div>
    </div>
    <div class="container z-depth-1">
        <table class="bordered striped responsive-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th class="center">Recebimento</th>
                    <th class="center">Descrição</th>
                    <th class="center">Valor R$</th>
                    <th class="center">Situação</th>
                    <th class="center">Ações</th>
                </tr>
            </thead>
            <tbody>
            <!-- LISTANDO O CONTEÚDO DINAMICAMENTE COM LAÇO "v-for" -->
            <tr v-for="(index,r) in receives">
                <td class="center">{{index+1}}</td>
                <td class="center">{{ r.date_receipt | dateFormat 'pt-BR' }}</td>
                <td>{{ r.description | upperFormat }}</td>
                <!-- USANDO FILTRO PARA MODIFICAR A VISUALIZAÇÃO DOS MEUS DADOS -->
                <td class="right">{{r.value | numberFormat 'pt-BR' }}</td>
                <!-- USANDO O PROPERT BINDING ":class" PARA DE FORMA DINAMICA A COR DA FONTE -->
                <td class="center white-text" :class="{'green lighten-3': r.done, 'red lighten-3': !r.done}">{{r.done | doneLabelReceive}}</td>
                <td class="center">
                    <a v-link="{name: 'bill-receive.update', params: {id: r.id}}">Editar</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="openModalDelete(r)">Excluir</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="receber(r)">Receber</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="devolver(r)">Devolver</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <modal :modal="modal">
        <div slot="content" v-if="receiveToDelete">
            <h4>Confirmação de exclusão</h4>
            <p class="red-text"><strong>Deseja realmente excluir esta conta?</strong></p>
            <div class="divider"></div>
            <p>Conta: <strong>{{ receiveToDelete.description }}</strong></p>
            <p>Valor: R$ <strong>{{ receiveToDelete.value | numberFormat 'pt-BR'}}</strong></p>
            <p>Recebimento: <strong>{{ receiveToDelete.date_receipt | dateFormat 'pt-BR' }}</strong></p>
            <div class="divider"></div>
        </div>
        <div slot="footer">
            <button class="btn modal-action modal-close waves-effect green lighten-4 btn-flat" @click="excluirConta()">OK</button>
            <button class="btn modal-action modal-close waves-effect red lighten-4 btn-flat">Cancelar</button>
        </div>
    </modal>
</template>

<script type="text/javascript">
    import {Receive} from '../resources';
    import modalComponent from '../Modal.vue';

    export default {
        components:{
            'modal': modalComponent
        },
        data(){
            return{
                receives: [],
                totReceber: 0,
                receiveToDelete: null,
                modal:{
                    id: 'modal-delete'
                }
            };
        },
        created(){
            //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX USANDO RESOURCE
            Receive.query().then((response) => {
                this.receives = response.data;
                for (var i in this.receives) {
                    //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                    if (this.receives[i].done == 0) {
                        this.totReceber = (parseFloat(this.totReceber) + parseFloat(this.receives[i].value)).toFixed(2);
                    }
                }
            });
        },
        methods:{
            excluirConta(){
                Receive.delete({id: this.receiveToDelete.id}).then((response) => {
                    this.receives.$remove(this.receiveToDelete);
                    this.receiveToDelete = null;
                    Materialize.toast('<strong><i class="material-icons left">done</i>Conta excluida com sucesso</strong>',4000,
                            'green lighten-3');
                    Receive.query().then((response) => {
                        this.receives = response.data;
                        this.totReceber =0;
                        for (var i in this.receives) {
                            //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                            if (this.receives[i].done == 0) {
                                this.totReceber = (parseFloat(this.totReceber) + parseFloat(this.receives[i].value)).toFixed(2);
                            }
                        }
                    });
                });
            },
            receber(obj){
                this.receive = obj;
                if(this.receive.done==0) {
                    this.receive.done = 1;
                    Receive.update({id: this.receive.id}, this.receive).then((response) => {
                        Receive.query().then((response) => {
                            this.receives = response.data;
                            this.totReceber = 0;
                            Materialize.toast('<strong><i class="material-icons left">done</i>Recebimento realizado com sucesso</strong>', 4000, 'green lighten-3');
                            for (var i in this.receives) {
                                //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                                if (this.receives[i].done == 0) {
                                    this.totReceber = (parseFloat(this.totReceber) + parseFloat(this.receives[i].value)).toFixed(2);
                                }
                            }
                        });
                    });
                }
            },
            devolver(obj){
                this.receive = obj;
                if(this.receive.done==1) {
                    this.receive.done = 0;
                    Receive.update({id: this.receive.id}, this.receive).then((response) => {
                        Receive.query().then((response) => {
                            this.receives = response.data;
                            this.totReceber = 0;
                            Materialize.toast('<strong><i class="material-icons left">done</i>Estorno realizado com sucesso</strong>', 4000, 'green lighten-3');
                            for (var i in this.receives) {
                                //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                                if (this.receives[i].done == 0) {
                                    this.totReceber = (parseFloat(this.totReceber) + parseFloat(this.receives[i].value)).toFixed(2);
                                }
                            }
                        });
                    });
                }
            },
            openModalDelete(receive){
                this.receiveToDelete = receive;
                $('#modal-delete').openModal();
            }
        },
        // AQUI SÃO COLOCADAS AS FUNÇÕES QUE EXIBIRÃO E TRATARÃO CONTEÚDOS DINAMICAMENTE
        computed:{
            status(){
                let count=0;
                for(var i in this.receives){
                    if(!this.receives[i].done){
                        count++;
                    }
                }
                if(this.receives.length==0){
                    return 'n';
                }else{
                    return count;
                }
            },
        }
    };
</script>