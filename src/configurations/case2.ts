import { ConfigurationsFormat } from "../utils/models";

export const CONFIG_CASE_2: ConfigurationsFormat = {
    'newOrder/created': 'shipment/baseData/transmissionDate',
    'newOrder/shipperReferenceNumber': 'shipment/baseData/referenceNumber',
    'newOrder/pickup/fullAddress': 'shipment/locationData/pickup/fullAddress',
    'newOrder/pickup/zipcode': 'shipment/locationData/pickup/zipcode',
    'newOrder/pickup/country': 'shipment/locationData/pickup/country',
    'newOrder/destination/fullAddress': 'shipment/locationData/delivery/fullAddress',
    'newOrder/destination/zipcode': 'shipment/locationData/delivery/zipcode',
    'newOrder/destination/country': 'shipment/locationData/delivery/country',
    dateFormat: 'DD-MM-YYYYTHH:mm:SS'
}