const Scrappey = require('scrappey-wrapper');

/**
 * Check out our documentation here for more information: https://wiki.scrappey.com/
 * Your key can be found here: https://app.scrappey.com/#/
 */
const SCRAPPEY_API_KEY = 'API_KEY';
const scrappey = new Scrappey(SCRAPPEY_API_KEY);

/**
 * Scrappey.com is a proxy-wrapper for browsers, it allows you to run browser actions and execute javascript on any website.
 * with advanced options such as caching, proxy rotation, anti-bot and more.
 */
async function run() {

    /**
     * For all session options check: https://wiki.scrappey.com/getting-started#78f3fd5551724a78b12d548e95485bbe
     * We allow for multiple sessions to be created, each session has a different proxy and user-agent and unique fingerprint.
     */
    const session = await scrappey.createSession({
        // proxyCountry: "Netherlands"
        // OR use your own proxy
    })

    /**
     * Executes the browser actions requested
     */
    const scrape = await scrappey.get({

        /**
         * Send a GET request
         */
        "cmd": "request.get",

        /**
         * Go to main page of Booking.com
         */
        "url": "https://www.booking.com/index.nl.html",

        /**
         * Whitelist loading for bstatic.com for JS, css loading
         */
        "whitelistedDomains": [
            "bstatic.com"
        ],

        /**
         * Execute the following browser actions
         */
        "browserActions": [

            /**
             * Search for city Utrecht
             */
            {
                "type": "type",
                "cssSelector": "input[data-destination='1']",
                "text": "Utrecht"
            },

            /**
             * Select the date
             */
            {
                "type": "click",
                "cssSelector": "button[data-testid='date-display-field-end']"
            },
            {
                "type": "click",
                "cssSelector": "span[data-date='2023-09-18']"
            },
            {
                "type": "click",
                "cssSelector": "span[data-date='2023-09-22']"
            },

            /**
             * Click search button
             */
            {
                "type": "click",
                "cssSelector": "//body/div[@id='indexsearch']/div[2]/div[1]/form[1]/div[1]/div[4]/button[1]/span[1]"
            }
        ]
    })

    console.log(JSON.stringify(scrape, undefined, 4))

    /**
     * Destroys the session, this will free up space for other users
     */
    await scrappey.destroySession(session.session)
}

run().catch(console.error);