export enum EMainEndpoint {
    authentication = '/api/auth/',
    security = '/api/security/',
    api = '/api/api/'
}

export enum EFieldEndpoint {
    register = 'register',
    login = 'login',
    getCurrentUser = 'getCurrentUser',
    user = 'User',
    relationship = "Relationship",
    friend = 'Friend',
    sendFriendRequest = 'sendFriendRequest',
    getRelationships = '/relationships',
    notifications = 'Notification'
}