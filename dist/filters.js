"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// CRIANDO FILTRO MODIFICADOR PARA VISUALIZAÇÃO DOS DADOS NA VIEW

Vue.filter('doneLabel', function (value) {
    return value == 0 ? "EM ABERTO" : "PAGO";
});

Vue.filter('doneLabelReceive', function (value) {
    return value == 0 ? "PENDENTE" : "RECEBIDO";
});

Vue.filter('nContas', function (value) {

    if (value == 0) {
        return "Nenhuma conta a pagar.";
    } else if (value > 0) {
        return "Existem " + value + " contas a serem pagas.";
    } else {
        return "Nenhuma conta cadastrada.";
    }
});

Vue.filter('nReceive', function (value) {
    if (value == 0) {
        return "Nenhuma conta a receber.";
    } else if (value > 0) {
        return "Existem " + value + " contas a receber.";
    } else {
        return "Nenhuma recebimento cadastrado.";
    }
});

//FILTRO PARA FORMATAÇÃO DE VALOR MONETÁRIO
Vue.filter('numberFormat', {
    read: function read(value, tipo) {
        //FORMATAÇÃO PARA SER MOSTRADA NA VIEW
        var number = 0;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            number = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g)[0] || 0; // EXPRESSÃO REGULAR PARA FORMATAR COM 2 CASAS DECIMAIS
        }
        return new Intl.NumberFormat(tipo, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    },
    write: function write(value) {
        var number = 0;
        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

//FILTRO PARA FORMATAÇÃO DE DATA
Vue.filter('dateFormat', {
    read: function read(value, tipo) {
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            if (!(value instanceof Date)) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex : null;
                if (dateString) {
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return value;
                }
            }
            return value.toLocaleString(tipo).split(' ')[0];
        }
        return value;
    },
    write: function write(value) {
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            if (!isNaN(date.getTime())) {
                return date;
            }
        } else {
            return value;
        }
        return value;
    }
});

//FILTRO PARA FORMATAÇÃO EM MAIUSCULA
Vue.filter('upperFormat', {
    read: function read(value) {
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            return value.toUpperCase();
        }
    }
});