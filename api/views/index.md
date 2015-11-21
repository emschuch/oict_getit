# In the beginning there was darkness... #

This is a list of supported paths:

----

    path:        '/countries'
    arguments:   null
    description: "Gives a list of all the countries and their data."

----

    path:        '/location'
    description: "Gives an array of all the entries around 'location' coordinates given a radius."
    arguments:   {
        location: [37.0,-7],             // required. array of two numbers (floats or integers)
        radius: 5,                       // optional. default: 1 (float or integer)
        unit: "degrees",                 // optional. default: 'degrees'
        technology_dummy: "Mini Grid"    // optional. default: null (any kind)
    }

----

Some examples:

## AJAX ##

Useful for fetching data and feed it into **d3js** for example

[AJAX](/ajax) (+ jQuery)


## CURL ##

Useful for fetching data and saving it as a file.

[CURL](/curl) (command line)
