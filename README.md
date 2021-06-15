# Capitolis Home Assignment

A transaction display and compression app built with React and node.js.

## The original assignment requirements:

- We'll need a basic interface to add and view transactions.
- A valid transaction has an amount and two parties: trading party and counterparty. 
- The app should be able to support these capabilities:
    - Display 2 lists of all transactions grouped by: Paying transactions (amount < 0. Receiving transactions (amount > 0.
- Add a new transaction:
    - A modal or dialog should open once Add new Transaction is clicked. 
    - Only valid transactions should be allowed:
        - Counterparty should be a non empty string.
        - Amount should be a non-zero positive integer.
        - For the sake of this exercise the app should assume the trading party is always you, so tradingParty = "me" .

        - Once a transaction is added, it cannot be deleted.
- Once Compress Transactions is clicked the compression algorithm should be executed for all transactions. The resulting transactions should be automatically downloaded to a CSV file.

## Guidelines
- For easy debugging the server should print details about incoming requests and outgoing responses.
- Transactions should be available as long as the server is up.
- We've added a mock design to help visualize how the app should look like, feel free to add your personal touch to the final design.
- Try to keep your total work for the assignment (without bonuses) under 2.5 hours even if you haven't finished.
- Please use React and NodeJS to complete this assignment.

## Bonuses
- Add some tests where you see fit.
- More complex persistency - read/write to JSON file, DB etc... 
- Add more features you think are a good fit. For example:
    - Deploy the app to the web.
    - Add the ability to add transactions for which the tradingParty isn't you. 
- Introduce a concept of identity and authorization to the app:
    - Basic login page with only user ID and no password. 
    - In memory Sessions.
    - Transactions can be added by admins only
    - Responsive design.App requirements

## What I've done
1. Added the ability for trading_party to be anyone.
1. json2csv - conversion of JSON to a downloadable csv file.
1. MongoDB + mongoose - for a more complex and organized persistency.
1. Bunyan - as a logger for incoming requests and outgoing responses.
1. Validations are being done both at the client and server sides.

## Cloning and Running the project
- The url for the git repository: ``git@github.com:yotamZaken/capitolis.git``
- Navigate to both the frontend and the backend directories and run ``npm i`` in the Terminal
- In the backend directory - run ``node index.js`` to bring the server online
- In the frontend directory - run ``npm start``

