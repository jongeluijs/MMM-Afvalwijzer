/* MagicMirror Module: MMM-Afvalwijzer
 * This module displays the waste collection schedule for your area.
 */

Module.register("MMM-Afvalwijzer", {
    // Default module config.
    defaults: {
        apiKey: "YOUR_API_KEY",
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
        var url = this.config.url + "?apiKey=" + this.config.apiKey;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var schedule = JSON.parse(xhr.responseText);
                self.updateDom(schedule);
            }
        };
        xhr.send();
    },

    updateDom: function (schedule) {
        var wrapper = document.createElement("div");
        if (schedule) {
            wrapper.innerHTML = "Next collection: " + schedule.nextCollectionDate;
        } else {
            wrapper.innerHTML = "Fetching waste collection schedule...";
        }
        return wrapper;
    }
});
