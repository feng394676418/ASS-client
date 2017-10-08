/**
 * 维修工单
 *
 * Syd
 *
 * 20170802
 */

import fetch from 'utils/fetch';

export function getPartList(query) {
    return fetch({
        url: 'api/channel/getChannelList',
        method: 'post',
        params: query
    });
}

// LIU
export function getChannelCodeList(orderNumber, providerCode) {
    return fetch({
        url: 'api/channel/channel/code_list',
        method: 'get',
        params: { orderNumber, providerCode }
    })
}