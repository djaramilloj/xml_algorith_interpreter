import * as xml2js from 'xml2js'
import { ConfigurationsFormat } from '../utils/models'

export class ParseFile {

    private configMap: ConfigurationsFormat

    constructor (xmlFile: string, xmlResponse: string, configMap: ConfigurationsFormat) {
        this.configMap = configMap
        this.initParseAlgo(xmlFile, xmlResponse)
    }

    /**
     * 
     * @param inputXml xml to process
     * @param templateXml expected output format in xml
     * 
     * Initializes the algorthm that processes the input data
     */
    private async initParseAlgo(inputXml: string, templateXml: string) {
        const inputObject = await this.convertXMLInputToJson(inputXml)
        const outputObjectTemplate = await this.convertXMLInputToJson(templateXml)
        this.iterateOverKeysToFindMatch(inputObject, outputObjectTemplate, this.configMap)
    }

    /**
     * 
     * @param inputObject xml to process
     * @param outputObject expected output format in xml
     * @param keysMap configurations map for the specific input case
     */
    private iterateOverKeysToFindMatch(inputObject: Record<any, any>, outputObject: Record<any, any>, keysMap: ConfigurationsFormat) {
        const inputObjectDepth = this.checkObjectDepth(inputObject)  
    }

    checkObjectDepth(inputObject: Record<any, any>) {
        let level = 1;
        for(var key in inputObject) {
            if (!inputObject.hasOwnProperty(key)) continue;
    
            if(typeof inputObject[key] === 'object' && !Array.isArray(inputObject[key])){
                var depth = this.checkObjectDepth(inputObject[key]) + 1;
                level = Math.max(depth, level);
            }
        }
        return level;
    }

    /**
     * 
     * @param xmlFile xml file in string type
     * @returns the xml file in JS Object form
     */
    private async convertXMLInputToJson(xmlFile: string): Promise<any> {
        try {
            return await xml2js.parseStringPromise(xmlFile, { mergeAttrs: true })
        } catch (error) {
            throw new Error('Error converting XML to JavaScript Object')
        }
    }
}