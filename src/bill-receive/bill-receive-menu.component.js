//CRIANDO O COMPONENT MENU
window.billReceiveMenuComponent = Vue.extend({
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
                    {name: "Listar Contas", routeName: 'bill-receive.list'},
                    {name: "Nova Conta", routeName: 'bill-receive.create'}
                ]
        };
    }
});
