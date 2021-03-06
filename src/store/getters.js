const getters = {
    sidebar: state => state.app.sidebar,
    visitedViews: state => state.app.visitedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    uid: state => state.user.uid,
    email: state => state.user.email,
    introduction: state => state.user.introduction,
    auth_type: state => state.user.auth_type,
    status: state => state.user.status,
    roles: state => state.user.roles,
    setting: state => state.user.setting,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    providerCode: state => state.user.providerCode, // 服务商系统1
    owner: state => state.user.owner, // 弃用
    authorize_code: state => state.user.authorize_code,
    oauth_js_id: state => state.user.oauth_js_id
};

export default getters