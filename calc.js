/* Character stat calc - start */
const level_cap = 83;
const max_tier = [3, 7, 7, 7, 2]; // Max tier for Weapon, Equipment 1, 2, 3, Gear
const reverse_ingame_stats = true; // Estimate raw numbers if provided data is sourced ingame

// Equipment max levels per tier
const equipment_level_preset = {1:10, 2:20, 3:30, 4:40, 5:45, 6:50, 7:55};
const weapon_level_preset = {1:30, 2:40, 3:50, 4:60, 5:70};


const rarity_bonus = {
	"attack"	: [0, 0, 1000,	2200, 3600, 5300 ],
	"defense"	: [0, 0, 0,		0,    0, 	0 	 ],
	"healing"	: [0, 0, 750, 	1750, 2950, 4450 ],
	"hp"		: [0, 0, 500, 	1200, 2100, 3500 ]
};

const equipment_stats = {
'hat' : {
	//	param		  	   N	T1		T2		T3		T4		T5		T6		T7
		'attack%' 		: [0,	8, 		13,		18,		25,		30,		35,		40 		],
		'attack' 		: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],
		'defense%' 		: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],
		'defense' 		: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],
		'healing%' 		: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],
		'healing' 		: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],
		'hp%'			: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],
		'hp'			: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],

		'crit_damage' 	: [0,	0, 		0, 		0,		800, 	1200,	1600,	1800 	],
		'crit_rate' 	: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],
		'accuracy' 		: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],
		'evasion' 		: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],
		'cc_str%'		: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],
		'cc_res%'	 	: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],
		'crit_res' 		: [0,	0, 		0, 		0,		0, 		0,		0,		0 		],
		'critdamage_res': [0,	0, 		0, 		0,		0, 		0,		0,		0		],
		'healing_inc' 	: [0,	0, 		0, 		0,		0, 		0,		0,		0		],
		'attack_speed' 	: [0,	0, 		0, 		0,		0, 		0,		0,		0		],
},

'gloves' : {
	//	param			   N	T1		T2		T3		T4		T5		T6		T7
		'attack%'		: [0,	6.4, 	10.4,	14.4,	20,		25,		30,		35		],
		'crit_rate'	 	: [0,	0, 		0, 		0,		70,		200,	300,	350		],
		'accuracy' 		: [0,	0, 		0, 		0,		0, 		0,		30,		200		],
	},

'shoes' : {
	//	param			   N	T1		T2		T3		T4		T5		T6		T7
		'attack%'		: [0,	4, 		6.5,	9,		12.5,	20,		25,		30 		],
		'hp%'			: [0,	0, 		0, 		0,		6, 		9,		12,		13.5	],
	},

'bag' : {
	//	param			   N	T1		T2		T3		T4		T5		T6		T7
		'hp'			: [0,	600,	975,	1350,	1875,	3500,	5500,	7500	],
		'defense'		: [0,	0, 		0, 		0,		1000, 	1100,	1200,	1300	],
	},

'badge' : {
	//	param			   N	T1		T2		T3		T4		T5		T6		T7
		'hp'			: [0,	800,	1300,	1800,	2500,	4500,	6500,	9500	],
		'healing_inc'	: [0,	0, 		0, 		0,		1000, 	2000,	3000,	3200	],
		'hp%'			: [0,	0, 		0, 		0,		0,	 	10,		18,		22		],
		'evasion'		: [0,	0, 		0, 		0,		0,	 	0,		0,		400		],
	},

'hairpin' : {
	//	param			   N	T1		T2		T3		T4		T5		T6		T7
		'hp'			: [0,	400,	650,	950,	1250,	3000,	4500,	6500	],
		'cc_res%'	 	: [0,	0, 		0, 		0,		10,		20,		24,		28 		],
	},

'charm' : {
	//	param			   N	T1		T2		T3		T4		T5		T6		T7
		'crit_res'		: [0,	80, 	130,	180,	250,	280,	320,	360		],
		'critdamage_res': [0,	0, 		0, 		0,		1000,	1500,	1800,	2100	],
		'crit_rate'		: [0,	0, 		0, 		0,		0,		120,	150,	180		],
	},

'watch' : {
	//	param			   N	T1		T2		T3		T4		T5		T6		T7
		'crit_rate'		: [0,	80, 	130,	180,	250,	280,	320,	360		],
		'crit_damage' 	: [0,	0, 		0, 		0,		1000,	1500,	1800,	2100	],
		'hp%' 			: [0,	0, 		0, 		0,		0,		5,		7,		9		],
	},

