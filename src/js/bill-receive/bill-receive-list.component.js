//COMPONENT LISTAGEM
window.billReceiveListComponent = Vue.extend({
    template:`
        <style type="text/css">
            .recebido{
                color:green;
            }
            .nao-recebido{
                color:blue;
            }
            .nao-cadastro{
                color:gray;
            }
        </style>

        <h3 :class="{'recebido': !status, 'nao-recebido': status > 0, 'nao-cadastro': status=='n'}">{{status | nReceive}}</h3>
        <table cellpadding="10">
            <header>
                <tr>
                    <th>#</th>
                    <th>Recebimento</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Situação</th>
                    <th>Ações</th>
                </tr>
            </header>
            <body>
            <!-- LISTANDO O CONTEÚDO DINAMICAMENTE COM LAÇO "v-for" -->
            <tr v-for="(index,r) in receives">
                <td>{{index+1}}</td>
                <td>{{ r.date_receipt | dateFormat 'pt-BR' }}</td>
                <td>{{ r.description | upperFormat }}</td>
                <!-- USANDO FILTRO PARA MODIFICAR A VISUALIZAÇÃO DOS MEUS DADOS -->
                <td>{{r.value | numberFormat 'pt-BR' }}</td>
                <!-- USANDO O PROPERT BINDING ":class" PARA DE FORMA DINAMICA A COR DA FONTE -->
                <td :class="{'recebido': r.done, 'nao-recebido': !r.done}">{{r.done | doneLabelReceive}}</td>
                <td>
                    <a v-link="{name: 'bill-receive.update', params: {id: r.id}}">Editar</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="excluirConta(r)">Excluir</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="receber(r)">Receber</a>&nbsp;&nbsp;
                    <a href="#" @click.prevent="devolver(r)">Devolver</a>
                </td>
            </tr>
            </body>
        </table>
    `,
    data(){
        return{
            receives: []
        };
    },
    created(){
        //RECUPERANDO OS DADOS DA API DE SERVIÇO VIA AJAX USANDO RESOURCE
        Receive.query().then((response) => {
            this.receives = response.data;
        });
    },
    methods:{
        excluirConta(receive){
            let resp = confirm("Deseja Realmente Excluir o recebimento?");
            if (resp == true) {
                Receive.delete({id: receive.id}).then((response) => {
                    this.receives.$remove(receive);
                });
            } else {
                return false;
            }
        },
        receber(obj){
            this.receive = obj;
            this.receive.done=1;
            Receive.update({id: this.receive.id},this.receive).then((response) => {

            });
        },
        devolver(obj){
            this.receive = obj;
            this.receive.done=0;
            Receive.update({id: this.receive.id},this.receive).then((response) => {

            });
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
});
//FIM COMPONENT LISTAGEM
