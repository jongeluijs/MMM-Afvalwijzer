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
        var timer = setInterval(()=>{
            Log.info("Afvalwijzer interval " + this.count)
            this.updateDom()
            this.count++
          }, 1000)
    },

    updateDom: function () {
        Log.info("Afvalwijzer updateDom " + this.count)
        var element = document.createElement("div")
        element.className = "myContent"
        element.innerHTML = "Hello, World! "
        var subElement = document.createElement("p")
        subElement.innerHTML = "Count: " + this.count
        subElement.id = "COUNT"
        element.appendChild(subElement)
        return element
    },


});