'necklace' : {
	//	param			   N	T1		T2		T3		T4		T5		T6		T7
		'healing%' 		: [0,	8, 		13, 	18,		25, 	28,		32,		35		],
		'cc_str%' 		: [0,	8, 		13, 	18,		25, 	28,		32,		35		],
		'attack%' 		: [0,	0, 		0, 		0,		0,		4,		6,		8		],
	},

};

//const equipment_stats_list = Object.keys(equipment_stats.hat);

const stats_list = [
	'attack', 'defense', 'healing', 'hp',
	'crit_damage', 'crit_rate', 'accuracy', 'evasion', 'cc_str', 'cc_res', 'crit_res', 'critdamage_res', 'healing_inc', 'attack_speed'
]

const stats_list_map = {
	'Attack' : 'attack',
	'Defense': 'defense',
	'HP': 'hp',
	'Healing': 'healing',
	'Accuracy': 'accuracy',
	'Evasion': 'evasion',
	'Critical Rate': 'crit_rate',
	'Critical Damage': 'crit_damage',
	'Stability': 'stability',
	'Firing Range': 'range',
	'CC Strength': 'cc_str%',
	'CC Resistance': 'cc_res%',
	'Attack Speed': 'attack_speed',
	'Movement Speed': 'move_speed',
	'Cost Recovery': 'regen_cost',
	'Ammo Count': 'ammo_count',
	'Ammo Cost': 'ammo_cost',
};

var statCalc = {};
var tableCounter = 0;

$( document ).ready(function() {
	initStatCalc();
	$(".stattable-controls input").on("change mouseup keyup click", function(){levelChange($(this).closest("table"));statTableRecalc($(this).closest("table"));});
	$(".stattable-rarity-selector").children("img").on("click", function(){rarityChange($(this).closest("table"),$(this).attr('data-rarity'));statTableRecalc($(this).closest("table"));})

	$(".stattable-equipment-selector select").on("change", function(){equipmentChange($(this).closest("table"));statTableRecalc($(this).closest("table"));});
	$(".stattable-equipment-selector").find("img").on("click", function(){equipmentChange($(this).closest("table"),$(this).parent().attr('data-slot'));statTableRecalc($(this).closest("table"));})
});
	

