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
  const xchange = (require('xchanger'))()

  xchange.setBase('inr') //Set the base exchange currency to use as a default

  xchange.convert(100, 'usd').then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  })
~~~~

Thats it!

#Author
Created and maintained by Hanut Singh Gusain <hanutsingh@gmail.com> [http://www.hanutsingh.in]
