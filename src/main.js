let router = new VueRouter();

router.map({
    '/':{
        name: 'dashboard',
        component: billDash
    },
    '/bill-pays':{
        name: 'bill-pays',
        component: billPayComponent,
        subRoutes:{
            '/':{
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create':{
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:id/update':{
                name: 'bill-pay.update',
                component: billPayCreateComponent
            },
            '*':{
                component: billPayListComponent
            }
        }
    },
    '/bill-receives':{
        name: 'bill-receives',
        component: billReceiveComponent,
        subRoutes:{
            '/':{
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create':{
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:id/update':{
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            },
            '*':{
                component: billReceiveListComponent
            }
        }
    }


});

router.start({
    components: {
        'app-component': appComponent
    }
},'#app');

router.redirect({
    component: billDash
});