function initStatCalc(){
	$(".character-stattable").each(function(){
		var id = 'statTable-'+(++tableCounter);
		if ($(this).attr('data-character_id') !== undefined) id = $(this).attr('data-character_id');
		$(this).attr('id',id);
		//console.log('StatCalc - init table id ' + id);

		statCalc[id] = {}


		var attack_data = $(this).find(".stat-attack").html().split('/');
		var defense_data = $(this).find(".stat-defense").html().split('/');
		var hp_data = $(this).find(".stat-hp").html().split('/');
		var healing_data = $(this).find(".stat-healing").html().split('/');
		var ammo_data = $(this).find(".stat-ammo").html().split('/');
		

		statCalc[id].stats = {};
		statCalc[id].stats.rarity = !isNaN(parseInt($(document).find(".character-rarity").attr('data-value'))) ? parseInt($(document).find(".character-rarity").attr('data-value')) : 3 ;
		statCalc[id].stats.level = level_cap;
		
		statCalc[id].stats.attack_min	= parseInt(attack_data[0]) > 0 ? parseInt(attack_data[0]) : null;
		statCalc[id].stats.attack_max	= parseInt(attack_data[1]) > 0 ? parseInt(attack_data[1]) : null;
		statCalc[id].stats.defense_min	= parseInt(defense_data[0]) > 0 ? parseInt(defense_data[0]) : null;
		statCalc[id].stats.defense_max	= parseInt(defense_data[1]) > 0 ? parseInt(defense_data[1]) : null;
		statCalc[id].stats.hp_min		= parseInt(hp_data[0]) > 0 ? parseInt(hp_data[0]) : null;
		statCalc[id].stats.hp_max		= parseInt(hp_data[1]) > 0 ? parseInt(hp_data[1]) : null;
		statCalc[id].stats.healing_min	= parseInt(healing_data[0]) > 0 ? parseInt(healing_data[0]) : null;
		statCalc[id].stats.healing_max	= parseInt(healing_data[1]) > 0 ? parseInt(healing_data[1]) : null;

		statCalc[id].stats.accuracy		= parseInt($(this).find(".stat-accuracy").html()) > 0 ? parseInt($(this).find(".stat-accuracy").html()) : null;
		statCalc[id].stats.evasion		= parseInt($(this).find(".stat-evasion").html()) > 0 ? parseInt($(this).find(".stat-evasion").html()) : null;
		statCalc[id].stats.crit_rate	= parseInt($(this).find(".stat-crit_rate").html()) > 0 ? parseInt($(this).find(".stat-crit_rate").html()) : null;
		statCalc[id].stats.crit_damage	= parseInt($(this).find(".stat-crit_damage").html()) > 0 ? parseInt($(this).find(".stat-crit_damage").html()) : null;
		statCalc[id].stats.stability	= parseInt($(this).find(".stat-stability").html()) > 0 ? parseInt($(this).find(".stat-stability").html()) : null;
		statCalc[id].stats.range		= parseInt($(this).find(".stat-range").html()) > 0 ? parseInt($(this).find(".stat-range").html()) : null;
		statCalc[id].stats.cc_str		= parseInt($(this).find(".stat-cc_str").html()) > 0 ? parseInt($(this).find(".stat-cc_str").html()) : null;
		statCalc[id].stats.cc_res		= parseInt($(this).find(".stat-cc_res").html()) > 0 ? parseInt($(this).find(".stat-cc_res").html()) : null;
		statCalc[id].stats.attack_speed	= parseInt($(this).find(".stat-attack_speed").html()) > 0 ? parseInt($(this).find(".stat-attack_speed").html()) : null;
		statCalc[id].stats.move_speed	= parseInt($(this).find(".stat-move_speed").html()) > 0 ? parseInt($(this).find(".stat-move_speed").html()) : null;
		statCalc[id].stats.ammo_count	= parseInt(ammo_data[0]) > 0 ? parseInt(ammo_data[0]) : null;
		statCalc[id].stats.ammo_cost	= parseInt(ammo_data[1]) > 0 ? parseInt(ammo_data[1]) : null;
		statCalc[id].stats.regen_cost	= parseInt($(this).find(".stat-regen_cost").html()) > 0 ? parseInt($(this).find(".stat-regen_cost").html()) : null;


		statCalc[id].equipment = {};
		statCalc[id].equipment.bonus = {};


		var weapon_table = $(document).find(".weapontable");
		statCalc[id].weapon = {};
		statCalc[id].weapon.bonus = {};
		statCalc[id].weapon.rarity = 0;
		statCalc[id].weapon.table_id = 'weapontable-'+id;
		weapon_table.attr('id',statCalc[id].weapon.table_id);

		statCalc[id].weapon.attack_min	= !isNaN(parseInt(weapon_table.attr('data-attack-val1'))) ? parseInt(weapon_table.attr('data-attack-val1')) : 0;
		statCalc[id].weapon.attack_max	= !isNaN(parseInt(weapon_table.attr('data-attack-val100'))) ? parseInt(weapon_table.attr('data-attack-val100')) : 0;
		statCalc[id].weapon.hp_min		= !isNaN(parseInt(weapon_table.attr('data-hp-val1'))) ? parseInt(weapon_table.attr('data-hp-val1')) : 0;
		statCalc[id].weapon.hp_max		= !isNaN(parseInt(weapon_table.attr('data-hp-val100'))) ? parseInt(weapon_table.attr('data-hp-val100')) : 0;
		statCalc[id].weapon.healing_min	= !isNaN(parseInt(weapon_table.attr('data-healing-val1'))) ? parseInt(weapon_table.attr('data-healing-val1')) : 0;
		statCalc[id].weapon.healing_max	= !isNaN(parseInt(weapon_table.attr('data-healing-val100'))) ? parseInt(weapon_table.attr('data-healing-val100')) : 0;


		var gear_table = $(document).find(".geartable");
		statCalc[id].gear = {};
		statCalc[id].gear.stats = {};
		statCalc[id].gear.bonus = {};
		statCalc[id].gear.rarity = 0;
		statCalc[id].gear.table_id = 'geartable-'+id;
		gear_table.attr('id',statCalc[id].gear.table_id);
		
		if (gear_table.length)
		{
			statCalc[id].gear.stats[stats_list_map[gear_table.attr('data-stat-t1')]] = !isNaN(parseInt(gear_table.attr('data-stat-t1-value'))) ? parseInt(gear_table.attr('data-stat-t1-value')) : 0;
		}


		statCalc[id].affection = {};
		statCalc[id].affection.bonus = {};
		
		//stats[$(this).attr('id')] = JSON.parse($(this).attr('stat-data'));
		if (!hasNull(statCalc[id].stats)) 
		{
			// Estimate raw numbers
			if (reverse_ingame_stats && ($(this).attr('data-source') == 'ingame'))
			{ 
				console.log('StatCalc - Data source is set to ingame, calculator will attempt to estimate RAW values'); 
				fixedStats = calcReverseStat(level_cap,statCalc[id].stats.rarity,'attack',statCalc[id].stats.attack_min,statCalc[id].stats.attack_max);
				statCalc[id].stats.attack_min = fixedStats[0];
				statCalc[id].stats.attack_max = fixedStats[1];

				fixedStats = calcReverseStat(level_cap,statCalc[id].stats.rarity,'defense',statCalc[id].stats.defense_min,statCalc[id].stats.defense_max);
				statCalc[id].stats.defense_min = fixedStats[0];
				statCalc[id].stats.defense_max = fixedStats[1];

				fixedStats = calcReverseStat(level_cap,statCalc[id].stats.rarity,'hp',statCalc[id].stats.hp_min,statCalc[id].stats.hp_max);
				statCalc[id].stats.hp_min = fixedStats[0];
				statCalc[id].stats.hp_max = fixedStats[1];

				fixedStats = calcReverseStat(level_cap,statCalc[id].stats.rarity,'healing',statCalc[id].stats.healing_min,statCalc[id].stats.healing_max);
				statCalc[id].stats.healing_min = fixedStats[0];
				statCalc[id].stats.healing_max = fixedStats[1];
			}
			
			// Character rarity
			var img_regex = /<img[^>]+>/;
			var raritySelector = $(this).find(".stattable-rarity-selector");
			raritySelector.html(repeat(img_regex.exec($(".stattable-rarity-selector").find(".star-character").html())[0], 5)+" "+repeat(img_regex.exec($(".stattable-rarity-selector").find(".star-weapon").html())[0], max_tier[0]));		
			raritySelector.find("img").each(function(index){$(this).attr('data-rarity',index+1)});

			// Level
			$(this).find(".stattable-controls td").append('<div><span class="stattable-level-selector">Level: <input class="stattable-level" type="number" value="'+level_cap+'" step="1" min="1" max="100" /></span></div>'); 

			// Equipment
			var equipmentTable = $('.character-equipment');
			var equipmentControlsHTML = '';
			for (var index = 1; index <= 4; index++) {
				if (index <= 3) statCalc[id].equipment[index] = {'type': equipmentTable.find(".equipment-"+index).attr('data-value'), 'image': equipmentTable.find(".equipment-"+index).find("a").html()};
				else statCalc[id].equipment[index] = {'type': 'gear', 'image': gear_table.find(".geartable-summary").find("a").html(), 'title': "Unique gear"};
				
				var itemTiersHTML = '';
				for (var tier = 1; tier <= max_tier[index]; tier++){ itemTiersHTML += '<option value="'+tier+'"'+ (tier == max_tier[index]?' selected':'') +'>T'+tier+'</option>'; }

				equipmentControlsHTML += '<div class="equipment-item equipment-'+index+'" data-type="'+statCalc[id].equipment[index].type+'" data-slot="'+index+'" '+ ((statCalc[id].equipment[index].title !== undefined)?'title="'+statCalc[id].equipment[index].title+'"':'') +'>' + statCalc[id].equipment[index].image + '<span class="stattable-equipment-tier-selector"><select class="stattable-tier">'+itemTiersHTML+'</select></span>' + '</div>'; 

			}

			$(this).find(".stattable-controls td>div").append('<span class="stattable-equipment-selector">'+equipmentControlsHTML+'</span>');


			$(this).find(".stattable-controls").css( "display", "" );	

			levelChange($(this));
			equipmentChange($(this));
			rarityChange($(this), statCalc[id].stats.rarity);
			affectionGet($(this));
			statTableRecalc($(this));

		}
		else
		{ console.log('StatCalc - init cancelled due to incomplete data'); }

	});
}
	

