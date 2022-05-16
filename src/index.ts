import * as fs from 'fs'
import { createInterface } from 'readline'

// Service
import { ParseFile } from "./entities/parseAlgorithm"

// Config Files per Case
import { CONFIG_CASE_1 } from "./configurations/case1"
import { CONFIG_CASE_2 } from "./configurations/case2"
import { CONFIG_CASE_3 } from "./configurations/case3"

// XML files
const xml1 = fs.readFileSync(__dirname + '/file_1.xml').toString()
const xml2 = fs.readFileSync(__dirname + '/file_2.xml').toString()
const xml3 = fs.readFileSync(__dirname + '/file_3.xml').toString()
const template = fs.readFileSync(__dirname + '/final-format.xml').toString()


const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

/**
 * Prompt user to select a case and execute alogirthm
 */
rl.question('Type the test case to execute -> 1, 2 or 3 (Just type the number): ', (caseNumber) => {
  let parseService: ParseFile
  switch(caseNumber) { 
    case '1':
      parseService = new ParseFile(xml1, template, CONFIG_CASE_1)
      parseService.getResult()
      break
    case '2':
      parseService = new ParseFile(xml2, template, CONFIG_CASE_2)
      parseService.getResult()
      break
    case '3':
      parseService = new ParseFile(xml3, template, CONFIG_CASE_3)
      parseService.getResult()
      break
    default:
      console.log('Executing case #1 by default')
      parseService = new ParseFile(xml1, template, CONFIG_CASE_1)
      parseService.getResult()
  }
  console.log('File created in path -> ./bin/results')
  rl.close()
})

