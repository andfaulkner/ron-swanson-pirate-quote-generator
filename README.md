# ron-swanson-pirate-quote-generator
Ridiculous app that gets random Ron Swanson quotes, then translates them into pirate. Provided testbed to create promisified versions of core seneca functions.

Wha...?
=======
Ever wonder what Ron Swanson would sound like as a pirate? 
Or what Ron Swanson quotes would look like if written down then converted into pirate-speak?
...or do you ever think - damn, Parks & Recreation is hilarious, but the way they talk just isn't pirate-y enough for me?
That's right. Your dreams are about to come true.

Seneca Promisification Testing
==============================
Set up to allow use of Seneca framework-defined actions, data entity CRUD operations, and event handlers (ready) with 
Promises using the incredible BluebirdJS Promises library
*   This is fully implemented in lib/promisified-seneca.js, with help from lib/promise-helpers.js. 
*   It's working with an ancient version of Seneca as well
    *   this is a completely version-agnostic promisification of Seneca, relying only on the existence of callback arguments
*   Note that Seneca methods  had to be 'manually' promisified with Bluebird's lower-level interface - 
    Bluebird's auto-promisification doesn't work with Seneca (or...at least not older versions. The promises tutorial did
    not work for Seneca 0.6).
