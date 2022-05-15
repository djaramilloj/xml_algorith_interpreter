import { ConfigurationsFormat } from "../utils/models";

export const CONFIG_CASE_3: ConfigurationsFormat = {
    created: 'file_transmission_date',
    shipperReferenceNumber: 'order_reference',
    'pickup/fullAddress': 'pickup_address',
    'pickup/zipcode': 'pickup_zipcode',
    'pickup/country': 'pickup_country',
    'destination/fullAddress': 'delivery_address',
    'destination/zipcode': 'delivery_zipcode',
    'destination/country': 'delivery_country'
}