/**
 * 日志履历信息获取
 *
 * LIU
 *
 */

import fetch from 'utils/fetch';

export function getLogDetail(orderNumber) {
    return fetch({
        url: 'api/log/history',
        method: 'get',
        params: { orderNumber }
    });
}