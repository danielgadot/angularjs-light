const API = 'https://localhost:8000'

Provider.service('myService', function () {
    return function () {
        return fetch(`${API}/users`);
    }
})


Provider.controller('MainCtrl', ($scope) => {
    // myService()
    //     .then(() => {
    //         console.log('Success fetch')
    $scope.bar = 0;

    $scope.foo = function () {
        $scope.bar += 1;
        //     }, err => console.log('Err Fetch'))
        console.log('$scope :: ', $scope);
    };
})
DOMCompiler.bootstrap()

// var ctrl = Provider.get('MainCtrl' + Provider.CONTROLLERS_SUFFIX, {});
// Provider.invoke(ctrl);


console.log(Provider);
