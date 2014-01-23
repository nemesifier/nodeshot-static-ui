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

// map
$(window).resize(function(e){
	setCollapsibleMainMenuMaxHeight();
	setMapDimensions();
}).load(function(e){
	setCollapsibleMainMenuMaxHeight();
	setMapDimensions();
	
	var map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([42.12, 12.45], 9);
});