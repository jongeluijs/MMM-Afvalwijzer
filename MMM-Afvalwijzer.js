// MagicMirror Module: MMM-AfvalWijzer
// This module displays the garbage collection schedule for Afvalwijzer.

// Load dependencies
const Module = require('magicmirror-module').Module;
const fetch = require('node-fetch');

// Define the module
module.exports = {
    // Default configuration
    defaults: {
        apiKey: 'YOUR_API_KEY',
        url: 'https://api.afvalwijzer.nl/schedule',
        updateInterval: 600000, // 10 minutes
        displayFormat: 'text', // Options: 'text', 'json'
    },

    // Create the module
    create: function (config) {
        var self = this;

        // Initialize the module
        self.start();

        // Load the configuration
        self.config = Object.assign({}, self.defaults, config);

        // Fetch the schedule
        self.fetchSchedule();
    },

    // Start the module
    start: function () {
        console.log('Starting module: ' + module.name);
    },

    // Fetch the schedule from Afvalwijzer API
    fetchSchedule: function () {
        fetch(this.config.url)
            .then(response => response.json())
            .then(data => {
                if (this.config.displayFormat === 'text') {
                    this.displayScheduleText(data);
                } else {
                    this.displayScheduleJson(data);
                }
            })
            .catch(error => {
                console.error('Error fetching schedule:', error);
            });
    },

    // Display the schedule as text
    displayScheduleText: function (data) {
        var scheduleText = 'Garbage Collection Schedule:\n';
        // Process and format the schedule data
        // Example: scheduleText += 'Next collection: ' + data.nextCollectionDate + '\n';
        console.log(scheduleText);
    },

    // Display the schedule as JSON
    displayScheduleJson: function (data) {
        console.log(JSON.stringify(data, null, 2));
    }
};
