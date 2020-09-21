
Provider.directive('ngl-bind', function () {
    return {
        scope: false,
        link: function (el, scope, exp) {
            el.innerHTML = scope.$eval(exp);
            scope.$watch(exp, function (val) {
                el.innerHTML = val;
            });
        }
    };
});

Provider.directive('ngl-click', function () {
    return {
        scope: false,
        link: function (el, scope, exp) {
            el.onclick = function () {
                scope.$eval(exp);
                scope.$digest();
            };
        }
    };
});


Provider.directive('ngl-controller', function () {
    return {
        scope: true,
        link: function (el, scope, exp) {
            var ctrl = Provider.get(exp + Provider.CONTROLLERS_SUFFIX);
            Provider.invoke(ctrl, { $scope: scope });
        }
    };
});
