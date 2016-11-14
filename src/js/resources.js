Vue.http.options.root = "http://localhost:8001/api";

let BillResource = Vue.resource('bills{/id}');
let ReceiveResource = Vue.resource('receives{/id}');

export {BillResource as Bill,ReceiveResource as Receive}