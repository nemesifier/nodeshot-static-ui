/*
 * this is just a temporary file for very basic features
 * will be converted to a more structured set of files with backbone.js
*/

$('#ns-top-nav-links > ul > li > a').click(function(e){
	e.preventDefault();
	$('#ns-top-nav-links li.active').removeClass('active');
	$(this).parents('li').eq(0).addClass('active');
});

// truncate long usernames
var $username = $('#username-js');
if($username.text().length > 15){
	var truncated = $username.text().substr(0, 13) + "&hellip;";
	$username.html(truncated);
}

// set max height of collapsible menu (mobile)
var setCollapsibleMainMenuMaxHeight = function(){
	$('#nav-bar .navbar-collapse').css('max-height', $(window).height()-50);
}

// dynamic map dimensions
var setMapDimensions = function(){
	var height = $(window).height() - $('body > header').height();
	$('#map-container, #map-toolbar').height(height);
	
	var width = $(window).width() - $('#map-toolbar').width();
	$('#map').width(width);
}

// close loading
$('#loading .icon-close').click(function(e){
	$(this).parent().fadeOut(255);
});

// init tooltip
$('#map-toolbar a').tooltip();

// disable map stuff
$('#map-legend a').click(function(e){
	e.preventDefault();
	
	var li = $(this).parent();
	
	if (li.hasClass('disabled')) {
		li.removeClass('disabled');
	}
	else{
		li.addClass('disabled');
	}
	
});

$('#btn-legend, #map-legend .icon-close').click(function(e){
	var legend = $('#map-legend'),
		button = $('#btn-legend');
	
	legend.fadeToggle(250, function(){
		if(legend.is(':visible')){
			button.addClass('disabled');
		}
		else{
			button.removeClass('disabled');
		}
	});
});

// automatically center modal depending on its width
$('.modal.autocenter').on('show.bs.modal', function(e) {
    var dialog = $(this).find('.modal-dialog'),
        dialog_dimensions = dialog.getHiddenDimensions();
    
    dialog.css({
        width: dialog_dimensions.width,
        right: 0
    });
    
    // vertically align to center
    dialog.css('top', $(window).height()/2.1 - dialog_dimensions.height);
})

// get width of an hidden element
$.fn.getHiddenDimensions = function(){
    var self = $(this);
    if(self.is(':visible')){
        throw('element is not hidden')
    }
    
    var hidden = self,  // this element is hidden
        parents = self.parents(':hidden');  // look for hidden parent elements
        
    // if any hidden parent element
    if(parents.length){
        // add to hidden collection
        hidden = $().add(parents).add(hidden);
    }
    
    /*
     trick all the hidden elements in a way that
     they wont be shown but we'll be able to calculate their width
    */
    hidden.css({
        position: 'absolute',
        visibility: 'hidden',
        display: 'block'
    });
    
    // store width of current element
    var dimensions = {
        width: self.outerWidth(),
        height: self.outerHeight()
    }
    
    // reset hacked css on hidden elements
    hidden.css({
        position: '',
        visibility: '',
        display: ''
    });
    
    // return width
    return dimensions;
}

clearPreloader = function(){
    $('#preloader').fadeOut(255, function(){
        $('body').removeAttr('style');
    });
}

// map
$(window).resize(function(e){
	setCollapsibleMainMenuMaxHeight();
	setMapDimensions();
}).load(function(e){
	setCollapsibleMainMenuMaxHeight();
	setMapDimensions();
	
	if($('#map').length){
        var map = L.mapbox.map('map-js', 'examples.map-9ijuk24y').setView([42.12, 12.45], 9);
    }
    
    clearPreloader();
});