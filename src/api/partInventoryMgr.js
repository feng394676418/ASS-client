import fetch from 'utils/fetch';

export function getPartInventoryList(query) {
    return fetch({
        url: 'api/partInventory/getPartInventory',
        method: 'post',
        params: query
    });
}

export function getPartInventoryChangeList(query) {
    return fetch({
        url: 'api/partInventory/getPartInventoryChange',
        method: 'post',
        params: query
    });
}

export function getSkuRemnant(sku, providerCode, owner) {
    return fetch({
        url: 'api/inventory/part/apply/remnant',
        method: 'get',
        params: { sku, providerCode, owner }
    });
}

export function expPartInventory(query) {
    return fetch({
        url: 'api/partInventory/expPartInventory',
        method: 'post',
        params : query
    });
}

export function expPartInventoryChange(query) {
    return fetch({
        url: 'api/partInventory/expPartInventoryChange',
        method: 'post',
        params : query
    });
}