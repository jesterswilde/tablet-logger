# Tablet Logger
#### Sends console logs and errors from remote devices to your desktop or laptop

## How to use: 
 - ##### Include logger.js with your javascript files
 - ##### Run buildLogger.js to set URL. There are few ways to do this: 
   ###### 1.Pass an argument through node like: "node buildLogger.js 192.168.0.1:8080"
   ###### 2. It will read the environment variable LOGGERIP
   ###### 3. It will then look for network IP address and use port 8080

  - ##### Run the server with: "npm run start"