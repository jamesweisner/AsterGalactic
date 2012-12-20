// The GUI handles interaction with the player.
// It traps events using jQuery, handles things like menu logic.
// It validates user actions, and emits events vai the web socket.

$(document).ready(function()
{
	$('#login-form').submit(function()
	{
		// Already logged in?
		if(AsterGalactic.player) return false;
		
		// Only click submit once.
		var submitButton = $('#login-form input[type="submit"]');
		if(submitButton.attr('disabled')) return false;
		submitButton.attr('disabled', true);
		
		// Send login request.
		var username = $(this).find('input[type="text"]').val();
		var password = $(this).find('input[type="password"]').val();
		password = CryptoJS.SHA256(password + CryptoJS.SHA256(username)).toString(CryptoJS.enc.Hex); // Two condoms.
		var socket = AsterGalactic.getSocket();
		socket.emit('login', username, password);
		return false;
	});
});
