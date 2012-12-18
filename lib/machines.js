AsterGalactic.lib["machines"] = [
	{
		"location": "land",
		"type": "power",
		"name": "Fusion Reactor",
		"mass": 1,
		"fuel": { "He": 0.01 },
		"output": 5000,
		"cost": { }
	},
	{
		"location": "land",
		"type": "power",
		"name": "Nuclear Reactor",
		"mass": 1,
		"fuel": { "U": 1 },
		"output": 1000,
		"cost": { }
	},
	{
		"location": "land",
		"type": "power",
		"name": "Gallium Arsenide Photovoltaic",
		"mass": 1,
		"output": 50,
		"cost": { "Ga": 1, "As": 1 }
	},
	{
		"location": "land",
		"type": "power",
		"name": "Silicon Photovoltaic",
		"mass": "1",
		"fuel": { },
		"output": 10,
		"cost": { "Si": "1" }
	},
	{
		"location": "land",
		"type": "mine",
		"name": "Gas Extractor",
		"mass": 1,
		"output": { "O": 1, "F": 1, "Cl": 1, "H": 1, "N": 1, "S": 1, "Br": 1, "He": 1 }
	},
	{
		"location": "land",
		"type": "mine",
		"name": "Alkaline Metal Extractor",
		"mass": 1,
		"output": { "Mg": 1, "Ca": 1, "Na": 1, "K": 1, "Sr": 1, "Rb": 1, "Ba": 1, "Li": 1 }
	},
	{
		"location": "land",
		"type": "mine",
		"name": "Heavy Metal Extractor",
		"mass": 1,
		"output":
		{
			"Fe": 1, "Ni": 1, "Al": 1, "Cr": 1, "Mn": 1, "Co": 1, "Ti": 1, "Zn": 1, "Cu": 1,  "V": 1,
			"Ga": 1, "Zr": 1, "Sc": 1,  "Y": 1, "Pb": 1, "Sn": 1, "Mo": 1, "Pt": 1,  "U": 1, "Th": 1
		}
	},
	{
		"location": "land",
		"type": "mine",
		"name": "Organic Extractor",
		"mass": 1,
		"output": { "C": 1, "P": 1, "Se": 1, "Si": 1, "Te": 1, "As": 1, "B": 1, "Ge": 1 },
		"cost": { }
	},
	{
		"location": "land",
		"type": "shop",
		"name": "Factory",
		"mass": 1,
		"cost": { }
	},
	{
		"location": "land",
		"type": "habitat",
		"name": "Dome Habitat"
		
	},
	{
		"location": "land",
		"type": "habitat",
		"name": "Underground Habitat"
		
	},
	{
		"location": "land",
		"type": "military",
		"name": "Ground Defense"
	},
	{
		"location": "orbit",
		"type": "power",
		"name": "Orbital Solar Array"
	},
	{
		"location": "land",
		"type": "shop",
		"name": "Shipyard",
		"mass": 1,
		"cost": { }
	},
	{
		"location": "orbit",
		"type": "habitat",
		"name": "Orbital Habitat",
	},
	{
		"location": "orbit",
		"type": "military",
		"name": "Orbital Defense",
	},
	{
		"location": "orbit",
		"type": "ship",
		"name": "Fighter",
		"attack": 10,
		"defense": 10,
	},
	{
		"location": "orbit",
		"type": "ship",
		"name": "Cruiser",
		"attack": 50,
		"defense": 50,
	},
	{
		"location": "orbit",
		"type": "ship",
		"name": "Mothership",
		"attack": 500,
		"defense": 500,
	},
	{
		"location": "orbit",
		"type": "ship",
		"name": "Von Neumann",
		"attack": 5,
		"defense": 100,
	}
];
