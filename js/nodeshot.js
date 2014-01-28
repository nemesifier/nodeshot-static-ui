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
	
    var map_toolbar = $('#map-toolbar'),
        width = $(window).width();
    
    // take in consideration map toolbar if visible
    if(map_toolbar.is(':visible')){
        width = width - $('#map-toolbar').width();
    }
	$('#map').width(width);
}

var toggleLoading = function(){
	$('#loading').fadeToggle(255);
}

// close loading
$('#loading .icon-close').click(function(e){
	toggleLoading();
});

// init tooltip
$('#map-toolbar a, .hastip').tooltip();

$('#map-toolbar a').click(function(e){
	e.preventDefault();
	
	var button = $(this),
		panel_id = button.attr('data-panel'),
		panel = $('#' + panel_id),
		other_panels = $('.side-panel:not(#'+panel_id+')');
	
	// if no panel return here
	if (!panel.length) {
		return;
	}
	
	// hide all other open panels
	other_panels.hide();
	// hide any open tooltip
	$('#map-toolbar .tooltip').hide();
	$('#map-toolbar a').removeClass('active');
	
	if (panel.is(':hidden')) {
		var distance_from_top = button.offset().top - $('body > header').eq(0).outerHeight();
		panel.css('top', distance_from_top);
		panel.show();
		button.addClass('active');
		button.tooltip('disable');
	}
	else{
		panel.hide();
		button.tooltip('enable');
	}
});

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
    new_height = ($(window).height() - dialog_dimensions.height) /2.1
    // ensure new position is greater than zero
    new_height = new_height > 0 ? new_height : 0;
    // set new height
    dialog.css('top', new_height);
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
		// clear overflow hidden except if map view
		if(!$('#map').length) {
			$('body').removeAttr('style');
		}
    });
}

// add node
$('#map-toolbar .icon-pin-add').click(function(e){
    $('#map-legend .icon-close').trigger('click');
    
    var dialog = $('#step1'),
        dialog_dimensions = dialog.getHiddenDimensions();
    
    dialog.css({
        width: dialog_dimensions.width,
        right: 0
    });
    
    // vertically align to center
    //dialog.css('top', $(window).height()/2.1 - dialog_dimensions.height);
    dialog.fadeIn(255);
    
    $('#step1 button').click(function(e){
        $('#step1').hide();
        var dialog = $('#step2'),
        dialog_dimensions = dialog.getHiddenDimensions();
    
        dialog.css({
            width: dialog_dimensions.width,
            right: 0
        });
        
        // vertically align to center
        //dialog.css('top', $(window).height()/2.1 - dialog_dimensions.height);
        dialog.fadeIn(255);
    });
});

// show map toolbar on mobile
$('#toggle-toolbar').click(function(e){
    e.preventDefault();
    $('#map-toolbar').toggle();
    setMapDimensions();
});

// map
$(window).resize(function(e){
	setCollapsibleMainMenuMaxHeight();
	setMapDimensions();
}).load(function(e){
	setCollapsibleMainMenuMaxHeight();
	setMapDimensions();
    
    clearPreloader();
});