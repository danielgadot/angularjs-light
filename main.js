const API = 'https://localhost:8000'

Provider.service('myService', function () {
    return function () {
        return fetch(`${API}/users`);
    }
})

Provider.controller('myCtrl', (myService) => {
    myService()
        .then(() => {
            console.log('Success fetch')
        }, err => console.log('Err Fetch'))
        console.log('myService :: ', myService)
})

console.log(Provider);
var ctrl = Provider.get('myCtrl' + Provider.CONTROLLERS_SUFFIX);
Provider.invoke(ctrl);
