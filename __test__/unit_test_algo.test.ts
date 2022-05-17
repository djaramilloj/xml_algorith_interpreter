import { ParseFile } from '../src/entities/parseAlgorithm'
import { ConfigurationsFormat } from '../src/interfaceAdapters/models'
import * as xml2json from 'xml2json'

let xmlFile: string
let xmlResponse: string
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

beforeEach(() => {
  xmlFile = '<order><created>2020-01-01T00:00:00Z</created></order>'
  xmlResponse = `<newOrder>
    <created>YYYY-MM-DDTHH:mm:SS</created>
    <shipperReferenceNumber>string</shipperReferenceNumber>
    <pickup>
        <fullAddress>string</fullAddress>
        <zipcode>string</zipcode>
        <country>string</country>
    </pickup>
    <destination>
        <fullAddress>string</fullAddress>
        <zipcode>string</zipcode>
        <country>string</country>
    </destination>
  </newOrder>`
})

afterEach(() => {
  xmlFile = ''
  xmlResponse = ''
})

describe('UNIT TESTS -> ParseAlgorithm', () => {
  test('parseAlgorithm -> initParsingAlgo: As inputs come in XML string form, they must be converted to JS object before continuing the algorithm execution', () => {
    // Execute
    const parseService = new ParseFile(xmlFile, xmlResponse, configMap)
    const spyConversionMethod = jest.spyOn(parseService, 'convertXMLInputToJson')
    parseService.getResultPrinted()
    // Assert
    expect(spyConversionMethod).toHaveBeenCalledTimes(2)
  })

  test('parseAlgorithm -> initParsingAlgo: As the result of the algorithm must be a XML string file, the result must be converted from JSON to XML', () => {
    // Execute
    const parseService = new ParseFile(xmlFile, xmlResponse, configMap)
    const spyConversionJSONMethod = jest.spyOn(JSON, 'stringify')
    const spyConversionMethod = jest.spyOn(parseService, 'convertJsonInputToXML')
    parseService.getResultPrinted()
    // Assert
    expect(spyConversionJSONMethod).toHaveBeenCalledTimes(1)
    expect(spyConversionMethod).toHaveBeenCalledTimes(1)
  })

  test('parseAlgorithm -> iterateOverKeysToMatchValues: the methods to extract and set value must be called tha same amount of times as the number of keys in config map', () => {
    // Execute
    const parseService = new ParseFile(xmlFile, xmlResponse, configMap)
    const spyExtractValue = jest.spyOn(parseService, 'getValueFromPath')
    const spySetValue = jest.spyOn(parseService, 'setValueInPath')
    parseService.getResultPrinted()
    // Assert
    expect(spyExtractValue).toHaveBeenCalledTimes(Object.keys(configMap).length)
    expect(spySetValue).toHaveBeenCalledTimes(Object.keys(configMap).length)
  })

  test('parseAlgorithm -> iterateOverKeysToMatchValues: the path to extract data from and set value to comes in string form, BUT must be passed to next methods as array of strings', () => {
    // Arrange
    const xmlFileToObject = xml2json.toJson(xmlFile, {object: true})
    // Execute
    const parseService = new ParseFile(xmlFile, xmlResponse, configMap)
    const spyExtractValue = jest.spyOn(parseService, 'getValueFromPath')
    parseService.getResultPrinted()
    // Assert
    expect(spyExtractValue).toHaveBeenLastCalledWith(xmlFileToObject, ['order', 'created'])
  })

  test('parseAlgorithm -> getValueFromPath: If input Object or path to extract value from are not passed, it should throw an error', () => {
    // Arrange
    const xmlFileToObject = xml2json.toJson(xmlFile, {object: true})
    // Execute
    try {
      const parseService = new ParseFile(xmlFile, xmlResponse, configMap)
      parseService.getValueFromPath(xmlFileToObject, [])
    } catch (error: any) {
      expect(error.message).toBe('Input Object or Path to extract value from not found')
    }
    // Assert
    expect.assertions(1)
  })

  test('parseAlgorithm -> getValueFromPath: This method should return the value in string format of the specified path within input object', () => {
    // Arrange
    const xmlFileToObject = xml2json.toJson(xmlFile, {object: true})
    const pathToValue = ['order', 'created']
    // Execute
    const parseService = new ParseFile(xmlFile, xmlResponse, configMap)
    const result = parseService.getValueFromPath(xmlFileToObject, pathToValue)
    // Assert
    expect(result).toBe('2020-01-01T00:00:00Z')
  })

  test('parseAlgorithm -> setValueInPath: If output template Object or path to set value to are not passed, it should throw an error', () => {
    // Arrange
    const xmlResponseToObject: any = xml2json.toJson(xmlResponse, {object: true})
    // Execute
    try {
      const parseService = new ParseFile(xmlFile, xmlResponse, configMap)
      parseService.setValueInPath(xmlResponseToObject, [], null)
    } catch (error: any) {
      expect(error.message).toBe('Output Object Format or Path to set value to not found')
    }
    // Assert
    expect.assertions(1)
  })

  test('parseAlgorithm -> setValueInPath: This method should return an object type OutputFormat with the value passed setted in the specified path of the output object', () => {
    // Arrange
    const xmlResponseToObject: any = xml2json.toJson(xmlResponse, {object: true})
    const pathToSetValue = ['newOrder', 'created']
    // Execute
    const parseService = new ParseFile(xmlFile, xmlResponse, configMap)
    const result = parseService.setValueInPath(xmlResponseToObject, pathToSetValue, '2020-01-01T00:00:00Z')
    // Assert
    expect(typeof result).toBe('object')
    expect(result.newOrder.created).toBe('2020-01-01T00:00:00Z')
  })
})