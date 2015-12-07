﻿(function() {
    'use strict';

    angular.module('openfin.showcase', [])
        .controller('ShowcaseCtrl', [function() {
            var self = this;

            self.stocks = [
                'AAPL',
                'MSFT',
                'TITN',
                'SNDK'
            ];

            self.open = function() {
                var child = new fin.desktop.Window({
                    name: 'd3fc-showcase',
                    url: 'd3fc-showcase.html'
                }, function() {
                    child.show();
                });
            };
        }]);
}());