function levelChange (statTable){
	//console.log('changing LEVEL in table '+statTable.attr('id'));
	
	var level = !isNaN(parseInt(statTable.find(".stattable-level").val())) ? parseInt(statTable.find(".stattable-level").val()) : 1 ;
	
	if (level < 1) 	 { statTable.find(".stattable-level").val(1);	level = 1; }
	if (level > 100) { statTable.find(".stattable-level").val(100); level = 100; }
	
	statCalc[statTable.attr('id')].stats.level = level;
}	


function equipmentChange (statTable, toggleSlot){
	toggleSlot = (typeof toggleSlot !== 'undefined') ? toggleSlot : false //default false, ES5 does not support function defaults
	//console.log('changing equipment in table '+statTable.attr('id'));
	//console.log(toggleSlot);
	if (toggleSlot) {
		var item_slot = statTable.find(".equipment-"+toggleSlot);
		(item_slot.hasClass("inactive")) ? item_slot.addClass('active').removeClass('inactive') : item_slot.addClass('inactive').removeClass('active');
	}


	stats_list.forEach(function (element){
		statCalc[statTable.attr('id')].equipment.bonus[element] = 0;
		statCalc[statTable.attr('id')].equipment.bonus[element+'%'] = 0;
		statCalc[statTable.attr('id')].gear.bonus[element] = 0;
		statCalc[statTable.attr('id')].gear.bonus[element+'%'] = 0;
	});


	for (var index = 1; index <= 3; index++) {
		if (!statTable.find(".stattable-equipment-selector .equipment-"+index+"").hasClass("inactive"))
		{
			var eq_type = statTable.find(".stattable-equipment-selector .equipment-"+index+"").attr('data-type');
			var eq_tier = statTable.find(".stattable-equipment-selector .equipment-"+index+" select").val();
			//console.log('Using equipment type ' + eq_type + ' at T' + eq_tier + ' in slot ' + index );

			stats_list.forEach(function (element){
				statCalc[statTable.attr('id')].equipment.bonus[element] += ((typeof equipment_stats[eq_type][element] !== 'undefined' && typeof equipment_stats[eq_type][element][eq_tier] !== 'undefined')?equipment_stats[eq_type][element][eq_tier]:0);
				statCalc[statTable.attr('id')].equipment.bonus[element+'%'] += ((typeof equipment_stats[eq_type][element+'%'] !== 'undefined' && typeof equipment_stats[eq_type][element+'%'][eq_tier] !== 'undefined')?equipment_stats[eq_type][element+'%'][eq_tier]:0);
			});
		}
	};

	if (!statTable.find(".stattable-equipment-selector .equipment-4").hasClass("inactive"))
		{
			stats_list.forEach(function (element){
				statCalc[statTable.attr('id')].gear.bonus[element] += ((typeof statCalc[statTable.attr('id')].gear.stats[element] !== 'undefined')?statCalc[statTable.attr('id')].gear.stats[element]:0);
				statCalc[statTable.attr('id')].gear.bonus[element+'%'] += ((typeof statCalc[statTable.attr('id')].gear.stats[element+'%'] !== 'undefined')?statCalc[statTable.attr('id')].gear.stats[element+'%']:0);
			});
		}
}	


