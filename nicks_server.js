var express = require('express');
var app = express();
var handlebars = require('handlebars');
var fs = require('fs');
	
fs.readFile('./profile_template.html', {encoding : 'utf8'}, function (err, source) {
	if (err) throw err;
	app.set( 'profile template', { data : source } );
	});	

/********************/
//database setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/alumni_profiles');
var connection = mongoose.connection;	
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function callback () {
		console.log('connected to database')
	});
	
var alumniSchema = mongoose.Schema({
	name: String,
	school: String
	});
	
var alumni = mongoose.model('alumni', alumniSchema);	
//database setup
/********************/
	
app.get('/', function(req, res) {
	//console.log(req.headers);
	if (req.param('action') == 'newuser')
	{
		res.sendfile('new_user_form.html');
	}

	else if (req.param('action') == 'view')
	{
		var alumnName = req.param('alumnName');
		//console.log(alumnName+"\n\n\n\n\n\n\n\n\n");
		console.log("about to render profile");
		renderProfile(alumnName, res);
	}
	
	else if (req.param('action') == 'search')
	{
		res.sendfile('directory_page.html');
	}

	else res.sendfile('index.html');
	});

app.get('/register', function(req, res) {
		if (req.param('alumnName') && req.param('alumnSchool'))
		{
			console.log("calling createUser!\n\n\n\n\n\n\n");
			var name = req.param('alumnName');
			var school = req.param('alumnSchool');
			createUser(name,school);
		}
		res.redirect('/');
	}); 	

app.get('/search', function(req, res) {
		if (req.param('alumnName') && req.param('alumnSchool'))
		{
			var name = req.param('alumnName');
			res.redirect('/?action=view\&alumnName='+name);
		}
	}); 
	
app.get('/css/bootstrap.css', function(req, res) {
  res.sendfile('css/bootstrap.css');
});

app.get('/js/bootstrap.js', function(req, res) {
  res.sendfile('js/bootstrap.js');
});

app.get('/handlebars.js', function(req, res) {
  res.sendfile('./handlebars.js');
});

var createUser = function(alumnName, alumnSchool) {
	 var qry = alumni.find({name: alumnName});
	 //console.log(qry);
	// exists : qry.find({ name: alumnName, school: alumnSchool }).find(function(){});
	 qry.count(function(err, count) {
		if(err) throw err;
		console.log("count"+count+"\n\n\n\n\n\n\n\n\n\n\n");
		if (count == 0) {
			var newAlumn = new alumni({ name: alumnName, school: alumnSchool });
			newAlumn.save(function(err,newAlumn) {
				if(err) throw err;
			});
		}
		else console.log("user already in the system!");
		});
};

var renderProfile = function(alumnName, res) {
	var ret;
	//console.log(alumnName+"\n\n\n\n\n\n\n\n\n\n\n\n\n");
	var info = alumni.find( { name : alumnName }, function(err, alumn) {
		if (err) throw err;
		var context = {'name': alumn[0].name, 'school': alumn[0].school};
		var temp = handlebars.compile(app.get( 'profile template' ).data);
		var page = temp(context);
		res.send(page);
		});
	};
	
var portNum = process.argv[2];
//console.log("Port: " + portNum);
if(portNum != undefined) {
	app.listen(Number(portNum));
}
else {
	app.listen(8081);
}

