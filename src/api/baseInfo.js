/**
 * 基础信息
 *
 * LIU
 *
 * 20170717
 */

import fetch from 'utils/fetch';
import moment from 'moment';

export function getBaseInfo(orderNumber) {
    return fetch({
        url: 'api/baseInfo/detail',
        method: 'get',
        params: { orderNumber }
    });
}

export function updateBaseInfo(acceptForm) {
    const data = {
        orderNumber: acceptForm.orderNumber,
        emergencyName: acceptForm.emergencyName,
        emergencyPhone: acceptForm.emergencyPhone,
        orderTime: acceptForm.orderTime === '' ? '' : moment(acceptForm.orderTime).format('YYYY-MM-DD HH:mm:ss'),
        color: acceptForm.color,
        appearance: acceptForm.appearance,
        partsStatus: acceptForm.partsStatus,
        repairId: acceptForm.repairId,
        partsOther: acceptForm.partsOther,
        appearanceInfo: acceptForm.appearanceInfo,
        remark: acceptForm.remark,
        orderStatus: acceptForm.orderStatus,
        userId: acceptForm.userId
    };
    console.log(data.orderTime);
    return fetch({
        url: 'api/baseInfo/accept/update',
        method: 'post',
        data
    });
}

export function updateTradeNumber(orderNumber, uid, tradeNumber) {
    return fetch({
        url: 'api/baseInfo/trade/number',
        method: 'patch',
        params: { orderNumber, uid, tradeNumber }
    });
}

export function sendOrder(orderAddrForm) {
    const data = {
        uid: orderAddrForm.uid,
        orderNumber: orderAddrForm.orderNumber,
        country: orderAddrForm.country === null ? '' : orderAddrForm.country.trim(),
        countryCode: orderAddrForm.countryCode === null ? '' : orderAddrForm.countryCode.trim(),
        province: orderAddrForm.province === null ? '' : orderAddrForm.province.trim(),
        provinceCode: orderAddrForm.provinceCode === null || orderAddrForm.provinceCode === undefined ? '' : orderAddrForm.provinceCode.trim(),
        city: orderAddrForm.city === null ? '' : orderAddrForm.city.trim(),
        postcode: orderAddrForm.postcode === null ? '' : orderAddrForm.postcode.trim(),
        addressDetail: orderAddrForm.addressDetail === null ? '' : orderAddrForm.addressDetail.trim(),
        sendExpresscode: orderAddrForm.sendExpresscode
    };
    return fetch({
        url: 'api/order/action/send',
        method: 'patch',
        data
    });
}

export function orderOver(orderNumber, uid) {
    return fetch({
        url: 'api/baseInfo/over/order',
        method: 'patch',
        params: { orderNumber, uid }
    });
}