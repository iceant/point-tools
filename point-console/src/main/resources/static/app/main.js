System.register(["element-plus", './style.css', 'agent-list', 'agent-menu'], function(_e, _c){
    let ElementPlus;
    let AgentList;
    let AgentMenu;
    return {
        setters: [
            function(_){ElementPlus = _;},
            function(_){document.adoptedStyleSheets = [...document.adoptedStyleSheets, _.default];},
            function(_){AgentList = _;},
            function(_){AgentMenu = _;}
        ],
        execute: function () {
            //////////////////////////////////////////////////////////////////////
            ////
            const routes=[
                {path:'/agent-list',
                 components:{
                    default:AgentList,
                    aside:AgentMenu
                 }
                },
            ]

            const router = VueRouter.createRouter({
                history: VueRouter.createWebHashHistory(),
                routes,
            })
            //////////////////////////////////////////////////////////////////////
            ////
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
                    onAgents(){
                        this.$router.push('/agent-list');
                    },
                    handleSelect(key, keyPath) {
                        console.log(key, keyPath);
                    }
                }
            }

            //////////////////////////////////////////////////////////////////////
            ////
            const app = Vue.createApp(App)
            app.use(router)
            app.use(ElementPlus)
            app.mount('#app')
        }
    };
});