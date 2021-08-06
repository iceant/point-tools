System.register(['./template.html'], function(_e, _c){
    let template;
    return {
        setters:[function(_){template=_.default}],
        execute:function(){
            _e({
                template:template,
                methods:{
                    handleOpen(){
                        console.log('open...', arguments);
                    },
                    handleClose(){
                        console.log('close...', arguments);
                    },
                    handleSelect(){
                        console.log('click...', arguments);
                    }
                }
            });
        }
    }
});