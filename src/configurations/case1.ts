import { ConfigurationsFormat } from "../interfaceAdapters/models";

export const CONFIG_CASE_1: ConfigurationsFormat = {
    'newOrder/created': 'order/created',
    'newOrder/shipperReferenceNumber': '',
    'newOrder/pickup/fullAddress': 'order/pickup/fullAddress',
    'newOrder/pickup/zipcode': 'order/pickup/zipcode',
    'newOrder/pickup/country': 'order/pickup/country',
    'newOrder/destination/fullAddress': 'order/delivery/fullAddress',
    'newOrder/destination/zipcode': 'order/delivery/zipcode',
    'newOrder/destination/country': 'order/delivery/country',
    dateFormat: 'YYYY-MM-DDTHH:mm:SS'
}