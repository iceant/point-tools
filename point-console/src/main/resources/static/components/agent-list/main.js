System.register(['./template.html'], function(_e, _c){
    let template;
    return {
        setters:[function(_){template=_.default}],
        execute:function(){
            let data = [];
            _e({
                template: template,
                data() {
                    return {
                        tableData: []
                    }
                },
                beforeCreate(){
                    let self = this;
                    axios.get('/api/agent/v1/list').then(function(response){
                        self.tableData = response.data.data;
                    }).catch(error=>console.log(error));
                }
            });
        }
    }

});