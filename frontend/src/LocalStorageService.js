// LocalStorageService.js
const LocalStorageService = (function () {
    var _service;
    function _getService() {
        if (!_service) {
            _service = this;
            return _service
        }
        return _service
    }

    function _setUserName(userName) {
        localStorage.setItem('userName', userName);
    }
    function _getUserName() {
        return localStorage.getItem('userName') || '';
    }
    function _clearUserName() {
        localStorage.removeItem('userName');
    }

    function _checkOut() {
        _clearUserName();
    }

    return {
        getService: _getService,
        setUserName: _setUserName,
        getUserName: _getUserName,
        clearUserName: _clearUserName,
        checkOut: _checkOut
    }
})();
export default LocalStorageService;