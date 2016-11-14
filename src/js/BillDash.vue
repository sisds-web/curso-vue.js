<template>
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
</template>

<script type="text/javascript">
    import {Bill,Receive} from './resources';

    export default {
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
    };
</script>