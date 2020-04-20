// SessionStorageService.js
const SessionStorageService = (function () {
    var _service;
    function _getService() {
        if (!_service) {
            _service = this;
            return _service
        }
        return _service
    }

    function _setUserName(userName) {
        sessionStorage.setItem('userName', userName);
    }
    function _getUserName() {
        return sessionStorage.getItem('userName') || '';
    }
    function _clearUserName() {
        sessionStorage.removeItem('userName');
    }

    function _setUserID(userID) {
        sessionStorage.setItem('userID', userID);
    }
    function _getUserID() {
        return sessionStorage.getItem('userID') || '';
    }
    function _clearUserID() {
        sessionStorage.removeItem('userID');
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
export default SessionStorageService;