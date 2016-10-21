//CRIANDO O COMPONENT MENU
window.billDash = Vue.extend({
    template:`
        <div>
        <h2>Contas a Receber e Recebidas</h2>
        <span>Total Contas a Resceber: R$ {{totalContasReceber}}</span><br>
        <span>Total Contas Recebidas: R$ {{totalContasRecebidas}}</span><br><br>
        <h2>Contas a Pagar e Pagas</h2>
        <span>Total Contas a Pagar: R$ {{totalContasPagar}}<span><br>
        <span>Total Contas Pagas: R$ {{totalContasPagas}}<span>
        </div>   
    `,
    data(){
        return{
           totalContasPagar: 0,
           totalContasPagas: 0,
           totalContasReceber: 0,
           totalContasRecebidas: 0
        };
    },
    created(){

        Bill.query().then((response) => {
            this.bills = response.data;
            for (var i in this.bills) {
                //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                if (this.bills[i].done == 0) {
                    this.totalContasPagar = (parseFloat(this.totalContasPagar) + parseFloat(this.bills[i].value)).toFixed(2);
                }else{
                    this.totalContasPagas = (parseFloat(this.totalContasPagas) + parseFloat(this.bills[i].value)).toFixed(2);
                }
            }
        });

        Receive.query().then((response) =>{
            this.receives = response.data;
            for (var i in this.receives) {
                //TOTAL DE CONTAS PAGAS E CONTAS A PAGAR
                if (this.receives[i].done == 0) {
                    this.totalContasReceber = (parseFloat(this.totalContasReceber) + parseFloat(this.receives[i].value)).toFixed(2);
                }else{
                    this.totalContasRecebidas = (parseFloat(this.totalContasRecebidas) + parseFloat(this.receives[i].value)).toFixed(2);
                }
            }
        });

    }
});

window.billComponent = Vue.extend({
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
        <router-view></router-view>
    `,
    data(){
        return{
            menus:
                [
                    {name: "Contas a Pagar", routeName: 'bill-pays'},
                    {name: "Contas a Receber", routeName: 'bill-receives'},
                    {name: "DashBoard", routeName: 'dashboard'}
                ]
        };
    }
});
