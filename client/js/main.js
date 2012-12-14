var view_mode = 'loader';
var galaxy = {};

function change_view(view)
{
	if(view_mode == 'errors')
		return; // You cannot escape Errors View!
	switch(view)
	{
		case 'loader':
			$('body div').fadeOut('fast', function()
			{
				$('#loader_view').fadeIn('fast');
			});
			break;
		case 'errors':
			// TODO: Flash menacingly.
			$('body div').fadeOut('fast', function()
			{
				$('#errors_view').fadeIn('fast');
			});
			break;
		case 'galaxy':
			// TODO: Zoom out from Sector View.
			$('body div').fadeOut('fast', function()
			{
				$('#galaxy_view').fadeIn('fast');
			});
			break;
		case 'sector':
			// TODO: Zoom in from Galaxy View, or out from System View.
			$('body div').fadeOut('fast', function()
			{
				$('#sector_view').fadeIn('fast');
			});
			break;
		case 'system':
			// TODO: Zoom in from Sector View, or out from Object View.
			$('body div').fadeOut('fast', function()
			{
				$('#system_view').fadeIn('fast');
			});
			break;
		case 'object':
			// TODO: Zoom in from System View.
			$('body div').fadeOut('fast', function()
			{
				$('#object_view').fadeIn('fast');
			});
			break;
		default:
			console.log('Cannot change_view() to: ' + view);
	}
	view_mode = view;
}

function remap_galaxy()
{
	var shapesLayer = new Kinetic.Layer();
	for(sector in galaxy)
	{
		new_sector = new Kinetic.Rect({
			'x':      sector.coords[0],
			'y':      sector.coords[1],
			'width':  sector.coords[2],
			'height': sector.coords[3]
		});
		new_sector.on('mouseover', function() {	show_sector_info(sector.id); });
		new_sector.on('mouseout', function() { hide_sector_info(); });
		shapesLayer.add(new_sector);
	}
	var canvas = $("#galaxy_canvas")[0].getContext("2d");
	canvas.fillStyle = "#FF0000";
	canvas.fillRect(0,0,150,75);
}

$(document).ready(function()
{
	$.ajax({
		'url': 'js/galaxy.js',
		'dataType': 'json',
		'success': function(response)
		{
			galaxy = response.galaxy;
			remap_galaxy();
			change_view('galaxy');
		},
		'error': function() { change_view('errors'); }
	});
});
