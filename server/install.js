var readline = require('readline'); // http://nodejs.org/api/readline.html

var console = readline.createInterface({ input: process.stdin, output: process.stdout });

// Defaults.
var galaxy_name = 'Milky Way';
var num_systems = 10000;

function make_next_system()
{
	if(--num_systems < 0) return;
	db.serialize(function()
	{
		// find a random place
		// create star system
		// populate with planets
		// callback make_next_system
	});
}

exports.database = function(db, callback)
{
	db.serialize(function()
	{
		// Galaxy settings.
		db.run("CREATE TABLE galaxy (key TEXT, value TEXT)");
		
		// Star systems.
		db.run("CREATE TABLE system (\
			system_id INTEGER PRIMARY KEY,\
			name TEXT,\
			location_x REAL,\
			location_y REAL,\
			time DATETIME DEFAULT (strftime('%s', 'now'))\
		)");
		db.run("CREATE UNIQUE INDEX system_name ON system (name)");
		db.run("CREATE        INDEX system_time ON system (time)");
		
		// Planets, stars, moons, and asteroids.
		// Elements is an integer string like with one digit per element.
		db.run("CREATE TABLE planet (\
			system_id REFERENCES system (system_id),\
			player_id REFERENCES player (player_id),\
			type INTEGER,\
			orbit_r REAL,\
			orbit_a REAL,\
			mass REAL,\
			area REAL,\
			elements TEXT,\
			time DATETIME DEFAULT (strftime('%s', 'now'))\
		)");
		db.run("CREATE INDEX planet_time ON planet (time)");
		
		// Player accounts.
		// Population, research, and systems are cached totals.
		// Technologies and achievements are integer strings like "0190".
		db.run("CREATE TABLE player (\
			player_id INTEGER PRIMARY KEY,\
			username TEXT,\
			password TEXT,\
			creidts INTEGER,\
			population INTEGER,\
			research INTEGER,\
			systems INTEGER,\
			technologies TEXT,\
			achievements TEXT,\
			guild_id REFERENCES guild (guild_id)\
		)");
		db.run("CREATE UNIQUE INDEX player_username   ON player (username)");   // Login.
		db.run("CREATE        INDEX player_population ON player (population)"); // Leaderboard.
		db.run("CREATE        INDEX player_credits    ON player (credits)");    // Leaderboard.
		db.run("CREATE        INDEX player_research   ON player (research)");   // Leaderboard.
		db.run("CREATE        INDEX player_systems    ON player (systems)");    // Leaderboard.
		db.run("CREATE        INDEX player_guild      ON player (guild_id)");   // List guild members.

		// Login history has no primary key.
		db.run("CREATE TABLE login (\
			player_id REFERENCES player (player_id),\
			ip INTEGER,\
			time DATETIME DEFAULT (strftime('%s', 'now'))\
		)");
		db.run("CREATE UNIQUE INDEX login_player_id ON login (player_id, time)"); // Show a player login history.
		db.run("CREATE UNIQUE INDEX login_ip        ON login (ip, time)");        // Find alternate accounts.
		db.run("CREATE UNIQUE INDEX login_time      ON login (time)");            // Calculate login metrics.

		db.run("CREATE TABLE fleet (\
			fleet_id PRIMARY KEY\
			/*TODO*/\
		)");

		db.run("CREATE TABLE machine (\
			machine_id PRIMARY KEY,\
			type INTEGER,\
			player_id REFERENCES player (player_id),\
			planet_id REFERENCES planet (planet_id),\
			fleet_id  REFERENCES fleet  (fleet_id),\
			system_id REFERENCES system (system_id),\
			time DATETIME DEFAULT (strftime('%s', 'now'))\
			/* TODO upgrade level, other properties, parts, etc. */\
		)");
		db.run("CREATE INDEX machine_time ON machine (time)");

		db.run("CREATE TABLE fleet_machine (\
			fleet_id   REFERENCES fleet   (fleet_id), \
			machine_id REFERENCES machine (machine_id),\
			PRIMARY KEY (fleet_id, machine_id)\
		)");

		db.run("CREATE TABLE guild (\
			guild_id INTEGER PRIMARY KEY,\
			owner_id REFERENCES player (player_id),\
			name TEXT\
		)");
		db.run("CREATE UNIQUE INDEX guild_name ON guild (name)");

		// Initialize galaxy.
		var galaxy = db.prepare("INSERT INTO galaxy (key, value) VALUES (?, ?)");
		console.question('Galaxy name [' + galaxy_name + ']: ', function(answer)
		{
			if(answer) galaxy_name = answer;
			galaxy.run(['name', galaxy_name]);
			console.question('Number of systems: ', function(answer)
			{
				if(!isNaN(parseInt(answer))) num_systems = parseInt(answer);
				galaxy.run(['systems', systems], make_next_system);
			});
		});
	});
};
