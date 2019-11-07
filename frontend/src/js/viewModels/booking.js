define(['ojs/ojcore', 'knockout', 'jquery', 'data/data', 'ojs/ojknockout', 'promise',
        'ojs/ojdatagrid', 'ojs/ojarraydatagriddatasource','ojs/ojlistview','ojs/ojselectcombobox','ojs/ojmodule', 'ojs/ojbutton',
        'ojs/ojcomposite', 'ojs/ojtable', 'ojs/ojgauge', 'ojs/ojarraytabledatasource'],
 function(oj, ko, $, data) {
   
    function ViewModel() {
        var self = this;


        // booking list
        self.bookingList = ko.observableArray([]);
        
        
        self.query = function(event){

            $.ajax({
                type: "GET",
                url: data.bookingAPI + "/api/booking",
                contentType: "application/json",
                success: function (res) {
                    
                    self.bookingList(res);

                }
            });

        }

        self.query();



    }
    return new ViewModel();
  }
);
