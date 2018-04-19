# MarvelApp (CunningDJ)

This is my first take at a mobile app.  It is created with react native, and taps into the Marvel API to grab and render a random list of Marvel characters.

## Dependencies
1. [NodeJS](https://nodejs.org/en/download/)
2. [Expo app](https://expo.io/learn) - Follow the App links, or search 'Expo' in your App Store. The other steps aren't necessary.
3. [Marvel API Keys](https://developer.marvel.com/account) - Need the secret and public keys.

## Instructions
1. Clone the repo
2. Make a `keys.json` file in the base path.  The json should have `key: [marvel API public key]` and `secretKey: [Marvel API private key]` under the key `marvel:`.  Get the Marvel API keys [here](https://developer.marvel.com/account).
3. In the CLI at the base path:
    * Type `npm install`.  This will install the app.
    * Type `npm start`.  This will initialize the app
4. Open the Expo app.
    * If on Android, scan the QR code.
    * If on iOS, type `s` in the CLI, and follow the instructions.