function rarityChange (statTable, rarity){
	//console.log('changing RARITY in table '+statTable.attr('id')+' to '+rarity);
	var id = statTable.attr('id');
	
	statCalc[id].stats.rarity = (rarity > 5) ? 5 : rarity;
	statCalc[id].weapon.rarity = (rarity > 5) ? rarity-5 : 0;

	statCalc[id].weapon.bonus.attack = statCalc[id].weapon.rarity>0 ? calcWeaponStat( weapon_level_preset[statCalc[id].weapon.rarity], statCalc[id].weapon.attack_min, statCalc[id].weapon.attack_max ) : 0;
	statCalc[id].weapon.bonus.hp = statCalc[id].weapon.rarity>0 ? calcWeaponStat( weapon_level_preset[statCalc[id].weapon.rarity], statCalc[id].weapon.hp_min, statCalc[id].weapon.hp_max ) : 0;
	statCalc[id].weapon.bonus.healing = statCalc[id].weapon.rarity>0 ? calcWeaponStat( weapon_level_preset[statCalc[id].weapon.rarity], statCalc[id].weapon.healing_min, statCalc[id].weapon.healing_max ) : 0;
	
	statTable.find(".stattable-rarity-selector").children().each(function(){ 
		($(this).attr('data-rarity') <= rarity) ? $(this).addClass('active').removeClass('inactive') : $(this).addClass('inactive').removeClass('active');
	});
}


