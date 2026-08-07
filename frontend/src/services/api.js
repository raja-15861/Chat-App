const baseUrl="https://chat-app-jrjq.onrender.com";


export const authEndpoints={
    SIGNUP_API:baseUrl+'/auth/api/signup',
    LOGIN_API:baseUrl+'/auth/api/login',
    LOGOUT_API:baseUrl+'/auth/api/logout',
    UPDATE_PROFILE_API:baseUrl+'/auth/api/update-profile',
    CHECK_API:baseUrl+'/auth/api/check'
}

export const messageEndpoint={
    SEND_MESSAGE_API:baseUrl+'/message/api/send',
    GET_ALL_USERS_API:baseUrl+'/message/api/users',
    GET_MESSAGE_API:baseUrl+'/message/api/'
}
