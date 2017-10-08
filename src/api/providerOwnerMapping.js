import fetch from 'utils/fetch';

export function getOwnerList(query) {
    return fetch({
        url: 'api/providerOwnerMapping/getOwnerList',
        method: 'post',
        params : query
    });
}