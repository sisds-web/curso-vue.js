<template>
    <div class="section">
        <div class="container">
            <h4>{{title}}</h4>
        </div>
    </div>
    <router-view></router-view>
</template>

<script type="text/javascript">
    export default {
        data(){
            return {
                title: "Contas a pagar"
            }
        }

    };
</script>


