/*global cytoscape*/
(function(window, $, cytoscape, undefined) {
	'use strict';

	window.addEventListener('Agave::ready', function() {
		//window.alert('JS file ready.');

		// Variable
		var el, i, cytoscapeJsUrl, reCytoscape, hasCytoscape, allScripts;

		// Intialize
		// This is code from old AIP BAR interactions viewer (not sure if the app would work without it!)
		function init() {
			cytoscapeJsUrl = 'bower_components/cytoscape/dist/cytoscape.min.js';	// The cytoscape.js 

			hasCytoscape = false;
			reCytoscape = new RegExp(cytoscapeJsUrl);
			allScripts = document.querySelectorAll('script');

			// This is checking if cytoscape is present
			for (i = 0; i < allScripts.length && !(hasCytoscape); i++) {
				hasCytoscape = hasCytoscape || reCytoscape.test(allScripts[i].src);
			}

			// If we don't have cytoscape, add it
			if (!hasCytoscape) {
				el = document.createElement('script');
				el.src = cytoscapeJsUrl;
				el.type = 'text/javascript';
				document.body.appendChild(el);
			}
		}
		init();

		$(document).ready(function() {
			// This function loads cytoscape. 'elements' stores the newtwork
			var loadCy = function(elements) {
				$('#cyto').removeClass('hidden').cytoscape({
					layout: {
						name: 'grid',
						fit: false,
						padding: 50,
						avoidOverlap: true,
						position: function(node){},
						animate: false,
						animationDuration: 500,
					},
					style: cytoscape.stylesheet()
						.selector('node')
							.css({
								'shape': 'circle',
								'width': 30,
								'height': 30,
								'content': 'data(id)',
								'color': 'white',
								'text-outline-width': 2,
								'text-outline-color': '#888'
							})
						.selector('edge')
							.css({
								'width': 'data(width)',
								'line-style': 'data(lineStyle)',
								'line-color': 'data(color)',
							}),
					elements: elements
				}); // End .cytoscape()
			}; //  End loadCy()

			// Reset button
			$('#interactions-form').on('reset', function() {
				document.forms['interactions-form'].loci.value = '';
				$('#cyto').addClass('hidden');
			});

			// Submit button
			$('#interactions-form').on('submit', function(e) {
				e.preventDefault();
				var data = $('#loci').val();
				window.alert('data: ' + data);
			});					

			// About button
			$('#about').click(function() {
				window.alert('This app was developed by the BAR team with help from the AIP team. The data is obtained from BAR databases using webservices.');
			});
		});
	});
})(window, jQuery, cytoscape);
