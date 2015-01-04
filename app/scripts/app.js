/*global cytoscape*/
(function(window, $, cytoscape, undefined) {
	'use strict';

	var appContext = $('[data-app-name="aip-interactions-viewer"]');

	// Variables for graph
	var nodes = [], edges = [];

	window.addEventListener('Agave::ready', function() {
		var Agave = window.Agave;

		// Variable
		var el, i, cytoscapeJsUrl, arborJsUrl, reCytoscape, reArbor, hasCytoscape, hasArbor, allScripts;

		// Intialize
		// This is code from old AIP BAR interactions viewer (not sure if the app would work without it!)
		function init() {
			cytoscapeJsUrl = 'bower_components/cytoscape/dist/cytoscape.min.js';	// The cytoscape.js 
			arborJsUrl = 'bower_components/cytoscape/lib/arbor.js';	// The layout file

			hasCytoscape = hasArbor = false;
			reCytoscape = new RegExp(cytoscapeJsUrl);
			reArbor = new RegExp(arborJsUrl);
			allScripts = document.querySelectorAll('script');

			// This is checking if cytoscape is present
			for (i = 0; i < allScripts.length && !(hasCytoscape); i++) {
				hasCytoscape = hasCytoscape || reCytoscape.test(allScripts[i].src);
				hasArbor = hasArbor || reCytoscape.test( allScripts[i].src );
			}

			// If we don't have cytoscape, add it
			if (!hasCytoscape) {
				el = document.createElement('script');
				el.src = cytoscapeJsUrl;
				el.type = 'text/javascript';
				document.body.appendChild(el);
			}

			// If we don't have Arbor, add it
			if (!hasArbor) {
				el = document.createElement( 'script' );
				el.src = arborJsUrl;
				el.type = 'text/javascript';
				document.body.appendChild( el );
			}
		}
		init();


		$(document).ready(function() {
			// This function loads cytoscape. 'elements' stores the newtwork
			var loadCy = function(elements) {
				var myStyle = 'node { content: data(name);}';
				$('#cyto').removeClass('hidden').cytoscape({
					layout: {
						name: 'arbor',
						liveUpdate: true,
						maxSimulationTime: 4000,
						padding: [ 50, 50, 50, 50 ],
						ungrabifyWhileSimulating: true,
						gravity: true,
						stepSize: 1
					},
					style: myStyle, 					
					elements: elements
				}); // End .cytoscape()
			}; //  End loadCy()

			// Reset button
			$('#interactions-form', appContext).on('reset', function() {
				document.forms['interactions-form'].loci.value = '';
				$('#cyto').addClass('hidden');
			});

			// Submit button
			$('#interactions-form', appContext).on('submit', function(e) {
				e.preventDefault();
				
				//var loci = $('#loci').val();

				// Add query to nodes
				
				var query = {
					locus: 'AT1G01010',
					published: 'false'
				};

				Agave.api.adama.search({
					'namespace': 'asher', 'service': 'interactions_v0.1', 'queryParams': query
				}, function(response) {
					nodes = [];
					edges = [];
					nodes.push({data: {
						id: 'AT1G01010',
						name: 'AT1G01010'
					}});

					for (var i = 0; i < response.obj.result.length; i++) {
						nodes.push({data: {
							id: response.obj.result[i].locus,
							name: response.obj.result[i].locus
						}});
					
						edges.push({data: {
							source: 'AT1G01010', 
							target: response.obj.result[i].locus
						}});
					}
		
					var elements = {nodes: nodes, edges: edges}; 
					loadCy(elements);
				});

			});					

			// About button
			$('#about').click(function() {
				window.alert('This app was developed by the BAR team with help from the AIP team. The data is obtained from BAR databases using webservices.');
			});



		});
	});
})(window, jQuery, cytoscape);
