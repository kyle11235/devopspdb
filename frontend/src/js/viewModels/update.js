define(['ojs/ojcore', 'knockout', 'jquery', 'data/data', 'ojs/ojknockout', 'promise',
        'ojs/ojdatagrid', 'ojs/ojarraydatagriddatasource','ojs/ojlistview','ojs/ojselectcombobox','ojs/ojmodule', 'ojs/ojbutton',
        'ojs/ojcomposite', 'ojs/ojtable', 'ojs/ojgauge', 'ojs/ojarraytabledatasource'],
 function(oj, ko, $, data) {
   
    function ViewModel() {
        var self = this;

        // button
        self.message = ko.observable("");
        self.buttonClick = function(event){
            self.message("value1=" + self.value1() + ', value2= ' + self.value2());


            $.ajax({
                type: "GET",
                url: data.flightAPI + "/api/update/" + self.value1() + '/' + self.value2(),
                contentType: "application/json",
                success: function (data) {
                    self.message(data);
                    console.log(data);
                }
            });

            return true;
        }

        // select
        self.value1 = ko.observable("1000");
        self.value2 = ko.observable("2000");

    }
    return new ViewModel();
  }
);
