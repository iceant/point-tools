(function(global) {
    let systemJSPrototype = global.System.constructor.prototype;

    var htmlContentType = /^text\/html(;|$)/;

    var fetch = systemJSPrototype.fetch;
    systemJSPrototype.fetch = function (url, options) {
        return fetch(url, options)
            .then(function (res) {
                if (!res.ok)
                    return res;
                var contentType = res.headers.get('content-type');
                if (htmlContentType.test(contentType))
                    return res.text()
                        .then(function (source) {
                            return new Response(new Blob([
                                'System.register([],function(e){return{execute:function(){e("default",'+JSON.stringify(source)+')}}})'
                            ], {
                                type: 'application/javascript'
                            }));
                        });
                return res;
            });
    };
})(typeof self !== 'undefined' ? self : global);