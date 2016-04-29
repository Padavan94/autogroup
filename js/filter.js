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





var filter = function() {

	var result = {};

	$(document).ready(function() {

		var owl = $(".filter__dinamic");

		owl.on('initialized.owl.carousel', function(property){
			for(var i=0; i<property.item.count+1; i++) {
				$(".owl-dot span").eq(i).html(i+"");
			}
			current = property.item.index;
			$(document).on('click', '.filter__tile .button', function(event) {
	    		$(this).parent().parent().find(".button").removeClass('active');
				$(this).addClass('active');
				var key = $(this).attr("data-key");
				owl.trigger('next.owl.carousel');
				var val = $(this).find("h3").html();
		    	result[key] = val;
		    	renderBrad(result);
		    	console.log(result)
	    	});
		});

		owl.owlCarousel({
		    items:1,
		    smartSpeed:450,
		    loop: false,
		    mouseDrag: false,
		    touchDrag: false,
		  	freeDrag: false,  
		  	pullDrag: false,
		  	callbacks: true,
		  	dotsEach: 1,
		  	autoHeight: true,

		})

		$(".getNext").click(function(event) {
			event.preventDefault();
			owl.trigger('next.owl.carousel');
		});
		$(".getBack").click(function(event) {
			event.preventDefault();
			owl.trigger('prev.owl.carousel');
			var cur = $(".filter__bread a:last-child");
			var inner = cur.attr("data-key");
			delete result[inner];
			cur.remove();
			console.log(result);
			
		});


		owl.on('changed.owl.carousel',function(property){
		    current = property.item.index;
		    /*console.log(current);*/
		    var src = $(property.target).find(".owl-item").eq(current).find(".filter__inner-wrap");
		    if(current>1){
		    	$(".filter__link a").removeClass('btn-gray');
		    	$(".filter__link a,.filter__content .getBack, .filter__content .getNext").addClass('btn-success');
		    	$(".filter__content .getBack, .filter__content .getNext").removeClass('btn-gray');
		    	$(".filter__tile .button").unbind('click');
		    	$(document).on('click', '.filter__tile .button', function(event) {
		    		$(this).parent().parent().find(".button").removeClass('active');
					$(this).addClass('active');
					var key = $(this).attr("data-key");
					var val = $(this).find("h3").html();
			    	result[key] = val;
			    	renderBrad(result);
			    	console.log(result);
		    	});
		    } else {
		    	$(".filter__link a, .filter__content .getBack, .filter__content .getNext").removeClass('btn-success');
		    	$(".filter__link a").addClass('btn-gray');
		    }
		    
		});

		function renderBrad(obj){
			html = "";
			size = 0;
			for(var key in obj) {
				html += '<a href="#" data-key="'+key+'" class="btn btn-animated btn-lg btn-danger"><span>'+obj[key]+'</span><i class="fa fa-times"></i></a>'
				size++;
			}
			$(".filter__bread").html(html);
		}

		$(document).on('click', '.filter__bread a', function(event) {
			event.preventDefault();
			var inner = $(this).attr("data-key");
			delete result[inner];
			owl.trigger('prev.owl.carousel');
			console.log(result);
			$(this).remove();
		});
			
		
		
	});

	return {
		result: function() {
			console.log("Вот он здоровенный резалт моей мечты " +result);
			console.log(result)
			return result;	
		}
	}

}();

var fil = filter;