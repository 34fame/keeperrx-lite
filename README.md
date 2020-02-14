# KeeperRx Lite

## Overview

Have you ever gone to the doctor and was asked to fill out multiple pages of medical history? What medications are you taking? What operations have you had? Is there any family history? etc.

**KeeperRx** helps you keep track of your medical life. Instead of filling out paperwork, simply share with your doctor directly from **KeeperRx**.

**KeeperRx Lite** is a development project to help with the planning and development of the flagship **KeeperRx**. It will let users add medications and then research interactions and adverse events related to those medicines using the _National Library of Medicine_ and the _FDA_ as data sources.

## Architecture

**KeeperRx Lite** has been developed using _React_. _Google Firebase_ is used for authentication and database services. Free to the public API's provided by the _National Library of Medicine_ and the _FDA_ are used for gathering all information on medicines, interactions and adverse events.

No user credentials are stored by **KeeperRx Lite**. All authentication is via the social authentication providers. The only information stored about users are email address, displayName and the URL to the photo provided by the social authentication provider and the references for these users to the medicines they have saved to their profile.

## Local Development

You are free to fork this repository for your own personal use. Once you have a local repository you can run `npm install` or `yarn` to install packages then run with `npm start` or `yarn start`.

Pull requests can be submitted for approval. Please open an issue in the [KeeperRx Lite Repository](https://github.com/34fame/keeperrx-lite/issues) describing all changes.

## Environment

There are several environment variables required for the application to function properly that are not included in the repository. You will need to establish your own _Google Firebase_ project to register your version of **KeeperRx Lite** and retrieve the appropriate values.

```sh
REACT_APP_VERSION=$npm_package_version
REACT_APP_NAME=$npm_package_name

REACT_APP_FIREBASE_KEY=
REACT_APP_FIREBASE_DOMAIN=
REACT_APP_FIREBASE_DATABASE=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```
