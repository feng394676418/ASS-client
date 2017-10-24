/**
 * WingSing CONFIDENTIAL
 * _____________________
 *
 * [2014] - [2015] WingSing Supply Chain Management Co. (Shenzhen) Ltd.
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains the property of
 * WingSing Supply Chain Management Co. (Shenzhen) Ltd. and its suppliers, if
 * any. The intellectual and technical concepts contained herein are proprietary
 * to WingSing Supply Chain Management Co. (Shenzhen) Ltd. and its suppliers and
 * may be covered by China and Foreign Patents, patents in process, and are
 * protected by trade secret or copyright law. Dissemination of this information
 * or reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from WingSing Supply Chain Management Co. (Shenzhen)
 * Ltd.
 *
 */
/**
 * 用户信息模块
 * dbsix.liu
 * @since 20171016
 */

import fetch from 'utils/fetch';
import md5 from 'js-md5'; // 密码加密

export function updatePassword(form) {
    const userInfoSendDto = {
        oldPassword: md5(form.pass),
        password: md5(form.confirmpass)
    };
    return fetch({
        url: 'api/user/set/security',
        method: 'post',
        data: userInfoSendDto
    });
}

export function checkoldpwd(oldpassword) {
    const userInfoSendDto = {
        oldPassword: md5(oldpassword)
    };
    return fetch({
        url: 'api/user/set/checkoldpwd',
        method: 'post',
        data: userInfoSendDto
    });
}