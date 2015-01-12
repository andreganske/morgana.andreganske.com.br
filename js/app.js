// Place third party dependencies in the lib folder

// Configure loading modules from the lib directory, except 'app' ones
require.config({
    baseUrl: "js/lib",
    paths: {
        "app":              "../app",
        "angular":          "//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min",
        "angularRoute":     "//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-route.min",
        "angularAnimate":   "//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-animate.min",
        "jquery":           "//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",
        "parse":            "//www.parsecdn.com/js/parse-1.3.3.min",
        "bootstrap":        "//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min",
        "validator":        "//cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.3/js/bootstrapValidator.min"
    },
    shim: {
        'angular'           : {'exports' : 'angular'},
        'angularRoute'      : ['angular'],
        'angularAnimate'    : ['angular'],
        "bootstrap"         : { "deps" : ["jquery"] }
    },
    priority: [
        "angular"
    ]
});

// Load the main app module to start the app
require(["app/main"]);