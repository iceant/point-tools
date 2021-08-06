System.register(["element-plus", './style.css', 'agent-list'], function(_e, _c){
    let ElementPlus;
    let AgentList;
    return {
        setters: [
            function(_){ElementPlus = _;},
            function(_){document.adoptedStyleSheets = [...document.adoptedStyleSheets, _.default];},
            function(_){AgentList = _;}
        ],
        execute: function () {
            const App = {
                data() {
                    return {
                        activeIndex: '1'
                    };
                },
                mounted() {
                    setInterval(() => {
                        this.counter++
                    }, 1000)
                },
                methods:{
                    handleSelect(key, keyPath) {
                        console.log(key, keyPath);
                    }
                }
            }


            const routes=[
                {path:'/agent-list', component: AgentList},
            ]

            const router = VueRouter.createRouter({
                history: VueRouter.createWebHashHistory(),
                routes,
            })

            const app = Vue.createApp(App)
            app.use(router)
            app.use(ElementPlus)
            app.mount('#app')
        }
    };
});