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
        this.scheduleUpdate();
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = "Fetching waste collection schedule...";
        return wrapper;
    },

    getStyles: function () {
        return ["MMM-Afvalwijzer.css"];
    },

    scheduleUpdate: function () {
        var self = this;
        setInterval(function () {
            self.updateDom();
        }, this.config.updateInterval);
    },

    fetchSchedule: function () {
        var self = this;
        var url = "https://api.mijnafvalwijzer.nl/webservices/appsinput/?apiKey=" + this.config.apiKey + "&method=postcodecheck&postcode=" + this.config.postalCode + "&street=&huisnummer=" + this.config.huisNummer + "&toevoeging=&app_name=afvalwijzer&platform=web&afval";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var schedule = JSON.parse(xhr.responseText);
                self.updateDom(schedule);
                log.info(schedule)
            }
        };
        xhr.send();
    },

    updateDom: function (schedule) {
        var wrapper = document.createElement("div");
        if (schedule) {
            wrapper.innerHTML = "Next collection: " + schedule.ophaaldagen.data[0].date;
        } else {
            wrapper.innerHTML = "Fetching waste collection schedule...";
        }
        return wrapper;
    }
});
