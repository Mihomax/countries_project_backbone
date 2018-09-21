module.exports = {
    main_change: {
        src: ['build/js/main.js'],
        dest: 'build/js/main.js',
        replacements: [
            {from: "views/MenuView",to: 'scripts'},
            {from: "views/countrySearchView",to: 'scripts'},
            {from: "models/countryModel",to: 'scripts'},
            {from: "collections/countriesCollection",to: 'scripts'},
            {from: "models/mapModel",to: 'scripts'},
            {from: "views/countryView",to: 'scripts'},
            {from: "views/countriesView",to: 'scripts'},
        ]
    }
}
