import fetch from 'utils/fetch';

export function loginByEmail(username, password) {
    const data = {
        username,
        password,
        clientid: '3afddd82-846b-4445-9380-46df7db78c90', // 客户端ID
        // authorizationuri: 'http://192.168.81.250:9966/authorize', // 校验授权码获取uri
        authorizationuri: 'http://47.91.78.238:9966/authorize', // 生产授权码获取uri
        redirecturi: 'http://localhost:9901/' // 保留 暂未利用
    };
    return fetch({
        url: 'api/user/login/loginbyemail',
        // url: '/login/loginbyemail',
        method: 'post',
        data
    });
}

export function logout() {
    return fetch({
        url: 'api/user/login/logout',
        method: 'post'
    });
}

export function getInfo(code, oauth_js_id, userName) {
    const oauth2AuthcInfo = { // oauth2配置
        clientId: '3afddd82-846b-4445-9380-46df7db78c90',
        clientSecret: '3223dbe57917b942f740630b230014c4',
        // accessTokenUri: 'http://192.168.81.250:9966/accessToken', // 校验环境地址
        // userInfoUri: 'http://192.168.81.250:9966/userInfo', // 校验环境地址
        accessTokenUri: 'http://47.91.78.238:9966/accessToken', // 生产地址
        userInfoUri: 'http://47.91.78.238:9966/userInfo', // 生产地址
        redirectUri: 'http://localhost:9902/', // 保留 暂时未用
        no_redirect: 'true' // VUE 利用特别配置
    }

    return fetch({
        // url: 'api/user/getInfo',
        url: 'api/oauth2Authc',
        method: 'get',
        params: {
            code,
            client_id: oauth2AuthcInfo.clientId,
            client_secret: oauth2AuthcInfo.clientSecret,
            access_token_uri: oauth2AuthcInfo.accessTokenUri,
            user_info_uri: oauth2AuthcInfo.userInfoUri,
            redirect_uri: oauth2AuthcInfo.redirectUri,
            no_redirect: oauth2AuthcInfo.no_redirect,
            oauth_js_id: oauth_js_id.toString(),
            username: userName.toString()
        }
    });
}