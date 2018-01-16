/**
 * 报告信息提交
 *
 * 20170726
 *
 * LIU
 *
 */

import fetch from 'utils/fetch';


export function checkReportUpdate(checkReportForm) {
    const data = {
        orderNumber: checkReportForm.orderNumber,
        productType: checkReportForm.productType,
        productTypeCfm: checkReportForm.productTypeCfm,
        imei: checkReportForm.imei,
        imeiCfm: checkReportForm.imeiCfm,
        causeInfo: checkReportForm.causeInfo,
        serviceType: checkReportForm.serviceType,
        repairLevel: checkReportForm.repairLevel.toString(),
        collectionCost: checkReportForm.collectionCost, // 收件总价格
        partsCost: checkReportForm.partsCost, // 配件总价格
        mailingCost: checkReportForm.mailingCost, // 发件总价格
        repairCost: checkReportForm.repairCost, // 维修总价格
        photoGrpurl: checkReportForm.photoGrpurl.toString(),
        createUser: checkReportForm.createUser,
        orderPartList: checkReportForm.orderPartList
    };
    return fetch({
        url: 'api/check/report/update',
        method: 'post',
        data
    });
}

export function confirmQuotesUpdate(orderNumber, uid) {
    return fetch({
        url: 'api/check/report/confirm_quotes',
        method: 'patch',
        params: { orderNumber, uid }
    });
}

export function testOrder(testReportForm) {
    const data = {
        orderNumber: testReportForm.orderNumber,
        repairOK: testReportForm.repairOK,
        confirmOK: testReportForm.confirmOK,
        confirmUser: testReportForm.confirmUser
    };
    return fetch({
        url: 'api/order/test/report',
        method: 'patch',
        data
    });
}

export function maintain(orderNumber, uid) {
    return fetch({
        url: 'api/check/report/maintain',
        method: 'patch',
        params: { orderNumber, uid }
    });
}

export function repair(repairForm) {
    const data = {
        list: repairForm.actualOrderPartList,
        orderNumber: repairForm.orderNumber,
        serviceType: repairForm.serviceType,
        createUser: repairForm.createUser
    };
    return fetch({
        url: 'api/check/report/repair',
        method: 'patch',
        data
    });
}