function affectionGet(statTable){
	//console.log('changing Affection bonus in table '+statTable.attr('id'));
	stats_list.forEach(function (element){
		statCalc[statTable.attr('id')].affection.bonus[element] = 0;
		statCalc[statTable.attr('id')].affection.bonus[element+'%'] = 0;
	});

	if (typeof affection_data !== 'undefined') for (affectionTable in affection_data) {
		Object.keys(affection_data[affectionTable].current).forEach(function (statName){
			statCalc[statTable.attr('id')].affection.bonus[statName.toLowerCase()] += affection_data[affectionTable].current[statName];
		});
	};
}


function statTableRecalc(statTable){
	//console.log(id+' recalc called');
	var id = statTable.attr('id');

	statTable.find(".stat-attack").html(totalStat(	statCalc[id].stats.level, statCalc[id].stats.rarity, 'attack', 	statCalc[id].stats.attack_min, statCalc[id].stats.attack_max, statCalc[id].equipment.bonus['attack%'], statCalc[id].equipment.bonus['attack'] + statCalc[id].weapon.bonus.attack + statCalc[id].affection.bonus.attack ));
	statTable.find(".stat-defense").html(totalStat(	statCalc[id].stats.level, statCalc[id].stats.rarity, 'defense', 	statCalc[id].stats.defense_min, statCalc[id].stats.defense_max, statCalc[id].equipment.bonus['defense%'], statCalc[id].equipment.bonus['defense'] + statCalc[id].affection.bonus.defense));
	statTable.find(".stat-hp").html(totalStat(		statCalc[id].stats.level, statCalc[id].stats.rarity, 'hp', 		statCalc[id].stats.hp_min, statCalc[id].stats.hp_max, statCalc[id].equipment.bonus['hp%'], statCalc[id].equipment.bonus['hp'] + statCalc[id].weapon.bonus.hp + statCalc[id].affection.bonus.hp ));
	statTable.find(".stat-healing").html(totalStat(	statCalc[id].stats.level, statCalc[id].stats.rarity, 'healing', 	statCalc[id].stats.healing_min, statCalc[id].stats.healing_max, statCalc[id].equipment.bonus['healing%'], statCalc[id].equipment.bonus['healing'] + statCalc[id].weapon.bonus.healing + statCalc[id].affection.bonus.healing ));


	['crit_damage', 'crit_rate', 'accuracy', 'evasion', 'cc_str', 'cc_res', 'crit_res', 'critdamage_res', 'healing_inc', 'attack_speed'].forEach(function (statName){
		statTable.find(".stat-"+statName).html(
			addBonus( statCalc[id].stats[statName], 
				statCalc[id].equipment.bonus[statName+'%'] + statCalc[id].gear.bonus[statName+'%'], 
				statCalc[id].equipment.bonus[statName] + statCalc[id].gear.bonus[statName] )
		);
	});


	//secondary values
	statCalc[id].stats.damage_floor = statCalc[id].stats.stability * 10000 / (statCalc[id].stats.stability + 1000) + 2000;
	statCalc[id].stats.one_cost_time = 10000 / statCalc[id].stats.regen_cost


	statTable.find(".stattable-stats td").each(function () {
		$(this).attr("title", statTooltip(id, $(this).attr('class').substring(5)));
	})
}


