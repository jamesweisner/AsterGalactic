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
			console.log("Cannot change_view() to: " + view);
	}
	view_mode = view;
}

$(document).ready(function()
{
	$.ajax({
		"url": "js/galaxy.js",
		"dataType": "json",
		"success": function(response)
		{
			galaxy = response.galaxy;
			change_view('galaxy');
		},
		"error": function() { change_view('errors'); }
	});
});
