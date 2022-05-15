import { ParseFile } from "./entities/parseAlgo"
import * as fs from 'fs'
import { CONFIG_CASE_1 } from "./configurations/case1"


const xml = fs.readFileSync(__dirname + '/file_1.xml')
const template = fs.readFileSync(__dirname + '/final-format.xml')

new ParseFile(xml.toString(), template.toString(), CONFIG_CASE_1)