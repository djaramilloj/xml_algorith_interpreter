import { ConfigurationsFormat } from "../utils/models";

export const CONFIG_CASE_2: ConfigurationsFormat = {
    created: 'transmissionDate',
    shipperReferenceNumber: 'referenceNumber',
    'pickup/fullAddress': 'pickup/fullAddress',
    'pickup/zipcode': 'pickup/zipcode',
    'pickup/country': 'pickup/country',
    'destination/fullAddress': 'delivery/fullAddress',
    'destination/zipcode': 'delivery/zipcode',
    'destination/country': 'delivery/country'
}