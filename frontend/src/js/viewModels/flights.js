/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'utils', 'jquery', 'data/data', 'ojs/ojrouter', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojpagingcontrol', 'ojs/ojpagingcontrol-model'],
        function (oj, ko, utils, $, data)
        {
            function GetFlights(self){

                // $.getJSON(location.protocol + "//" + window.location.hostname + ':8080/api/flight').done(function(data){
                    $.getJSON(data.flightAPI + '/api/flight').done(function(data){

                    self.allPeople = data;
                    self.model = oj.Model.extend({
                        idAttribute: 'id'
                    });
    
                    self.filteredAllPeople = ko.computed(function () {
                        var peopleFilter = new Array();
                        if (self.allPeople.length !== 0) {
                            if (self.nameSearch().length === 0)
                            {
                                peopleFilter = self.allPeople;
                            } else {
                                ko.utils.arrayFilter(self.allPeople,
                                        function (r) {
                                            var token = self.nameSearch().toLowerCase();
                                            if (r.departure.toLowerCase().indexOf(token) === 0 || r.destination.toLowerCase().indexOf(token) === 0) {
                                                peopleFilter.push(r);
                                            }
                                        });
                            }
                        }
    
                        
                        return peopleFilter;
                    });
    
                    self.listViewDataSource = ko.computed(function () {
                        return new oj.ArrayTableDataSource(self.filteredAllPeople(), {idAttribute: 'id'});
                    });
    
                    self.cardViewDataSource = ko.computed(function () {
                        return new oj.PagingTableDataSource(self.listViewDataSource());
                    });
    
                    self.getPhoto = function (airline) {
                        var src;
                        if (airline != 'unknow') {
                            src = 'css/images/flights/' + airline + '.png';
                        } else {
                            src = 'css/images/flights/unnamed.png';
                        }
                        return src;
                    };
    
                    self.getEmail = function (emp) {
                        return "mailto:" + emp.email + '@example.net';
                    };
    
                    self.getFacetime = function (emp) {
                        return "#";
                    };
    
                    self.getChat = function (emp) {
                        return "#";
                    };
                    // Feature implementation discontinued
                    self.getOrg = function (org, event) {
                    //     alert('This will take you to the employee page and highlight the team infotile');
                    };
    
                    // self.getTenure = function (emp) {
                    //     var now = new Date().getFullYear();
                    //     var hired = new Date(emp.hireDate).getFullYear();
                    //     var diff = now - hired;
                    //     return diff;
                    // };
    
                   
    
                    // self.loadPersonPage = function (emp) {
                    //     if (emp.id) {
                    //         // Temporary code until go('person/' + emp.empId); is checked in 1.1.2
                    //         history.pushState(null, '', 'index.html?root=person&emp=' + emp.id);
                    //         oj.Router.sync();
                    //     } else {
                    //         // Default id for person is 100 so no need to specify.
                    //         oj.Router.rootInstance.go('person');
                    //     }
                    // };
    
                    // self.onEnter = function(data, event){
                    //     if(event.keyCode === 13){
                    //         var emp = {};
                    //         emp.id = data.id;
                    //         self.loadPersonPage(emp);
                    //     }
                    //     return true;
                    // };
                    
                    self.changeHandler = function (page, event) {
                        if (event.option === 'selection') {
                            if (event.value[0]) {
                                var emp = {};
                                emp.id = event.value[0];
                                self.loadPersonPage(emp);
                            }
                        }
                    };
                    self.ready(true);

                }).fail(function(e){
                    console.log(e);
                });
            }

            function PeopleViewModel() {
                var self = this;

                var defaultLayout = utils.readCookie('peopleCardLayout');
                
                self.peopleLayoutType = ko.observable('peopleCardLayout');
                
                self.allPeople = ko.observableArray([]);
                self.ready = ko.observable(false);
                self.nameSearch = ko.observable('');
                self.listViewDataSource = ko.observable('');
                self.cardViewDataSource = ko.observable('');
                self.cardLayoutHandler = function () {
                    utils.createCookie('peopleLayout', 'peopleCardLayout');
                    self.peopleLayoutType('peopleCardLayout');
                };

                self.listLayoutHandler = function () {
                    utils.createCookie('peopleLayout', 'peopleListLayout');
                    self.peopleLayoutType('peopleListLayout');
                };

                GetFlights(self);  
                // data.fetchData('js/data/employees.json').then(function (people) {
                //     self.allPeople(people.employees);
                // }).fail(function (error) {
                //     console.log('Error in getting People data: ' + error.message);
                // });

                

            }

            return PeopleViewModel;
        });
