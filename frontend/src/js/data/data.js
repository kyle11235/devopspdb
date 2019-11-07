/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'jquery'],
        function (oj, ko, $)
        {
            function fetchData(url) {
                return $.getJSON(url);
            }

            function fetchPerson(url) {
                  return $.getJSON(url);
            }

            const flightAPI = 'http://localhost:8080';
            const hotelAPI = 'http://localhost:9090';
            // const hotelAPI = 'http://localhost:9090';
            const bookingAPI = 'http://localhost:8181';
            //const bookingAPI = 'http://localhost:8080';


            return {
                fetchData: fetchData, 
                flightAPI: flightAPI,
                hotelAPI: hotelAPI,
                bookingAPI: bookingAPI
            };
        });


