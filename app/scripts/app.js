/*global cytoscape*/
(function(window, $, cytoscape, undefined) {
	'use strict';

	window.addEventListener('Agave::ready', function() {
		//window.alert('JS file ready.');

		$(document).ready(function() {
			// About button
			$('#about').click(function() {
				window.alert('This app was developed by the BAR team with help from the AIP team. The data is obtained from BAR databases using webservices.');
			});
		});
	});
})(window, jQuery, cytoscape);
