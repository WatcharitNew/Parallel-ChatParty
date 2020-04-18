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

    function _setUserID(userID) {
        localStorage.setItem('userID', userID);
    }
    function _getUserID() {
        return localStorage.getItem('userID') || '';
    }
    function _clearUserID() {
        localStorage.removeItem('userID');
    }

    function _checkOut() {
        _clearUserName();
        _clearUserID();
    }

    return {
        getService: _getService,
        setUserName: _setUserName,
        getUserName: _getUserName,
        clearUserName: _clearUserName,
        setUserID: _setUserID,
        getUserID: _getUserID,
        clearUserID: _clearUserID,
        checkOut: _checkOut
    }
})();
export default LocalStorageService;