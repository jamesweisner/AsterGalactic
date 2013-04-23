// The view doesn't have any Rosie O'Donnell.
// Instead, it manages the DOM and canvas.

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
			// TODO: Zoom out from System View.
			$('body div').fadeOut('fast', function()
			{
				$('#galaxy_view').fadeIn('fast');
			});
			break;
		case 'system':
			// TODO: Zoom in from System View, or out from Planet View.
			$('body div').fadeOut('fast', function()
			{
				$('#system_view').fadeIn('fast');
			});
			break;
		case 'planet':
			// TODO: Zoom in from System View.
			$('body div').fadeOut('fast', function()
			{
				$('#planet_view').fadeIn('fast');
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
	for(system in galaxy)
	{
		new_system = new Kinetic.Rect({
			'x':      sector.coords[0],
			'y':      sector.coords[1],
			'width':  sector.coords[2],
			'height': sector.coords[3]
		});
		new_system.on('mouseover', function() {	show_system_info(system.id); });
		new_system.on('mouseout',  function() { hide_system_info(); });
		shapesLayer.add(new_system);
	}
	var canvas = $("#galaxy_canvas")[0].getContext("2d");
	canvas.fillStyle = "#FF0000";
	canvas.fillRect(0,0,150,75);
}