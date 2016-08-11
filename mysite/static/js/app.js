$(document).foundation();
var filter_el = function($el,e) {
	if(!!e){
		e.preventDefault();
	}
	$el.addClass('active').siblings('[data-filter]').removeClass('active');
	var el_class = $el.attr('data-filter');
	if (el_class.toLowerCase() === 'none'){
		$('.js-filter').removeClass('invisible');
	} else {
		$('.js-filter').not('.category-'+ el_class).addClass('invisible');
		$('.category-'+ el_class).removeClass('invisible');
	}
	return true
}
$(document).on('click', '[data-filter]', function(e) {
	filter_el($(this),e)
});