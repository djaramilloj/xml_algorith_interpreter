import * as xml2json from 'xml2json'
import { writeFileSync } from 'fs'
import { ConfigurationsFormat, OutputFormat } from '../interfaceAdapters/models'
import { FormatDate } from '../useCases/formatDate'
import { ExceptionDateFormating, ExceptionParsingAlgorithm, HttpStatusCode } from '../interfaceAdapters/errorHandling'

export class ParseFile {

    private configMap: ConfigurationsFormat
    private xmlFile: string
    private xmlResponse: string
    private formatSateService: FormatDate

    constructor (xmlFile: string, xmlResponse: string, configMap: ConfigurationsFormat) {
        this.formatSateService = new FormatDate()
        this.configMap = configMap
        this.xmlFile = xmlFile
        this.xmlResponse = xmlResponse
    }

    /**
     * @description Initiliazes algorithm and return FILE with response
     */
    getResult() {
        const responseToWrite = this.initParsingAlgo(this.xmlFile, this.xmlResponse)
        this.writeFileResult(responseToWrite)
    }

    /**
     * @description JUST initiliazes algorithm
     */
    getResultPrinted() {
        this.initParsingAlgo(this.xmlFile, this.xmlResponse)
    }

    /**
     * 
     * @param inputXml xml to process
     * @param templateXml expected output format in xml
     * 
     * Initializes the algorthm that processes the input data
     */
    private initParsingAlgo(inputXml: string, templateXml: string): string {
        try {
            const inputObject = this.convertXMLInputToJson(inputXml)
            const outputObjectTemplate: any = this.convertXMLInputToJson(templateXml)
            let outputObject = this.iterateOverKeysToMatchValues(inputObject, outputObjectTemplate, this.configMap)
            if (outputObject.newOrder.created) outputObject = this.formatSateService.formatDate(outputObject, this.configMap)
            const jsonFormOutput = JSON.stringify(outputObject)
            return this.convertJsonInputToXML(jsonFormOutput)
        } catch(error) {
            if (error instanceof ExceptionParsingAlgorithm || error instanceof ExceptionDateFormating) {
                throw error
            } else {
                throw new ExceptionParsingAlgorithm(HttpStatusCode.INTERNAL_SERVER, 'Error initializing parsing algorithm')
            }
        }
    }

    /**
     * 
     * @param inputObject xml to process
     * @param outputObject expected output format in xml
     * @param keysMap configurations map for the specific input case
     */
    iterateOverKeysToMatchValues(inputObject: Record<any, any>, outputObject: OutputFormat, keysMap: ConfigurationsFormat): OutputFormat {
        for (const key in keysMap) {
            const pathToValueInInput = keysMap[key].split('/')
            const pathToValueInOutput = key.split('/')
            const valueFromInput = this.getValueFromPath(inputObject, pathToValueInInput)
            outputObject = this.setValueInPath(outputObject, pathToValueInOutput, valueFromInput)
        }
        return outputObject
    }

    /**
     * 
     * @param inputObject xml to process
     * @param pathToValue array of string that represents the path to the value
     * @returns The value of the specific path in the input object or null if the path is not found
     */
    getValueFromPath(inputObject: Record<any, any>, pathToValue: string[]): string | null {
        if (!inputObject || !pathToValue || !pathToValue.length) throw new ExceptionParsingAlgorithm(HttpStatusCode.BAD_REQUEST, 'Input Object or Path to extract value from not found')
        let currentObject: any = inputObject
        for (let i = 0; i < pathToValue.length; i++) {
            if (currentObject[pathToValue[i]]) {
                currentObject = currentObject[pathToValue[i]]
            } else {
                return null
            }
        }
        return currentObject
    }

    /**
     * 
     * @param outputObject expected output format in xml
     * @param pathToValue array of string that represents the path for the value to be set
     * @param value the value to be set
     * @returns outputObject with the value set in the specific path
     */
    setValueInPath(outputObject: OutputFormat, pathToValue: string[], value: string | null): OutputFormat {
        if (!outputObject || !pathToValue || !pathToValue.length) throw new ExceptionParsingAlgorithm(HttpStatusCode.BAD_REQUEST, 'Output Object Format or Path to set value to not found')
        let currentObject: any = outputObject
        for (let i = 0; i < pathToValue.length; i++) {
            if (i === pathToValue.length - 1) {
                currentObject[pathToValue[i]] = value
            } else {
                if (!currentObject[pathToValue[i]]) {
                    currentObject[pathToValue[i]] = {}
                }
                currentObject = currentObject[pathToValue[i]]
            }
        }
        return outputObject
    }

    /**
     * 
     * @param xmlFile xml file in string type
     * @returns the xml file in JS Object form
     */
    convertXMLInputToJson(xmlFile: string) {
        try {
            return xml2json.toJson(xmlFile, {object: true})
        } catch (error) {
            throw new ExceptionParsingAlgorithm(HttpStatusCode.INTERNAL_SERVER, 'Error converting XML to JavaScript Object')
        }
    }

    /**
     * 
     * @param jsonObject JSON object To be converted to XML
     * @returns the XML form of the JSON object
     */
    convertJsonInputToXML(jsonObject: string) {
        try {
            return xml2json.toXml(jsonObject)
        } catch (error) {
            throw new ExceptionParsingAlgorithm(HttpStatusCode.INTERNAL_SERVER, 'Error converting JSON to XML')
        }
    }

    /**
     * 
     * @param xmlToPrint XML to be printed
     * 
     * Writes the XML to a file
     */
    private writeFileResult(xmlToPrint: string) {
        try {
            writeFileSync(__dirname + '/../results/result.xml', xmlToPrint)
        } catch (error) { 
            throw new ExceptionParsingAlgorithm(HttpStatusCode.INTERNAL_SERVER, 'Error writing result file')
        }  
    }
}