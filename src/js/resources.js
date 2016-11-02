Vue.http.options.root = "http://localhost:8001/api";

window.Bill = Vue.resource('bills{/id}');
window.Receive = Vue.resource('receives{/id}');