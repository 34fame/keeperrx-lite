# Release Notes

## Next

-  Resolved lint errors

## 1.0.0

### Enhancements

-  Cleaning up to prepare for first release
   -  Remove 'Save Unlisted Drug' option (causes problems and confusion)
   -  Add instructions to Adding a drug page
   -  Add instructions to Drug Interactions page
   -  Add instructions to the Adverse Events page
   -  Click drugs in card view shows details
   -  Preference error on initial login when no drugs are defined
   -  Display NLM Disclaimer on Drug Interactions page
   -  Update Empty verbiage for Drug Interactions
   -  Add loading status to Prescription Drugs
   -  Add loading status to Drug Interactions
   -  Add loading status to Adverse Events

### Bug Fixes

-  Error when using Adverse Events drug toggle

## 0.9.0

### Enhancements

-  Update Adverse Events inputs to be more usable

## 0.8.0

### Features

-  Provide a detailed drug view
-  Create development environment

## 0.7.3

### Bug Fixes

-  Not recognizing existing user at login

## 0.7.2

### Enhancements

-  Standardize content header for Drug List
-  Standardize content header for Drug Interactions
-  Standardize content header for Adverse Events
-  Table header now specificies the database source of the data

### Bug Fixes

-  Table header for Adverse Events says Drug Interactions

### Bug Fixes

-  New users not being created in database

## 0.7.1

### Enhancements

-  Created new Github repository for KeeperRx Lite support
-  Add "Contact Support" button that links to support site

## 0.7.0

### Features

-  Save content toolbar view as stateful preference in Firestore
-  Save event logs to Firestore
-  Provide basic view of event logs
-  Log add drug events
-  Log remove drug events
-  Use session storage to cache recent queries

## 0.6.1

### Bug Fixes

-  Resolved issue preventing adding a drug when the current list of drugs is empty

## 0.6.0

### Features

-  Save authenticated user session to Firestore
-  Add user selected drugs to Firestore
-  Remove user deleted drugs from Firestore
-  Removed code managing drugs in cookies

### Enhancements

-  Removed dividers from menus
