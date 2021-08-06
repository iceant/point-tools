System.register(["element-plus", './style.css'], function(_e, _c){
    var ElementPlus
    var Style;
    return {
        setters: [function(_){ElementPlus = _;}, function(_){document.adoptedStyleSheets = [...document.adoptedStyleSheets, _.default];}],
        execute: function () {
            const App = {
                data() {
                    const item = {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    };
                    return {
                        tableData: Array(20).fill(item)
                    }
                },
                mounted() {
                    setInterval(() => {
                        this.counter++
                    }, 1000)
                }
            }

            const app = Vue.createApp(App)
            app.use(ElementPlus)
            app.mount('#app')
        }
    };
});