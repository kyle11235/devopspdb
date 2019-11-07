/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'knockout', 'utils', 'jquery', 'data/data', 'ojs/ojrouter', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojpagingcontrol', 'ojs/ojpagingcontrol-model'],
        function (oj, ko, utils, $, data)
        {
            function GetHotels(self){
                // $.getJSON(location.protocol + "//" + window.location.hostname + ':9090/api/hotel').done(function(data){

                $.getJSON(data.hotelAPI + '/api/hotel').done(function(data){
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
                                            if (r.Name.toLowerCase().indexOf(token) === 0 || r.Address.toLowerCase().indexOf(token) === 0) {
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
    
                    self.getPhoto = function (alias) {
                        var src;
                        if (alias != 'unknow') {
                            src = 'css/images/hotels/' + alias + '.png';
                        } else {
                            src = 'css/images/hotels/others.png';
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
    
                    self.loadPersonPage = function(data, event){

                        self.comments(JSON.parse(data.comments) );
                        
                        return true;
                    };
                    
                    self.changeHandler = function (page, event) {
                        if (event.option === 'selection') {
                            if (event.value[0]) {
                                var emp = {};
                                emp.ID = event.value[0];
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
                self.comments = ko.observableArray([]);

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

                GetHotels(self);  
                // data.fetchData('js/data/employees.json').then(function (people) {
                //     self.allPeople(people.employees);
                // }).fail(function (error) {
                //     console.log('Error in getting People data: ' + error.message);
                // });

                

            }

            return PeopleViewModel;
        });
