# CIS470-Project
This is a Node.js-based tool that provides a frontend for a user to "scrape" or save web pages to their computer.
## Requirements
Node.js and npm need to be installed on the local device. Additionally, ``npm install`` needs to be executed within the main project directory to grab dependencies.
## Operation
Running ``npm start`` will open a Node.js web server at port 3000. The user may enter a URL, then click "Submit" to fetch the page. If successful, the user will be provided with a link to download the page's HTML.
Running ``npm test`` (web server **must** be running) will execute a Selenium test suite that headlessly runs a Firefox environment and uses Mocha to perform the following tests in a test suite:
- **ExistingSite**: A known-existing website (https://example.com/) will be fetched and should be successfully downloaded.
- **InvalidSite**: A known non-existent website with a properly-formatted URL (https://invalid.com) will be fetched; the operation should fail.
- **InvalidURL**: The word "example" will be provided as input; the operation should fail.
