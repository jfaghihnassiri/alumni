$(document).ready(function() {
	var d = new Date();
	// Put the copywrite in the footer
	$('#footer').append('<div id="copywrite">Copyright &copy; ' + d.getFullYear() + ' Jhon Nassiri</div>');
	// Put the navigation links in the left pane
	$('#jnav').append(
		"<h2>Navigation</h2>"+
		"<ul>"+
			"<li>About</li>"+
			"<li>Alumni Stories</li>"+
			"<li>Donate</li>"+
			"<li>Contact</li>"+
		"</ul>");
	// Put the social links in the right pane
	$('#jlink').append(
		"<h2>Links</h2>"+
			"<h3>IDE</h3>"+
			"<ul>"+
				"<li>Website</li>"+
				"<li>Facebook</li>"+
				"<li>Linkedin</li>"+
				"<li>Email</li>"+
			"</ul>"+
			"<h3>CDB</h3>"+
			"<ul>"+
				"<li>Website</li>"+
				"<li>Email</li>"+
			"</ul>"+
			"<h3>Alumni</h3>"+
			"<ul>"+
				"<li>Linkedin</li>"+
				"<li>Email Us</li>"+
			"</ul>"+
		"</ul>");

});

