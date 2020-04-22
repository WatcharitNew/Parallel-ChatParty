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

    function _setChatRoomID(chatRoomID) {
        sessionStorage.setItem('chatRoomID', chatRoomID);
    }
    function _getChatRoomID() {
        return sessionStorage.getItem('chatRoomID') || '';
    }
    function _clearChatRoomID() {
        sessionStorage.removeItem('chatRoomID');
    }

    function _checkOut() {
        _clearUserName();
        _clearUserID();
        _clearChatRoomID();
    }

    return {
        getService: _getService,
        setUserName: _setUserName,
        getUserName: _getUserName,
        clearUserName: _clearUserName,
        setUserID: _setUserID,
        getUserID: _getUserID,
        clearUserID: _clearUserID,
        setChatRoomID: _setChatRoomID,
        getChatRoomID: _getChatRoomID,
        clearChatRoomID: _clearChatRoomID,
        checkOut: _checkOut
    }
})();
export default SessionStorageService;