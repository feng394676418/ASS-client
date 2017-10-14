/**
 * 机型管理
 */
import fetch from 'utils/fetch';

export function getModelList(query) {
    return fetch({
        url: 'api/modelClient/queryModelList',
        method: 'get',
        params: query
    });
}

export function queryOwner() {
    return fetch({
        url: 'api/modelClient/queryOwner',
        method: 'get'
    });
}

export function queryModelByCode(code) {
    return fetch({
        url: 'api/modelClient/queryModelByCode',
        method: 'get',
        params: { code }
    });
}

export function addModel(params) {
    return fetch({
        url: 'api/modelClient/addModel',
        method: 'post',
        data: params
    });
}

export function updateModel(params) {
    return fetch({
        url: 'api/modelClient/updateModel',
        method: 'post',
        data: params
    });
}

export function modelEffect(param) {
    return fetch({
        url: 'api/modelClient/modelEffect',
        method: 'post',
        data: param
    });
}

export function modelInvalid(param) {
    return fetch({
        url: 'api/modelClient/modelInvalid',
        method: 'post',
        data: param
    });
}