/**
 * 备件申请用
 *
 * LIU
 */

import fetch from 'utils/fetch';

export function createApplyStockOrder(stockOrderForm) {
    const data = {
        owner: stockOrderForm.owner,
        providercode: stockOrderForm.providercode,
        warehousecode: '',
        logisticscode: '',
        createuser: stockOrderForm.createuser,
        stockDetailList: stockOrderForm.stockDetailList
    };
    return fetch({
        url: 'api/create/apply/stock/in/new',
        method: 'post',
        data
    });
}

// 服务商CODE必要
export function listApplyInStockOrder(queryInfo) {
    return fetch({
        url: 'api/create/apply/stock/in/list',
        method: 'get',
        params: queryInfo
    })
}

// 服务商CODE必要
export function applyStockOrderListByOdrNumber(odrNumber, providerCode) {
    return fetch({
        url: 'api/create/apply/stock/in/list/order',
        method: 'get',
        params: { odrNumber, providerCode }
    });
}


// 备件申请基础信息
export function getBaseInfo(stockOrderNumber) {
    return fetch({
        url: 'api/create/apply/stock/baseinfo',
        method: 'get',
        params: {
            stockOrderNumber
        }
    });
}

// 服务商确认收货 申请备件信息->备件信息表转移
export function takeOrder(inStockOrderForm) {
    // const data = {
    //     stockOrderNumber: inStockOrderForm.stockOrderNumber,
    //     uid: inStockOrderForm.uid
    // };

    return fetch({
        url: 'api/create/apply/stock/take/order',
        method: 'post',
        data: inStockOrderForm
    });
}