# Credential comparison viewer

This application will use the the resources from the `../data` folder and create a comparison table that can be viewn in the browser. This application will be built in the CICD pipeline and deployed to the github pages.

## Run the application locally

Requirements:

- [nodejs](https://nodejs.org/en/download/)

Clone the repository and install the dependencies:

```bash
cd viewer
npm ci
```

You can run the different commands with `npm run <command>` in the viewer folder:

- "start": start the application in development mode on port 4200
- "validate": check if the json files in the `../data` folder are valid. For this it will match with the schema in the subfolders.
- "merge": merge the json files to one file. Required for the angular application to work.
- "schema": update the schema for the credential profiles to add the properties as valid enum values. This has to be run in case the name of a resource changed, a new one was added or removed (like a new signature type).
