# Living Lab Totem Project #

---------------
Description: The Living Lab project to read and present data from the deployed sensors.
Author: @tassiovale
Project: FPC - Living Lab Totem
Date: Dez 2017.

_______________
# CONFIGURATION

ATTENTION: such configuration must be double-checked before running the project! Configure it accordingly, with the test- or staging-related data.

SERVER CONFIGURATION
- File: config/default.json
- It contains the configurations for the message broker address (user/password as well), and raw data topics from the sensors.

CLIENT CONFIGURATION #1
- File: client/pages/sensor_data/listener.service.ts
- Edit the totemSocketAddress constant value with the correct ip address (for the test or staging environment server)
- ATTENTION: this is not the message broker address, you must provide the totem server address

CLIENT CONFIGURATION #2
- File: client/pages/app/app.component.ts
- Edit the appName value to change the totem name and the defaultLanguage to change the totem language

_______________
# DEPLOY INFORMATION

TEST ENVIRONMENT
ssh livinglab@192.168.128.206
// password: livinglab

STAGING ENVIRONMENT
ssh livinglab@192.168.128.216
// password: livinglab

EXECUTION
- To build all the automatically generated files:
	npm run build:prod
- Install dependencies using npm if necessary:
    npm install (in the /home/livinglab/ directory)
- Run Node.js server in background:
    npm start --prefix /home/livinglab/ &

________________
# BEST PRACTICES

CREATE FOLDERS
- Names separated by underscore '_'
- All lowercase
- Example: folder_name

CREATE JS FILES
**Class**
	- CamelCase format
	- Example: MyClass.js
**Other files**
	- Names separeted by hiffen '-'
	- All lowercase
	- Example: file-name.js

_______________
# TECHNOLOGIES USED

**ECMAScript 6 (ES6)**
	- To construct/use the js elements (class, objects, etc.)
	- To see browsers compatibility: https://kangax.github.io/compat-table/es6

**jsdoc**
	- To documentation generator 
	- oficial: http://usejsdoc.org/
	- npm repository: https://www.npmjs.com/package/jsdoc

**class-validator**
	- Allows use of decorator and non-decorator based validation
	- Oficial:	https://github.com/pleerock/class-validator
	- npm repository: https://www.npmjs.com/package/class-validator
	- `npm install class-validator --save`