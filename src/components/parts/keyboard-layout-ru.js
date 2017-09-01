module.exports = {

	"normal": {

		_meta: {
			"tab": { key: "\t", text: "Tab", width: 60, classes: "control"},
			"shiftl": { keySet: "shifted", text: "Shift", width: 100, classes: "control"},
			"shiftr": { keySet: "shifted", text: "Shift", width: 100, classes: "control"},
			"caps": { keySet: "capsed", text: "Caps lock", width: 80, classes: "control"},
			"space": { key: " ", text: "Space", width: 180},
			"enter": { key: "\r\n", text: "Enter", width: 80, classes: "control"},
			"backspace": { func: "backspace", classes: "control backspace", width: 65},
			"accept": { func: "accept", text: "Close", classes: "control featured"},
			"next": { func: "next", text: "Next", classes: "control featured"}
		},

		default: [
			"` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
			"{tab} й ц у к е н г ш щ з х ъ \\",
			"{caps} ф ы в а п р о л д ж э {enter}",
			"{shiftl} я ч с м и т ь б ю . {shiftr}",
			"{next} {space} , {accept}"
		],
		shifted: [
			"~ ! @ # $ % ^ & * ( ) _ + {backspace}",
			"{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ |",
			"{caps} Ф Ы В А П Р О Л Д Ж Э {enter}",
			"{shiftl} Я Ч С М И Т Ь Б Ю . {shiftr}",
			"{next} {space} , {accept}"
		],
		
		capsed: [
			"` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
			"{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ |",
			"{caps} Ф Ы В А П Р О Л Д Ж Э {enter}",
			"{shiftl} Я Ч С М И Т Ь Б Ю . {shiftr}",
			"{next} {space} , {accept}"
		]		
	},

	"compact": {

		_meta: {
			"default": { keySet: "default", text: "abc", classes: "control"},
			"alpha": { keySet: "default", text: "Abc", classes: "control"},
			"shift": { keySet: "shifted", text: "ABC", classes: "control"},
			"numbers": { keySet: "numbers", text: "123", classes: "control"},
			"space": { key: " ", text: "Space", width: 200},
			"backspace": { func: "backspace", classes: "control"},
			"accept": { func: "accept", text: "Close", classes: "control featured"},
			"next": { func: "next", text: "Next", classes: "featured"},
			"zero": { key: "0", width: 130}
		},

		default: [
			"й ц у к е н г ш щ з х ъ",
			" ф ы в а п р о л д ж э ",
			"{shift} я ч с м и т ь б ю {backspace}",
			"{numbers} , {space} . {next} {accept}"
		],

		shifted: [
			"Й Ц У К Е Н Г Ш Щ З Х Ъ",
			" Ф Ы В А П Р О Л Д Ж Э ",
			"{default} Я Ч С М И Т Ь Б Ю ",
			"{numbers} _ {space} {backspace} {next} {accept}"
		],

		numbers: [
			"1 2 3",
			"4 5 6",
			"7 8 9",
			"  {alpha} . {zero} {backspace} {next} {accept}"
		]
	},

	"numeric": {

		_meta: {
			"backspace": { func: "backspace", classes: "control"},
			"accept": { func: "accept", text: "Close", classes: "control featured"},
			"next": { func: "next", text: "Next", classes: "control featured"},
			"zero": { key: "0", width: 130}
		},

		default: [
			"1 2 3",
			"4 5 6",
			"7 8 9",
			"_ - . {zero} {backspace} {next} {accept}"
		]
	}

};