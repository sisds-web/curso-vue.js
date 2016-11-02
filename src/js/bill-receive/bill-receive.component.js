window.billReceiveComponent = Vue.extend({
    components:{
        'bill-receive-menu-component': billReceiveMenuComponent
    },
    template:`
    <h1>{{title}}</h1>
    <!-- CHAMANDO O COMPONENT MENU -->
    
    
    <bill-receive-menu-component></bill-receive-menu-component>
    <router-view></router-view>
    
    
    <!-- ESTRUTURA CONDICIONAL "v-if" SO CARREGA O HTML SE A CONDIÇÃO FOR SATISFATORIA-->
     <!-- ESTRUTURA CONDICIONAL "v-show" CARREGA O HTML E O MANTEM ESCONDIDO-->
    <!--<div v-show="activedView == 0">
    <!-- ESTRUTURA "v-ref" CRIA UMA REFERENCIA DO COMPONENT QUE PODE SER RECUPERADA DENTRO DE UM OURO COMPONENT
        <bill-list-component v-ref:bill-list-component></bill-list-component>
    </div>
    <div v-show="activedView == 1">
        <form-component :bill.sync="bill" ></form-component>
    </div>-->
`,
    data(){
    return {
        title: "Contas a receber"
    }
}

});
