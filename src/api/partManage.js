/**
 * 配件
 *
 *
 * 20170717
 */

import fetch from 'utils/fetch';

export function getPartList(query) {
    return fetch({
        url: 'api/part/getPartList',
        method: 'post',
        params: query
    });
}

export function getPartInfoList(searchInfo) {
    return fetch({
        url: 'api/part/getPartInfoList',
        methods: 'get',
        params: { searchInfo }
    });
}

export function getPartInfoListByOwner(owner) {
    return fetch({
        url: 'api/part/partInfoListByOwner',
        methods: 'get',
        params: { owner }
    });
}

export function getPartInfoListByPO(partProviderCode, orderNumber) {
    return fetch({
        url: 'api/part/po/partinfo_list',
        methods: 'get',
        params: { partProviderCode, orderNumber }
    });
}

export function addPart(params) {
    return fetch({
        url: 'api/part/addPart',
        method: 'post',
        data: params
    });
}

export function getPartById(params) {
    return fetch({
        url: 'api/part/getPartById',
        method: 'post',
        data: params
    });
}
export function updatePart(params) {
    return fetch({
        url: 'api/part/updatePart',
        method: 'post',
        data: params
    });
}

export function invalidPart(params) {
    return fetch({
        url: 'api/part/invalidPart',
        method: 'post',
        data: params
    });
}

export function validPart(params) {
    console.dir(params);
    return fetch({
        url: 'api/part/validPart',
        method: 'post',
        data: params
    });
}

export function getAllSkuName(providerCode, owner) {
    return fetch({
        url: 'api/part/all/sku/name',
        method: 'get',
        params: { providerCode, owner }
    });
}

export function countPart(params) {
    return fetch({
        url: 'api/part/countPart',
        method: 'post',
        data: params
    });
}

export function getPartExcelUrl(language) {
    return fetch({
        url: 'api/part/getClientExcelUrl',
        methods: 'get',
        params: { language }
    });
}