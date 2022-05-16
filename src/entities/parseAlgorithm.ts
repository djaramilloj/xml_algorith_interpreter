import * as xml2json from 'xml2json'
import { writeFileSync } from 'fs'
import { ConfigurationsFormat, OutputFormat } from '../utils/models'

export class ParseFile {

    private configMap: ConfigurationsFormat
    private xmlFile: string
    private xmlResponse: string

    constructor (xmlFile: string, xmlResponse: string, configMap: ConfigurationsFormat) {
        this.configMap = configMap
        this.xmlFile = xmlFile
        this.xmlResponse = xmlResponse
    }

    getResult() {
        const responseToWrite = this.initParsingAlgo(this.xmlFile, this.xmlResponse)
        this.writeFileResult(responseToWrite)
    }

    /**
     * 
     * @param inputXml xml to process
     * @param templateXml expected output format in xml
     * 
     * Initializes the algorthm that processes the input data
     */
    private initParsingAlgo(inputXml: string, templateXml: string): string {
        const inputObject = this.convertXMLInputToJson(inputXml)
        const outputObjectTemplate: any = this.convertXMLInputToJson(templateXml)
        let outputObject = this.iterateOverKeysToMatchValues(inputObject, outputObjectTemplate, this.configMap)
        if (outputObject.newOrder.created) outputObject = this.formatDate(outputObject, this.configMap)
        const jsonFormOutput = JSON.stringify(outputObject)
        return this.convertJsobInputToXML(jsonFormOutput)
    }

    /**
     * 
     * @param inputObject xml to process
     * @param outputObject expected output format in xml
     * @param keysMap configurations map for the specific input case
     */
    private iterateOverKeysToMatchValues(inputObject: Record<any, any>, outputObject: OutputFormat, keysMap: ConfigurationsFormat): OutputFormat {
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
    private getValueFromPath(inputObject: Record<any, any>, pathToValue: string[]): string | null {
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
    private setValueInPath(outputObject: OutputFormat, pathToValue: string[], value: string | null): OutputFormat {
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
     * @param outputObject output object to be formatted
     * @param configMap configurations map for the specific input case
     * 
     * @returns the output object with the date formatted in specific way
     */
    private formatDate(outputObject: OutputFormat, configMap: ConfigurationsFormat): OutputFormat{
        const date = this.parseDatesByString(outputObject, configMap)
        const objectWithDateFormatted: OutputFormat = {
            newOrder: {
                ...outputObject.newOrder,
                created: date
            }
        }
        return objectWithDateFormatted
    }

    /**
     * 
     * @param outputObject output object to be formatted
     * @param configMap @param configMap configurations map for the specific input case
     * @returns date formatted in specific way as required by the case
     */
    private parseDatesByString(outputObject: OutputFormat, configMap: ConfigurationsFormat): string { 
        const splitCurrentDate = outputObject.newOrder.created.split('T')
        const splitDateConfigMapTemplate = configMap.dateFormat.split('T')
        const dateOperation = splitCurrentDate[0].split('-')
        const dateTemplate = splitDateConfigMapTemplate[0].split('-')
        const timeOperation = splitCurrentDate[1].split('Z')[0].split(':')
        const timeTemplate = splitDateConfigMapTemplate[1].split('Z')[0].split(':')
        let year
        let month
        let day
        let hour
        let minute
        let second
        dateTemplate.forEach((item, index) => {
            if (item === 'YYYY') year = dateOperation[index]
            if (item === 'MM') month = dateOperation[index]
            if (item === 'DD') day = dateOperation[index]
        })

        timeTemplate.forEach((item, index) => {
            if (item === 'HH') hour = timeOperation[index]
            if (item === 'mm') minute = timeOperation[index]
            if (item === 'SS') second = timeOperation[index]
        })

        return `${year}-${month}-${day}T${hour}:${minute}:${second}`
    }

    /**
     * 
     * @param xmlFile xml file in string type
     * @returns the xml file in JS Object form
     */
    private convertXMLInputToJson(xmlFile: string) {
        try {
            return xml2json.toJson(xmlFile, {object: true})
        } catch (error) {
            throw new Error('Error converting XML to JavaScript Object')
        }
    }

    /**
     * 
     * @param jsonObject JSON object To be converted to XML
     * @returns the XML form of the JSON object
     */
     private convertJsobInputToXML(jsonObject: string) {
        try {
            return xml2json.toXml(jsonObject)
        } catch (error) {
            throw new Error('Error converting JSON to XML')
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
            throw new Error('Error writing result file')
        }  
    }
}