/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Header module
 */
define(['knockout','ojs/ojcore', 'utils','ojs/ojknockout', 'ojs/ojnavigationlist', 'ojs/ojoffcanvas', 'ojs/ojdatacollection-common', 'ojs/ojdialog'], function (ko, oj, utils) {
    /**
     * The view model for the header module
     */

    
    function HeaderViewModel() {
        var self = this;

       
      

        self.cart = 0;
        self.appName = "微服务+多租户demo";
        self.appDrawer =
                {
                    "edge": "start",
                    "displayMode": "push",
                    "selector": "#appDrawer",
                    "selection": "selectedItem",
                    "content": '#pageContent'
                };

        var appNavData = [
            {
                name: "航班",
                id: "flights",
                iconClass: 'oj-navigationlist-item-icon'
            },
            {
                name: "酒店",
                id: "hotels",
                iconClass: 'oj-navigationlist-item-icon'
            },
            {
                name: "订单",
                id: "booking",
                iconClass: 'oj-navigationlist-item-icon'
            },
            {
                name: "价格管理",
                id: "update",
                iconClass: 'oj-navigationlist-item-icon'
            }
        ];

        self.dataSource = new oj.ArrayTableDataSource(appNavData, {idAttribute: 'id'});



        var offScreenDataButton = {
            "label": "offscreen-toggle",
            "iconClass": "oj-web-applayout-offcanvas-icon",
            "url": "#"
        };

        self.offScreenButtonIconClass = offScreenDataButton.iconClass;
        self.offScreenButtonLabel = offScreenDataButton.label;

        self.toggleAppDrawer = function ()
        {
            return oj.OffcanvasUtils.toggle(self.appDrawer);
        };

        var query = window.matchMedia("(min-width: 39.375rem)");
        var mqListener = function (event)
        {
            oj.OffcanvasUtils.close(self.appDrawer);
        };
        query.addListener(mqListener);

    }
    return HeaderViewModel;
});
