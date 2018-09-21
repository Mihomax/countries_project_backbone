define('CountryModel',['jquery','underscore','backbone'], function($,_,Backbone){

    var Country = Backbone.Model.extend({

        //method will add current country to localstorage

    addCountry: function() {
            
        var currStorage = localStorage.getItem("userLocalStorage");

        if (currStorage) {
            var selectedCountry = this.toJSON();
            var countriesArray = JSON.parse(currStorage); 

            for (var i = 0; i <countriesArray.length;i++) {
                if (countriesArray[i].name ===selectedCountry.name) {
                    console.log(countriesArray[i].name);
                    alert("You already have this country in your favorites, please choose another one.");
                    return false;
                } 
            }
            
            countriesArray.push(selectedCountry);
            countriesArray = JSON.stringify(countriesArray);
            localStorage.setItem("userLocalStorage", countriesArray);
        }
        else {
            var selectedCountry = this.toJSON();
            var countryArray = [selectedCountry];
            countryArray = JSON.stringify(countryArray);
            localStorage.setItem("userLocalStorage", countryArray);  
        }
    },

     // will remove current country from localstorage
    removeCountry: function () {
        var selectedCountry = this.toJSON();
        var currStorage = localStorage.getItem("userLocalStorage");
        var countriesArray = JSON.parse(currStorage); 
         
        for (var i = 0; i <countriesArray.length;i++) {
            if (countriesArray[i].name ===selectedCountry.name) {
                countriesArray.splice(i,1);
            } 
        }
        countriesArray = JSON.stringify(countriesArray);
        localStorage.setItem("userLocalStorage", countriesArray); 
    }


    });
    return Country;
});


