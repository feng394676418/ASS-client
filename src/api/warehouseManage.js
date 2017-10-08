/**
 * 仓库管理
 *
 * 2017/08/16
 */
import fetch from 'utils/fetch';

export function getWareHouseList(query) {
    return fetch({
        url: 'api/warehouse/wareHouseList',
        method: 'post',
        params: query
    });
}

export function getCountryList() {
  return fetch({
    url: 'api/country/getCountryInfo',
    method: 'get'
  });
}

export function getStateList(countryId) {
  return fetch({
    url: 'api/country/getStateInfo',
    method: 'get',
    params: { countryId }
  })
}

export function getCityList(stateId) {
  return fetch({
    url: 'api/country/getCityInfo',
    method: 'get',
    params: { stateId }
  })
}

export function addWarehouse(params) {
    return fetch({
        url: 'api/warehouse/addWareHouse',
        method: 'post',
        data: params
    });
}

export function getWarehouseByCode(code) {
    return fetch({
        url: 'api/warehouse/getWarehouseByCode',
        method: 'get',
        params: { code }
    });
}

export function updateWarehouse(params) {
    return fetch({
        url: 'api/warehouse/updateWarehouse',
        method: 'post',
        data: params
    });
}

export function handleEnable(param) {
    return fetch({
        url: 'api/warehouse/upWarehouseEnable',
        method: 'post',
        data: param
    });
}

export function handleDisable(param) {
    return fetch({
        url: 'api/warehouse/upWarehouseDisable',
        method: 'post',
        data: param
    });
}
