window.billPayComponent = Vue.extend({
    template:`
    <div class="section">
        <div class="container">
            <h4>{{title}}</h4>
        </div>
    </div>
     <router-view></router-view>
`,
    data(){
        return {
            title: "Contas a pagar"
        }
    }

});
