/**
 * Modale - funcionalidad común
 * asume que solo hay un único elemento contenedor con clase "modale"
 */

var Modale = {};

Modale.loadMain = function(content){
	$('.modale > .main > .content').html(content);
};

Modale.loadFooter = function(content){
	$('.modale > .footer > .content').html(content);
};

Modale.loadTitle = function(content){
	$('.modale > .header > .title').html(content);
};


Modale.open = function(callback){	
	callback = callback || function() {};
	// preservar overflow actual	
	Modale.bodyOverflow = $('body').css('overflow');
	$('body').css({overflow: 'hidden'});
	$('.modale').show();
	$('.modale').before('<div class="overlay remove"></div>');
	callback();
};

Modale.close = function(callback){
	callback = callback || function() {};
	$('body').css({overflow: Modale.bodyOverflow});
	$('.overlay.remove').remove();
	$('.modale').hide();
	callback();
};

// click close-modale
$(document).on('click','.close-modale',function(e){
	e.preventDefault();	
	Modale.close();
});

// click open-modale
$(document).on('click','.open-modale',function(e){
	e.preventDefault();	
	Modale.open();
});