function statTooltip(id, statName){
	var tooltip = '';
	
	tooltip += (typeof statCalc[id].stats[statName+'_min'] !== 'undefined' && statCalc[id].stats[statName+'_min'] > 0) ? 'Base: ' + calcStat(statCalc[id].stats.level, statCalc[id].stats.rarity, statName, statCalc[id].stats[statName+'_min'], statCalc[id].stats[statName+'_max']) : '';
	tooltip += (typeof statCalc[id].stats[statName] !== 'undefined' && statCalc[id].stats[statName] > 0) ? 'Base: ' + statCalc[id].stats[statName] : '';
	tooltip += (typeof statCalc[id].equipment.bonus[statName] !== 'undefined' && statCalc[id].equipment.bonus[statName] > 0) ? '\r\nEquipment: ' + statCalc[id].equipment.bonus[statName] : '';
	tooltip += (typeof statCalc[id].gear.bonus[statName] !== 'undefined' && statCalc[id].gear.bonus[statName] > 0) ? '\r\nGear: ' + statCalc[id].gear.bonus[statName] : '';
	tooltip += (typeof statCalc[id].weapon.bonus[statName] !== 'undefined' && statCalc[id].weapon.bonus[statName] > 0) ? '\r\nWeapon: ' + statCalc[id].weapon.bonus[statName] : '';
	tooltip += (typeof statCalc[id].affection.bonus[statName] !== 'undefined' && statCalc[id].affection.bonus[statName] > 0) ? '\r\nAffection: ' + statCalc[id].affection.bonus[statName] : '';

	if (stats_list.indexOf(statName) < 4)
		tooltip += (statCalc[id].equipment.bonus[statName+'%'] > 0) ? '\r\nEquipment: ' + statCalc[id].equipment.bonus[statName+'%']+'%'
		+ ' ('+ (parseInt(totalStat(statCalc[id].stats.level, statCalc[id].stats.rarity, statName, statCalc[id].stats[statName+'_min'], statCalc[id].stats[statName+'_max'], statCalc[id].equipment.bonus[statName+'%'], statCalc[id].equipment.bonus[statName] + statCalc[id].weapon.bonus[statName]))-parseInt(totalStat(statCalc[id].stats.level, statCalc[id].stats.rarity, statName, statCalc[id].stats[statName+'_min'], statCalc[id].stats[statName+'_max'], 0, statCalc[id].equipment.bonus[statName] + statCalc[id].weapon.bonus[statName]))) +')' : '';
	else 
		tooltip += (statCalc[id].equipment.bonus[statName+'%'] > 0) ? '\r\nEquipment: ' + statCalc[id].equipment.bonus[statName+'%']+'%'
		+ ' ('+ (addBonus( statCalc[id].stats[statName], statCalc[id].equipment.bonus[statName+'%'], 0 )) +')' : '';

	if (statName == 'stability') tooltip += '\r\n——————————\r\nDamage floor: ' + (statCalc[id].stats.damage_floor / 100).toFixed(2) + '%';
	if (statName == 'regen_cost') tooltip += '\r\n——————————\r\nSeconds per 1 cost: ' + (statCalc[id].stats.one_cost_time).toFixed(2);
	if (statName == 'ammo') tooltip += 'Magazine size: ' + statCalc[id].stats.ammo_count + '\r\n' + ((statCalc[id].stats.ammo_cost>1)?'Ammo per burst: ':'Ammo per attack: ') + statCalc[id].stats.ammo_cost;

	return tooltip;
}


function totalStat(level,rarity,statName,val1,val100,bonus_percent,bonus_flat){
	//console.log (statName + ': Using flat bonus ' + bonus_flat);
	//console.log (statName + ': Using % bonus ' + bonus_percent);

	var stat_value = calcStat(level,rarity,statName,val1,val100);
	stat_value = (stat_value+bonus_flat)*(1 + bonus_percent/100);

	return Math.ceil(stat_value);
}


function addBonus(stat_value,bonus_percent,bonus_flat){
	return Math.ceil((stat_value+bonus_flat)*(1 + bonus_percent/100));
}
	
	
function calcStat(level,rarity,statName,val1,val100){
	//return Math.ceil( (val1 + (val100 - val1) * (level - 1) / 99) * (10000 + rarity_bonus[statName][rarity]) / 10000 );
	return Math.ceil( Math.round(val1 + (val100 - val1) * (Math.round((level - 1) / 99 * 10000) / 10000)) * (10000 + rarity_bonus[statName][rarity]) / 10000 );
}
	
	
function calcReverseStat(startingLevel,startingRarity,statName,val1,val100){
	var rawVal1 = val1 / (10000 + rarity_bonus[statName][startingRarity]) * 10000;
	var rawVal100 = (val100 / (10000 + rarity_bonus[statName][startingRarity]) * 10000 - rawVal1) / (startingLevel - 1) * 99 + rawVal1;
	
	return [Math.floor(rawVal1), Math.floor(rawVal100)];
}


function calcWeaponStat(level,val1,val100){
	return Math.ceil(val1 + (val100 - val1) * Math.round((level - 1) / 99 * 10000) / 10000);
}
	
	
function hasNull(target) {
    for (var member in target) {
        if (target[member] == null)
            return true;
    }
    return false;
}


function repeat(string, count) {
    return new Array(count + 1).join(string);
}
/* Character stat calc - end */	