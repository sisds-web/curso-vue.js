//CRIANDO O COMPONENT MENU
window.billDash = Vue.extend({
    template:`
        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col s6">
                        <div class="card-panel blue accent-2 white-text">
                            <h4>Contas a Receber</h4>
                            <p class="flow-text">Total: R$ {{totalContasReceber | numberFormat 'pt-BR'}}</p>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="card-panel red lighten-2 white-text">
                            <h4>Contas a Pagar</h4>
                            <p class="flow-text">Total: R$ {{totalContasPagar | numberFormat 'pt-BR'}}</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col s6">
                        <div class="card-panel teal accent-3 white-text">
                            <h4>Contas Recebidas</h4>
                            <p class="flow-text">Total: R$ {{totalContasRecebidas | numberFormat 'pt-BR'}}</p>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="card-panel orange accent-3 white-text">
                            <h4>Contas Pagas</h4>
                            <p class="flow-text">Total: R$ {{totalContasPagas | numberFormat 'pt-BR'}}</p>
                        </div>    
                    </div>
                </div>
            </div>
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
        <ul v-bind:id='o.id' class='dropdown-content' v-for="o in menusDropdown">
            <li v-for="item in o.items">
                 <a v-link="{name: item.routeName}">
                    {{item.name}}
                 </a>
            </li>
        </ul>
        <div class="navbar-fixed">
            <nav class="blue-grey lighten-1">
                <div class="nav-wrapper">
                        <a href="#!" class="right hide-on-small-only brand-logo">Code Contas</a>
                        <a href="#" data-activates="mobile-demo" class="button-collapse">
                            <i class="material-icons">menu</i>
                        </a>
                        <ul class="hide-on-med-and-down">
                            <li v-for="o in menus">
                                <a v-if="o.dropdownId" class="dropdown-submenu" href="!#" v-bind:data-activates="o.dropdownId">
                                {{o.name}} <i class="material-icons right">arrow_drop_down</i>
                                </a>
                                <a v-else v-link="{name: o.routeName}">{{o.name}}</a>
                            </li>
                        </ul>
                        <ul class="side-nav" id="mobile-demo">
                            <li v-for="o in menus">
                                <a v-link="{name: o.routeName}">{{o.name}}</a>
                            </li>
                        </ul>
                </div>
            </nav>
        </div>
        <router-view></router-view>
    `,
    created(){
        $(document).ready(function(){
            $(".button-collapse").sideNav();
            $(".dropdown-submenu").dropdown();
        });
    },
    data(){
        return{
            menus:
                [
                    {name: "Contas a Pagar", routeName: 'bill-pays', dropdownId:'bill-pay'},
                    {name: "Contas a Receber", routeName: 'bill-receives', dropdownId:'bill-receive'},
                    {name: "DashBoard", routeName: 'dashboard'}
                ],
            menusDropdown:[
                {
                    id:'bill-pay',items:[
                        {id: 0, name: "Listar Contas", routeName: 'bill-pay.list'},
                        {id: 1, name: "Nova Conta", routeName: 'bill-pay.create'}
                    ]
                },
                {
                    id:'bill-receive',items:[
                        {name: "Listar Contas", routeName: 'bill-receive.list'},
                        {name: "Nova Conta", routeName: 'bill-receive.create'}
                    ]
                }
            ]
        };
    }
});

