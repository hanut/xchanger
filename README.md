~~~~
               __
              /\ \
   __  _   ___\ \ \___      __      ___      __      __   _ __
  /\ \/'\ /'___\ \  _ `\  /'__`\  /' _ `\  /'_ `\  /'__`\/\`'__\
  \/>  <//\ \__/\ \ \ \ \/\ \L\.\_/\ \/\ \/\ \L\ \/\  __/\ \ \/
   /\_/\_\ \____\\ \_\ \_\ \__/.\_\ \_\ \_\ \____ \ \____\\ \_\
   \//\/_/\/____/ \/_/\/_/\/__/\/_/\/_/\/_/\/___L\ \/____/ \/_/
                                             /\____/
                                             \_/__/
~~~~

# Description
Currency converter with auto caching of exchange rates from exchangeratesapi.io

# Usage
Its really simple to use. Just require the module and create a new xchange
instance.

~~~~
  const XCHANGER = require('xchanger')
  const xchange = new XCHANGER() // or new XCHANGER(<currency code>)

  xchange.setBase('inr') //Set the base exchange currency to use as a default

  // Convert to currency specified as base currency

  xchange.convert(100, 'usd').then(result => {
    // Since we specified INR as base
    // the converted result will be in INR
    console.log(result)
  }).catch(error => {
    console.log(error)
  })

  // Convert from usd to aud
  xchange.convert(100, 'usd', 'aud').then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  })

  // Get a list of supported currency codes
  xchange.getValidCodes()

~~~~

# Functions
The module itself exports a constructor from which and exchange object can
be created.
Each exchange object has the following methods available -

- sync() : Fetches the latest rates from the api. Returns a promise
- saveRates() : Stores the rates to a local .json file. Returns a promise
- loadRates() : Reads the rates from the local .json file. Returns a promise
- setBase() : Sets the base exchange rate. (Available as the
  'base' attribute of the object)
- getBase() : Gets the current base exchange rate set on the xchange
- getValidCodes() : Returns a list of accepted Currency Codes
- isValidCC() : Checks if a given Currency Code is valid for use
- convert() : Converts a given amount from one currency to another

# Supported Currencies
Currently the api provides support for the 33 currencies listed below -

- Australian Dollar (AUD)
- Bulgarian Lev (BGN)
- Brazilian Real (BRL)
- Canadian Dollar (CAD)
- Swiss Franc (CHF)
- Chinese Yuan Renminbi (CNY)
- Czech Koruna (CZK)
- Danish Krone (DKK)
- European Union Euro (EUR)
- Great Britain Pound (GBP)
- Hong Kong Dollar (HKD)
- Croatian Kuna (HRK)
- Hungarian Forint (HUF)
- Indonesian Rupiah (IDR)
- New Israeli Sheqel (ILS)
- Indian Rupee (INR)
- Iceland Krona (ISK)
- Japanese Yen (JPY)
- Korean Won (KRW)
- Mexican Peso (MXN)
- Malaysian Ringgit (MYR)
- Norwegian Krone (NOK)
- New Zealand Dollar (NZD)
- Philippine Peso (PHP)
- Polis Zloty (PLN)
- Romanian Leu (RON)
- Russian Ruble (RUB)
- Swedish Krona (SEK)
- Singapore Dollar (SGD)
- Thailand Baht (THB)
- Turkish Lira (TRY)
- United States Dollar (USD)
- Rand (ZAR)

Thats it!

# Author
Created and maintained by Hanut Singh Gusain
### My Links
- [Github](https://github.com/hanut/)
- [Website](http://www.hanutsingh.in)
- [Twitter](http://www.twitter.com/hanutsingh)
