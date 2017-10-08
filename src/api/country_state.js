import fetch from 'utils/fetch';

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