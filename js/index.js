$(function(){

	// contador de quotes mostradas
	var count = 0;
	// para poder configurar velocidad de reproducción auto
	var speed = 12000;
	
	// font, backgrounds y  rotate aleatorios	
	var font, rotate, remove, add = {cita:'',autor:''}
		, lastRotate = {cita:'', autor:''}
		, cita = $('.cita'), autor = $('.autor')
		, fonts = ['font-montserrat','font-open-sans'
		//,'font-roboto-slab'
			,'font-gloria-hallelujah', 'font-philosopher'
			, 'font-gochi-hand', 'font-berkshire-swash'	]
		, rotates = ['rotate-0', 'rotate-left', 'rotate-right']
		, backgrounds = ['bg-blue', 'bg-black', 'bg-red', 'bg-grey', 'bg-green'
			, 'bg-orange',  'bg-yellow'];	
		
	// random
	var random = function(min, max) {	
		// min incluido, max excluido
		var rand = Math.random() * (max - min) + min;
		rand = Math.floor(rand);
		return rand;
	};	
	
	/*
	 * encuentra en "classes" una clase que "obj" no tenga asignada actualmente.
	 * @return {string}
	 */
	var randomClass = function($obj, classes){
		var cc = [], elm;
		for(var i=0;i<classes.length;i++) {
			if ($obj.hasClass(classes[i])) {
			} else {
				cc.push(classes[i]);
			}
		}
		// devolver una diferente de la actual
		elm = cc[random(0,cc.length)];
		return elm;
	};
	
	/*
	 * clases de elm que configuran la representación del elm
	 * @param {jQuery} $obj
	 * @param {boolean} newSet
	 * @return {obj} con clases encontradas
	 */
	var elementClasses = function($elm, newSet) {		
		// si viene next	calcula nuevo set 
		if (newSet===true) {
			return {
				rotate: randomClass($elm, rotates)
				, font: randomClass($elm, fonts)
				, background: randomClass($elm, backgrounds)		
				}
		}	
		// extraer los actuales
		var elm = $elm[0];
		var data = {font:'',background:'',rotate:''}
		for(var i=0; i<elm.classList.length; i++) {
			if (elm.classList[i].substr(0,5)==='font-') {
				data.font = elm.classList[i];
			}
			if (elm.classList[i].substr(0,3)==='bg-') {
				data.background = elm.classList[i];
			}
			if (elm.classList[i].substr(0,7)==='rotate-') {
				data.rotate = elm.classList[i];
			}
		}
		return data;
	};

	// refresh	
	var refresh = function(){	
		// ini
		var $cita = $('.cita');
		var $autor = $('.autor');	
		var Cita = {old: elementClasses($cita),	new: elementClasses($cita,true)};
		var Autor = {old: elementClasses($autor), new: elementClasses($autor,true)};
		
		// prevenir cita y autor mismo fondo + font
		if (Cita.new.background===Autor.new.background) {
			Cita.new.background = Autor.old.background;
		}
		if (Cita.new.font===Autor.new.font) {
			Cita.new.font = Autor.old.font;
		}
		
		// efecto rotar y desaparecer...
		$cita.addClass('opacity-0').removeClass('opacity-1');		
		$autor.addClass('opacity-0').removeClass('opacity-1');
	
		// leer nueva cita
		setTimeout(function(){
		
			// mostrar tooltip
			count++;
			var step = count % 10;
			if (step===0) { // mostrar cada 10 frases
				$('.tooltip').addClass('show');
			}
			if (step > 0) { // ocultar tras 2
				$('.tooltip').removeClass('show');
			}
		
			// leer quote
			Request.send('http://quotes.zentric.es/colorquote',{},function(response){
				cita.html(response.quote.trim());
				autor.html(response.origen.trim());					
				$cita.addClass('opacity-1').removeClass('opacity-0');		
				$autor.addClass('opacity-1').removeClass('opacity-0');
				$autor.removeClass(Autor.old.font).addClass(Autor.new.font);
				$autor.removeClass(Autor.old.rotate).addClass(Autor.new.rotate);
				$autor.removeClass(Autor.old.background).addClass(Autor.new.background);
				$cita.removeClass(Cita.old.font).addClass(Cita.new.font);
				$cita.removeClass(Cita.old.rotate).addClass(Cita.new.rotate);
				$cita.removeClass(Cita.old.background).addClass(Cita.new.background);
			});
		}, 1000);
		
	};

	// click ABOUT
	$(document).on('click','.open-modale',function(e){
		Modale.open(function(){
			$('.open-modale').hide();
		});
	});
	
	// click sobre cita actual para refresh
	$(document).on('click','blockquote',function(e){
		clearInterval(auto);
		auto = setInterval(function(){refresh();}, speed);
		refresh();
	});
	
	// autoavance, por si no hace click
	var auto = setInterval(function(){refresh();}, speed);
	
	// primer refresh
	refresh();

});