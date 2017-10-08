/**
 * 维修工单
 *
 * LIU
 *
 * 20170717
 */

import fetch from 'utils/fetch';

export function getList(providerCode) {
    return fetch({
        url: 'api/morder/provider/list',
        method: 'get',
        params: { providerCode }
    });
}

export function getOrderList(query) {
    return fetch({
        url: 'api/morder/getOrderList',
        method: 'get',
        params: query
    });
}

export function addOrder(params) {
    return fetch({
        url: 'api/morder/addOrder',
        method: 'post',
        data: params
    });
}

// 更新工单
export function updateOrder(params) {
    return fetch({
        url: 'api/morder/editOrder',
        method: 'patch',
        data: params
    });
}

export function lockOrder(params) {
    return fetch({
        url: 'api/morder/lockOrder',
        method: 'post',
        data: params
    });
}

export function deleteOrder(params) {
    return fetch({
        url: 'api/morder/deleteOrder',
        method: 'post',
        data: params
    });
}

export function getOrderNumByStatus(params) {
    return fetch({
        url: 'api/morder/getOrderNumByStatus',
        method: 'post',
        data: params
    });
}


export function expOrder(query) {
    return fetch({
        url: 'api/morder/expOrder',
        method: 'get',
        params: query
    });
}

export function getOrderByOrderNumber(query) {
    return fetch({
        url: 'api/morder/getOrderByOrderNumber',
        method: 'get',
        params: query
    });
}

export function checkOrderExist(refNumber, providerCode) {
    return fetch({
        url: 'api/morder/order/exist',
        method: 'get',
        params: { refNumber, providerCode }
    })
}