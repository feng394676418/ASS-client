import fetch from 'utils/fetch';

export function getStockOrderList(query) {
    return fetch({
        url: 'api/stockOrder/getStockOrderList',
        method: 'post',
        params : query
    });
}

export function getStockOrderDetail(query){
    return fetch({
        url: 'api/stockOrder/getStockOrderDetail',
        method: 'post',
        params : query
    });
}

export function expStockOrder(query) {
    return fetch({
        url: 'api/stockOrder/expStockOrder',
        method: 'post',
        params : query
    });
}