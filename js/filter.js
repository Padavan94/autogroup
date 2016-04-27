var data = {
	year: {
		title: "Год автомобиля",
		items: ["1994","1995","1996","1997","1995","1996","1997","1995","1996","1997","1995","1996","1997","1995","1996","1997","1995","1996","1997"]
	},
	manufacturer: {
		title: "Марка автомобиля",
		items: ["mazda","BMW","toyota","honda"]
	},
	manufacturer123: {
		title: "Марка автомобиля",
		items: ["mazda","BMW","toyota","honda"]
	},
	model: {
		title: "Модель автомобиля",
		items: [
			{
				"mazda": ["626","miata","rx7"]
			},
			{
				"BMW": ["m5","5x","6x"]
			},
			{
				"toyota": ["corola","carina"]
			},
			{
				"honda": ["civic","acord"]
			}
		]
	},
	year2: {
		title: "Год автомобиля",
		text: "Выберите год автомобиля",
		items: ["1994","1995","1996","1997","1995","1996","1997","1995","1996","1997","1995","1996","1997","1995","1996","1997","1995","1996","1997"]
	},
	manufacturer3: {
		title: "Марка автомобиля",
		text: "Выберите марку автомобиля",
		items: ["mazda","BMW","toyota","honda"]
	},
};




/**
 * @return {object with public API}
 */

var filter = function(obj){
	var stepsWrap = $(".filter__steps__inner");
	var content = $(".filter__content");
	var tileWrap = $(".filter__tile-wrap");
	var tile = $(".filter__tile");

	var result = {};
	var defaults = {
		count: 1,
	}
	return {

		createNav: function(count, obj){
			var i = 1;
			for(var key in obj) {
				stepsWrap.append(
					'<div class="filter__step" data-id="'+key+'">'+
						'<span class="icon default-bg '+(i===1? "active" : "")+'">'+
							'<i>'+i+'</i>'+
						'</span>'+
					'</div>');
				i++;
			}
		},

		createTile: function(){
			var i = 0;
			for (var key in obj) {
				content.append(
					'<div class="filter__inner-wrap '+(i===0? "active" : "")+'" data-target="'+key+'">'+
						'<div class="filter__title">'+
							'<h2>'+obj[key].title+'</h2>'+
						'</div>'+
						'<div class="filter__tile-wrap">'+
							'<div class="filter__tile">'+
								''+this.filterItems(key, obj[key].items)+''+
							'</div>'+
						'</div>'+
					'</div>');
				i++;
			}
			
		},

		renderContent: function(data) {
			$(".filter__inner-wrap, .filter__step span").removeClass('active');
			$(".filter__inner-wrap[data-target="+data+"]").addClass('active');
			$(".filter__step[data-id="+data+"] span").addClass('active');
			$(".filter__inner__model[data-model="+data+"]").addClass('active');
			
		},

		filterItems: function(key,arr) {
			var str = "";
			for(var i = 0; i < arr.length; i++) {
				/*console.log(typeof(arr[i]));*/
				if( typeof(arr[i]) === "string" ) {
					str += '<button parent="" id-target="'+key+'">'+arr[i]+'</button>';
				}
				if ( typeof(arr[i]) === "object" ){
					for(var key in arr[i]) {
						for(var key2 in arr[i][key]) {
							console.log(arr[i][key]);
							str += '<button parent="'+key+'" id-target="'+arr[i][key][key2]+'">'+arr[i][key][key2]+'</button>'
						}
					}
				}
			}

			return str;
		},


		nextStep: function() {
			var that = this;
			$(document).on('click', '.filter__tile button', function(event) {
				$(".filter__tile button").removeClass('active');
				$(this).addClass('active');
				var arr = [], i=0, state = "";
				var current = $(this).attr("id-target");
				var currentParent = $(this).attr("parent");
				var next = "";

				if( currentParent !== "" ) {
					result["model"] = $(this).html();
				} 
				if( currentParent === "" ){
					result[current] = $(this).html();
				}
				

				for (var key in obj) {
					/*console.log(key);*/
					arr[i] = key;
					i++;
				}
				for(var j=0; j<arr.length; j++) {
					if( arr[j] == current) {
						if( j > -1 ) {
							$(".filter__content .getBack").addClass('active');
							console.log(current)
						}
						if( j === 2 ) {
							$(".filter__link, .filter__content .getNext").addClass('active');
						}
						next = (arr[j+1]);
						console.log(next);
						that.renderContent(next);
					}
				}
				event.preventDefault();

				console.log(i);
				console.log(that.get.result());
			});
		},
		get: {
			length: function() {
				var size = 0;
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) size++;
				}
				return size;
			},
			currentStep: function() {
				return current;
			},
			result: function() {
				return result;

			}
		},



		init: function() {
			if(obj === undefined) {
				this.createNav(defaults.count);
			} else {
				this.createNav(this.get.length(), obj);
				this.createTile();
				this.nextStep();
			}
			
		},
	}
};


var fil = filter(data);
fil.init();
