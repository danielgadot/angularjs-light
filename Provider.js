// Register Components (directives, services, controllers)
// resolve components dependencies
// Initialize components

// every directive/controller/service is registered and a callback function
let Provider = {
    _providers: {},
    directive: function(name, fn) {
        this._register(name + Provider.DIRECTIVES_SUFFIX, fn);
    },
    controller: function(name, fn) {
        this._register(name + Provider.CONTROLLERS_SUFFIX, function() {
            return fn;
        })
    },
    service: function (name, fn) {
        this._register(name, fn)
    },
    _register: function(name, factory) {
        this._providers[name] = factory
    },
    get: function(name, locals) {
        if (this._cache[name]) {
            return this._cache[name];
        }
        let provider = this._providers[name];
        if (!provider || typeof provider !== 'function') {
            return null;
        }
        return (this._cache[name] = this.invoke(provider, locals));
    },
    annotate: function(fn) {
        var res = fn.toString()
            .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
            .match(/\((.*?)\)/);
        if (res && res[1]) {
            return res[1].split(',').map(function (d) {
                return d.trim();
            });
        }
        return [];
    },
    invoke: function (fn, locals) {
        locals = locals || {};
        let deps = this.annotate(fn).map(function(s) {
            return locals[s] || this.get(s, locals);
        }, this);
        return fn.apply(null, deps);
    },
    // _cache: { $rootScope: new Scope() }
    _cache: {}
};

Provider.DIRECTIVES_SUFFIX = 'Directive';
Provider.CONTROLLERS_SUFFIX = 'Controller';

// module.exports = Provider;
