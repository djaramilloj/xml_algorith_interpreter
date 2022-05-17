export interface ConfigurationsFormat {
    [key: string]: string
    'newOrder/created': string
    'newOrder/shipperReferenceNumber': string
    'newOrder/pickup/fullAddress': string
    'newOrder/pickup/zipcode': string
    'newOrder/pickup/country': string
    'newOrder/destination/fullAddress': string
    'newOrder/destination/zipcode': string
    'newOrder/destination/country': string,
    dateFormat: string
}

export interface OutputFormat {
    newOrder: OutputOrder
}

interface OutputOrder {
    created: string,
    shipperReferenceNumber: string,
    pickup: OutputLocation,
    destination: OutputLocation
}

interface OutputLocation {
   fullAddress: string
   zipcode: string
   country: string 
}
