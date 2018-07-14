/*global $, alert, document, window, console */
$(document).ready(function() {
    "use strict";
    //slider-items object
     var slider = {
     	element: function () {
     		this.arrow = $(".slider-arrow button"); 
     		this.slier = $(".item-slider");
     		this.mousedown = false;
     		this.pagex;
     		this.scrollX;
     	},
     	onClick: function (e) {
     		e.preventDefault();
     		var section = $(this).parents("section");
	    	var items = section.find('.item').parent();
	    	var item = items.outerWidth(true);
	    	var sliers = section.find(".item-slider");
	        var scroll = sliers.scrollLeft() + item;
	        if($(this).hasClass("left")) scroll = sliers.scrollLeft() - item;
	        sliers.animate({
	            scrollLeft: scroll
	        });
	    },
	    onDrop: function (e) {
	        var section = $(this).parents("section");
	        var sliers = section.find(".item-slider");
	        if(e.type === 'touchmove') {
	            var pageXnow = e.originalEvent.touches[0].pageX - this.pagex;
	            sliers.scrollLeft(this.scrollX - pageXnow);
	            return;
	        }
	        e.preventDefault();
	        if(this.mousedown === true) {
	            var pageXnow = e.pageX - this.pagex;
	            sliers.scrollLeft(this.scrollX - pageXnow);
	        }
	    },
	    event:  function () {
	    	this.arrow.on("click", this.onClick);
	    	this.slier.on("touchstart mousedown", function (e) {
		    	if(e.target.nodeName === 'A' || e.target.nodeName === 'I') return;
		    	var section = $(this).parents("section");
		    	var sliers = section.find(".item-slider");
		        if(e.type === 'touchstart'){
		            this.pagex = e.originalEvent.touches[0].pageX;
		            this.scrollX = sliers.scrollLeft();
		            return;
		        }
		        e.preventDefault();
		        this.mousedown = true;
		        this.pagex = e.pageX;
		        this.scrollX = sliers.scrollLeft();
	  	  	});
	    	this.slier.on("mouseup", function () {this.mousedown = false});
	    	this.slier.on("mouseleave", function () {this.mousedown = false});
	    	this.slier.on("touchmove mousemove", this.onDrop);

	    },
	    run:function () {
	    	this.element();
	    	this.event();
	    }
     };
     //fire the  object
     slider.run();
    //setting effect on click
    $(".setting-btn").on("click", function (e) {
        e.preventDefault();
        $(this).next('.left-animate').toggleClass("show");
    });
    //esc button to exit moduel in mobile
     $(".esc").on("click", function () {
        $(this).parents(".show").removeClass('show');
    });
     //nav link dropdown 
     $(".dropdown").hover(function() {
     	$(this).find('.dropdown-toggle').click();
     }, function() {
     	$(this).find('.dropdown-toggle').click();
     });
     // nav shop-basket
     $(".shop-basket").on("click", function () {
     	$(".item-basket").slideToggle();
     });
     //carousel bootstrap setteing
     $('.carousel').carousel({
        interval: false
    });
   //item filter
   $(".btn-view").find('button').on("click", function () {
	   	var type = $(this).data("type");
	   	$(this).addClass('active').siblings().removeClass('active');
	   	var allstr = ".item[data-type='" + type + "']";
	   	if(type === 'all') {
	   		allstr = ".item[data-type]";
	   	}
	   	var  item = $(this).parents(".row-setting").next(".row").find(allstr);
	   	$(item).parent().siblings().fadeOut(0).end().fadeIn("slow");
   });
   //star effect on click
   $(".star").on("click", function (e) {
   		e.preventDefault();
   		$(this).siblings(".star").removeClass('active').end()
   			   .addClass("active").prevAll(".star").addClass("active");
   });
   //brand slider
   function brandslider(ele,option)
   {
   	   if(typeof option == "undefined") {
   	   	option = {
   				time:5000,
   				loop:true
   			};
   		}
   		this.$loop = option.loop;
   		this.$this = ele;
   		this.time = option.time;
   }
   brandslider.prototype.rest = function () {
   		$(".brand-slider").css({
			"margin-left":"0px"
	   	});
	   	$(".brand-slider").eq(0).animate({
	   		"margin-left": "-" + $(".brand-slider").outerWidth(true) + "px"
	   },500);
   }
   brandslider.prototype.run = function () {
   		$(".brand-slider").eq(0).appendTo($($(".brand-slider").parent()));
	   	this.rest();
   };
    brandslider.prototype.init = function () {
    	if(!this.$loop) return;
	   	this.rest();
    	setInterval(this.run.bind(this),this.time);
    }
	   
	$.prototype.brandslider = function (option) {
		var _this = this;
		new brandslider(_this,option).init();
	};
	$(".brand-slider").brandslider();
	//list color
	$(".btn-color").on("click", function () {
		var getClass = $(this).data("class");
		$("body").removeClass();
		$("body").addClass(getClass);
	});
	$(".color-icon").on("click", function () {
		$(".color-model").toggleClass('hidden');
	});
	//preload
     $(window).load(function () {
	    $(".preload").delay(1000).fadeOut(500);
	 });
});