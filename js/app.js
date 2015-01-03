// Place third party dependencies in the lib folder

// Configure loading modules from the lib directory, except 'app' ones
requirejs.config({

    baseUrl: "js/lib",

    shim: {
        "bootstrap" : { "deps" :['jquery'] }
    },

    paths: {
        "app":        "../app",
        "jquery":     "//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",
        "angular":    "//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min",
        "parse":      "//www.parsecdn.com/js/parse-1.3.3.min",
        "bootstrap":  "//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);