System.register([], function(_e, _c){
    return {
        setters:[],
        execute:function(){
            _e({
                append:function(sheet){
                    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
                }
            });
        }
    }
});