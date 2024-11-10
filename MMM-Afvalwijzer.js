/* MagicMirror Module: MMM-Afvalwijzer
 * This module displays the waste collection schedule for your area.
 */

Module.register("MMM-Afvalwijzer", {
    // Default module config.
    defaults: {
        apiKey: "YOUR_API_KEY",
        postalCode: "5555AA",
        housenumber: "1",
        updateInterval: 600000, // Every 10 minutes
        url: "https://api.example.com/Afvalwijzer"
    },

    start: function () {
        Log.info("Starting module: " + this.name);
        this.count=0
        setInterval(function () {
            self.getDom()
        }, this.config.updateInterval)
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = "Fetching waste collection schedule... " + this.count;
        Log.info("Afvalwijzer: getDom " + this.count)
        this.count++
        return wrapper;
    },


});
