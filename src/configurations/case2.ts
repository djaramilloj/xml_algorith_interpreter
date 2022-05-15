import { ConfigurationsFormat } from "../utils/models";

export const configurations: ConfigurationsFormat = {
    created: 'transmissionDate',
    shipperReferenceNumber: 'referenceNumber',
    'pickup/fullAddress': 'pickup/fullAddress',
    'pickup/zipcode': 'pickup/zipcode',
    'pickup/country': 'pickup/country',
    'destination/fullAddress': 'delivery/fullAddress',
    'destination/zipcode': 'delivery/zipcode',
    'destination/country': 'delivery/country'
}