//CRIANDO O COMPONENT MENU
window.billPayMenuComponent = Vue.extend({
    template:`
        <nav>
            <ul>
                <!-- CARREGANDO MENU DINAMICAMENTE COM LAÇO "v-for" -->
                <li v-for="o in menus">
                    <!-- USANDO EVENDO NO VUE.JE COM "v-on" -->
                    <!-- MODIFICANDO EVENTO NO VUE.JE COM "prevent" -->
                    <!-- PARA SIMPLIFICAR A DECLARAÇÃO DE UM EVENTO NO VUE.JE SUBSTITUIMOS O "v-on" POR UM "@" -->
                    <a v-link="{name: o.routeName}">{{o.name}}</a>
                </li>
            </ul>
        </nav>
    `,
    data(){
        return{
            menus:
                [
                    //{id: 0, name: "Listar Contas", url: '/bills'},
                    //{id: 1, name: "Nova Conta", url: '/bill/create'}
                    {id: 0, name: "Listar Contas", routeName: 'bill-pay.list'},
                    {id: 1, name: "Nova Conta", routeName: 'bill-pay.create'}
                ]
        };
    }
});
