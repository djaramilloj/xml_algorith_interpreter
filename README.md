# Parsing Shipping Data Algorithm

This algorithm allows user to convert a custom XML file with shipping data into another XML file with the same data BUT following a specific format

## Common principles

This application was built following the **Objected-Oriented Programming** principles.

Principles actively used:
- **Encapsulation** -> All objects keep its state private. State modification via exposed methods.
- **Abstraction** -> All objects only expose a high level mechanism for using it.
- **Single Responsibility (SOLID)** -> Each class implemented has only one reason to exist. Likewise every method within each class follows this rule.
- **Dependency Inversion (SOLID)** -> Classes are decoupled by depending on abstractions instead of depending on details.

## Architecture

The modules of this application were built following the **Clean Architecture Pattern**

Layers of Clean Architecture actively used:
- **Entities** -> Within entities is enclosed the Core Business Object of the application. This is where the algorithm was implemented.
- **Use Cases** ->  Within useCases is enclosed the business rules that orchestrate the flow of data from and to Entities. For this application, within useCases is the Object that format any (string) input date into a specified date format
- **Interface Adapters** ->  Within interfaceAdapters is enclosed the adapters that convert data in a convinient way from Entities/UseCases to a convinient way for Users. For this application, within interfaceAdapters are the models used as interfaces or DTOs (Data transfer Objects) and the models used as Custom Errors

## Frameworks and Technologies Used (Apart from TypeScript and Jest)

- **xml2json** -> NPM package used to convert XML strings to JSON strings and visceversa

## Compilation, Run and Tests (with NPM in local)

1. INSTALL

	```bash
	cd /path/to/project/root

	npm install
	```
  ###

2. RUN

	```bash
	npm run start
	```
	**NOTE:** The application will prompt user to choose 1 of the 3 test cases (test cases provided by the test requirements) in this way:


    ***```Type the test case to execute -> 1, 2 or 3 (Just type the number):```***
  
    ###

    If user types something different than 1, 2 or 3, the defult test case will be executed, which is the #1
    
    ###

    ***After the execution of the application, the result file will be created at -> ./bin/results/result.xml***

###

3. TESTS EXECUTION
	```bash
	npm run test
	```
    **NOTE:** The console will print the coverage
		