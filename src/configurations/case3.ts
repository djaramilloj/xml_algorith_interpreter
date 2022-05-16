import { ConfigurationsFormat } from "../utils/models";

export const CONFIG_CASE_3: ConfigurationsFormat = {
    'newOrder/created': 'shipment_file/order_data/file_transmission_date',
    'newOrder/shipperReferenceNumber': 'shipment_file/order_data/order_reference',
    'newOrder/pickup/fullAddress': 'shipment_file/order_data/route_data/pickup_address',
    'newOrder/pickup/zipcode': 'shipment_file/order_data/route_data/pickup_zipcode',
    'newOrder/pickup/country': 'shipment_file/order_data/route_data/pickup_country',
    'newOrder/destination/fullAddress': 'shipment_file/order_data/route_data/delivery_address',
    'newOrder/destination/zipcode': 'shipment_file/order_data/route_data/delivery_zipcode',
    'newOrder/destination/country': 'shipment_file/order_data/route_data/delivery_country',
    dateFormat: 'DD-MM-YYYYTHH:mm:SS'
}