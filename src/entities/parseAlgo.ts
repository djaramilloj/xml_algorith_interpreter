import * as xml2js from 'xml2js'

export class ParseFile {

    private inputObject: any
    private outputObjectTemplate: any 

    constructor (xmlFile: string, xmlResponse: string) {
        this.initParseAlgo(xmlFile, xmlResponse)
    }

    private async initParseAlgo(inputXml: string, templateXml: string) {
        this.inputObject = await this.convertXMLInputToJson(inputXml)
        this.outputObjectTemplate = await this.convertXMLInputToJson(templateXml)
        console.log(1, this.inputObject)
        console.log(2, this.outputObjectTemplate)
    }

    private async convertXMLInputToJson(xmlFile: string): Promise<any> {
        try {
            return await xml2js.parseStringPromise(xmlFile, { mergeAttrs: true })
        } catch (error) {
            throw new Error('Error converting XML to JavaScript Object')
        }
    }
}