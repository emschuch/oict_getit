# AJAX

## Using jQuery

The normal thing:

    var some_variable = null;

    $.ajax({
        url:    '/location',
        type:   'GET',
        data:   {
            location:         [37.0, -7],
            radius:           5,
            unit:             "degrees",
            technology_dummy: "Mini Grid"
        },
        success: function(response) {
            some_variable = response;
            console.log("Records found: " + some_variable.length);
            // do something useful...
        }
    });


**NOTE:** if you are about to browse using URL strongly recommend using plugins like

- [JSONView - Chrome](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc)
- [JSONView - Firefox](https://addons.mozilla.org/en-US/firefox/addon/jsonview/)

The equivalent to the request above would be: [Going here](http://localhost:3000/location?location[]=37.0&location[]=-7&radius=5&unit=degrees&technology_dummy=Mini%20Grid)
