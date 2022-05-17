import { ConfigurationsFormat, OutputFormat } from "../src/interfaceAdapters/models"
import { FormatDate } from "../src/useCases/formatDate"

describe('UNIT TESTS -> FormatDate', () => {
  test('formatDate -> parseDatesByString: If param newDate.created of the input object is undefined, it should throw error', () => {
    // Arrange
    const exampleOutputObject: OutputFormat = {
      newOrder: {
        created: '',
        shipperReferenceNumber: 'string',
        pickup: { fullAddress: 'string', zipcode: 'string', country: 'string' },
        destination: { fullAddress: 'string', zipcode: 'string', country: 'string' }
      }
    }
    
    const configMap: ConfigurationsFormat  = {
      dateFormat: 'YYYY-MM-DDTHH:mm:SS',
      'newOrder/shipperReferenceNumber': '',
      'newOrder/pickup/fullAddress': 'order/pickup/fullAddress',
      'newOrder/pickup/zipcode': 'order/pickup/zipcode',
      'newOrder/pickup/country': 'order/pickup/country',
      'newOrder/destination/fullAddress': 'order/delivery/fullAddress',
      'newOrder/destination/zipcode': 'order/delivery/zipcode',
      'newOrder/destination/country': 'order/delivery/country',
      'newOrder/created': 'order/created'
    }
    // Execute
    try {
      const formatDateService = new FormatDate()
      formatDateService.parseDatesByString(exampleOutputObject, configMap)
    } catch(error: any) {
      expect(error.message).toBe('Parameter "created" is required to format Date')
    }
    // Assert
    expect.assertions(1)
  })

  test('formatDate -> parseDatesByString: If param dateFormat of the configuration Map is undefined, it should throw error', () => {
    // Arrange
    const exampleOutputObject: OutputFormat = {
      newOrder: {
        created: '2020-01-01T00:00:00Z',
        shipperReferenceNumber: 'string',
        pickup: { fullAddress: 'string', zipcode: 'string', country: 'string' },
        destination: { fullAddress: 'string', zipcode: 'string', country: 'string' }
      }
    }
    
    const configMap: ConfigurationsFormat  = {
      dateFormat: '',
      'newOrder/shipperReferenceNumber': '',
      'newOrder/pickup/fullAddress': 'order/pickup/fullAddress',
      'newOrder/pickup/zipcode': 'order/pickup/zipcode',
      'newOrder/pickup/country': 'order/pickup/country',
      'newOrder/destination/fullAddress': 'order/delivery/fullAddress',
      'newOrder/destination/zipcode': 'order/delivery/zipcode',
      'newOrder/destination/country': 'order/delivery/country',
      'newOrder/created': 'order/created'
    }
    // Execute
    try {
      const formatDateService = new FormatDate()
      formatDateService.parseDatesByString(exampleOutputObject, configMap)
    } catch(error: any) {
      expect(error.message).toBe('Parameter "dateFormat" from config map is required to format Date')
    }
    // Assert
    expect.assertions(1)
  })

  test('formatDate -> parseDatesByString: Given a date input type string, the returned date must follow this format: YYYY-MM-DDTHH:mm:SS', () => {
    // Arrange
    const exampleOutputObject: OutputFormat = {
      newOrder: {
        created: '01-12-2022T30:59:11Z',
        shipperReferenceNumber: 'string',
        pickup: { fullAddress: 'string', zipcode: 'string', country: 'string' },
        destination: { fullAddress: 'string', zipcode: 'string', country: 'string' }
      }
    }
    
    const configMap: ConfigurationsFormat  = {
      dateFormat: 'DD-MM-YYYYTSS:mm:HH',
      'newOrder/shipperReferenceNumber': '',
      'newOrder/pickup/fullAddress': 'order/pickup/fullAddress',
      'newOrder/pickup/zipcode': 'order/pickup/zipcode',
      'newOrder/pickup/country': 'order/pickup/country',
      'newOrder/destination/fullAddress': 'order/delivery/fullAddress',
      'newOrder/destination/zipcode': 'order/delivery/zipcode',
      'newOrder/destination/country': 'order/delivery/country',
      'newOrder/created': 'order/created'
    }

    // Execute
    const formatDateService = new FormatDate()
    const result = formatDateService.parseDatesByString(exampleOutputObject, configMap)

    // Assert
    expect(result).toBe('2022-12-01T11:59:30') // YYYY-MM-DDTHH:mm:SS
  })

  test('formatDate -> formatDate: This method should call parseDatesByString method and return an Object type OutputFormat with the field "created" with the new date', () => {
    // Arrange
    const exampleOutputObject: OutputFormat = {
      newOrder: {
        created: '01-12-2022T30:59:11Z',
        shipperReferenceNumber: 'teststring',
        pickup: { fullAddress: 'string', zipcode: 'string', country: 'string' },
        destination: { fullAddress: 'string', zipcode: 'string', country: 'string' }
      }
    }
    
    const configMap: ConfigurationsFormat  = {
      dateFormat: 'DD-MM-YYYYTSS:mm:HH',
      'newOrder/shipperReferenceNumber': '',
      'newOrder/pickup/fullAddress': 'order/pickup/fullAddress',
      'newOrder/pickup/zipcode': 'order/pickup/zipcode',
      'newOrder/pickup/country': 'order/pickup/country',
      'newOrder/destination/fullAddress': 'order/delivery/fullAddress',
      'newOrder/destination/zipcode': 'order/delivery/zipcode',
      'newOrder/destination/country': 'order/delivery/country',
      'newOrder/created': 'order/created'
    }

    // Execute
    const formatDateService = new FormatDate()
    const spyFormatMethod = jest.spyOn(formatDateService, 'parseDatesByString')
    const result = formatDateService.formatDate(exampleOutputObject, configMap)

    // Assert
    expect(spyFormatMethod).toHaveBeenCalled()
    expect(typeof result).toBe('object')
    expect(result.newOrder.shipperReferenceNumber).toBe('teststring')
    expect(result.newOrder.created).toBe('2022-12-01T11:59:30') // YYYY-MM-DDTHH:mm:SS
  })
})