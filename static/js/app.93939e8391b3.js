(function() {
	window.GLOBALS.listener = '';
	var callbacks = {
		openThankYou: function(data, $loader) {
			if (GLOBALS.debug){
				console.log(data, $loader);
			}
			if (!!data.stored) {
				$loader.hideLoader();
				$('#contact-thank-you').foundation('open');
				$('#mailform').foundation('resetForm');
			} else {
				$loader.hideLoader();
				for (var idx in data.form_errors) {
					if($('[name=' + idx + ']').length){
						$('#mailform').foundation('addErrorClasses', $('[name=' + idx + ']'));
					} else {
						$('#mailform').foundation('addErrorClasses', $('[name^=' + idx + ']').not(':hidden'));
					}
				}
			}
		},
	};

	function Loaders(path) {
		var src = '<img src="' + django._static(path) + '"/>';
		return {
			normal: '<div class="loader">' + src + '</div>',
			fixed: '<div class="loader-fixed">' + src + '</div>',
		};
	}
	var loader = Loaders('img/loader.svg');

	var showLoader = function(_where_to, $this) {
		if (typeof _where_to === typeof undefined || _where_to === 'inside element') {
			$this.css('position', 'relative').append(loader.normal);
			return $this;
		} else {
			$('body').append(loader.fixed);
			$('html').addClass('scroll-lock');
			return $('body');
		}
	};

	var hideLoader = function($this) {
		if (typeof $this === typeof undefined || !$this) {
			$('.loader, .loader-fixed').remove();
			$('html').removeClass('scroll-lock');
			return $('body');
		} else {
			$this.find('.loader').remove();
			return $this;
		}
	};

	$.fn.showLoader = function(_where_to) {
		return showLoader(_where_to, this);
	};

	$.fn.hideLoader = function(which) {
		if (which === 'everything') {
			return hideLoader(false);
		} else {
			return hideLoader(this);
		}
	};


	$.fn.form2JSON = function() {
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};

	$.fn.attr_safe = function(attribute) {
		console.log(this);
		return (typeof this.attr(attribute) !== typeof undefined || !this.attr(attribute)) ? this.attr(attribute) : 'undefined';
	};

	$.fn.form2Ajax = function($target, $loader, usejson, doneCallBack) {
		var data = {
			'empty': 0
		};
		var $form = this.is('form') ? this : this.parents('form'),
			path = $form.attr('action'),
			_data = (typeof usejson !== typeof undefined && usejson) ? $form.serialize() : JSON.stringify($form.form2JSON()),
			_method = typeof $form.attr('method') !== typeof undefined && $form.attr('method') ? $form.attr('method') : 'POST';
		$.ajax({
			cache: GLOBALS.ajaxCache,
			method: _method,
			url: path,
			data: _data,
			beforeSend: function() {
				if (typeof $loader !== typeof undefined && $loader) {
					$loader.showLoader('inside element');
				}
			}
		}).done(function(data) {
			if (typeof $target !== typeof undefined && $target) {
				$target.html(data);
			}
			if (typeof doneCallBack !== typeof undefined) {
				doneCallBack(data, $loader, $target, usejson);
			}

		});
		return data || this;
	};
	var filter_el = function($el, e) {
		if (typeof e !== typeof undefined) {
			e.preventDefault();
		}
		$el.addClass('active').siblings('[data-filter], [data-filter-sub]').removeClass('active');
		var category = $el.attr_safe('data-filter');
		var subcategory = $el.attr_safe('data-filter-sub');
		var el_class = '.category-' + category;
		var el_class_sub = '.subcategory-' + subcategory;

		// '.subcategory-' + el_class_sub
		if (typeof category !== typeof undefined && category.toLowerCase() === 'none') {
			$('.js-filter').removeAttr('style');
		} else {
			$('.js-filter').not(el_class + ', ' + el_class_sub).css({
				'opacity': 0.3,
			});
			$(el_class + ', ' + el_class_sub).removeAttr('style');
		}
		return true;
	};
	var refreshCaptcha = function($this){
	    $form = $this.parents('form');
	    $.getJSON(GLOBALS.captcha, {}, function(json) {
	        console.log(json);
	    });
	    return false;
	};
	$(document)
		.on('click', '[data-filter], [data-filter-sub]', function(e) {
			filter_el($(this), e);
		})
		.on('click', '.captcha', function(){
			refreshCaptcha($(this));
		})
		.on('click', '[data-reveal-ajax]', function() {
			var reveal_id = $(this).attr('data-open'),
			$modal = $('#' + reveal_id).find('.modal-content'),
			reveal_content_url = $(this).attr('data-reveal-ajax');
			$.ajax(reveal_content_url)
				.done(function(resp) {
					$modal.html(resp).foundation('open');
				});
		})
		.on('submit', '.js-ajaxform', function(e) {
			e.preventDefault();
			var $t = $(this);
			$(this).form2Ajax(false, $t.parents('.modal-content'), 'usejson', callbacks[$t.attr('data-callback')]);
		})
		.on('keypress', function(e) {
			window.GLOBALS.listener += String.fromCharCode(e.which);
			console.log(window.GLOBALS.listener);
			if (window.GLOBALS.listener === 'italuccio') {
				$('#00-eegg').removeClass('hide');
			}
		});
	$(function() { // ON DOCUMENT READY
		$(document).foundation();
		hideLoader();
	});
})();