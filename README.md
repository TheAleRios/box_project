# box_project

# Brief explanation of the test framework:
-------------------------------------------

INTRODUCTION:
This small API testing framework was created having in mind some basic knowledge of Electric Car Charger business and technical context. So it's possible that some (or even all) of the test are not exactly applicable in the "real world". But it serves the purposes of this mock test.


Used tools and frameworks
---------------------------------------
1. Libraries: Mocha, Chai, chai-http, express, Supertest, express, joi, nodemon, body-parser
2. Language: Javascript
3. Development platform: NodeJs
4. Ide: Visual Studio Code
5. API testing tool: Postman

Main features
----------------------------
1. Created local server using express for testing purposes. It's easier to maintain and update than using a web crud solution like "Crudcrud.com". 
2. Defined different valid an non valid data schemas on separated jsons. This way we can easily change between valid and non valid data.
3. Created POSTMAN collection for simpler API interactions with the server. Using postman we can do a "manual" and "visual" api testing for easier debugging.
4. Separated test files between a "Unit testing" file (which have all the simplest test regarding API calls) and an "Integration testing" file, which have some interactions between API calls and complex data interactions.

3. All classes and methods are implemented in Javascript. All libraries are locally installed using a Package.json file.

4. To use the framework, NO need to have any coding skills. ZERO line of code needed. Each test case suite can be executed with a simple line in the terminal. Also NO need to run the server unless we utilize POSTMAN for simpler debugging, otherwise is not needed because the server is automatically run on each test run. 

5. The framework validates the returned status code, response body, valid data, valid data integration, API http request methods (POST, GET, PATCH, PUT, DELETE). It can validate each field data type and value. If the returned response includes object of arraylist, the framework can validate its size using the keyword ".size()".
6. All code is available here: https://github.com/TheAleRios/box_project


# Demo

For Version 1.0
----------
Prerequisite: Having last version of NodeJs installed, having Git installed, having Postman installed(not entirely necessary as you can use the web version or even ignore Postman tests)

Framework structure:
- Main folder: index.js (server file), local changer.postman_collectin.json (Postman collection file), Package.json(library file), readme and gitignore file (really important to not export node_modules data)
- Utils folder: charger-schema.js (schema for json validation)
- test folder: folder with each test file.
- data: different json files to be consumed for getting compliance and non compliance data.

1. First you need to clone all data from the repository here: https://github.com/TheAleRios/box_project
Go to a folder of your preference and in the command line execute: 'git clone https://github.com/TheAleRios/box_project.git'

2. After all the data was copied you need to install all the libraries. 
Go into the main folder(where the package.json file is present) and in the command line execute: 'npm install'.

3. After the libraries were installed you can run the unit tests.
Open a command terminal on the main folder and execute: 'npm test "./test/chargers_unit_tests.js"'
That will run all the unit tests.

Also in the terminal, after the tests were executed, you can execute: 'npm test "./test/integration_tests.js"'
That will run all the integration tests.

4. This is not mandatory, but you can test the Requests manually using Postman.
You will need to go to the main folder, open the terminal and execute: 'node index.js'
You will see a message that says "Listening on port 3000", now you can go to postman.
In the main folder, along with this readme and other files, you will see a file named 'Local chargers.postman_collection.json', you can import it using Postman.
In the collection you will see 5 different requests:
 - Create charger: POST request, used for creating chargers data with the values: "id", "model", "level", "norm" and "type"-
 - Get local chargers: GET request, used for getting the created data from the local server.
 - Change charger parameter: PUT request, for changing charger data using ID
 - Patch charger: PATCH request, for changing charger data using ID also, but with this request you can change small pieces of data.
 - Delete chargers: DELETE request, you can delete a charger using his ID parameter.


5. Not mandatory, but changing the loading of the chargers data (from valid_chargers_combination to non_valid_chargers_combination for example) can be useful to force errors.

Example: 
 - In the index file, you can go to line 17 and change 'const chargers = validJsonData;' for 'const chargers =  non_validJsonData'. That will do that the server load data that will force the unit tests to fail.
 - In the integration test file you can change, for example, "const charger= valid_chargers_combination;" for "const charger= non_valid_chargers_combination;" that will force errors on some tests.