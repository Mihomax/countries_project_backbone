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
    },
    index_change: {
        src: ['build/index.html'],
        dest: 'build/index.html',
        replacements: [
            {
                from: '<link rel="stylesheet/less" type="text/css" href="css/styles.less"/>',
                to: '<link rel="stylesheet" type="text/css" href="css/styles.css"/>'},
            {
                from: '<script  src="js/libs/less-min.js" ></script>',
                to: ''}
        ]
    }
}

// in main.js changing all my modules paths into scripts.js 
// also in index.html changing less into css