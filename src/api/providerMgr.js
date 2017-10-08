/**
 * 维修工单
 *
 * LIU
 *
 * 20170717
 */

import fetch from 'utils/fetch';

export function getOwnerList(providerCode) {
    return fetch({
        url: 'api/provider/provider/owner/list',
        method: 'get',
        params: {
            providerCode
        }
    });
}

export function getOwnerOutterCodeList(providerCode) {
    return fetch({
        url: 'api/provider/owner/outter/code/list',
        method: 'get',
        params: {
            providerCode
        }
    });
}