(function() {
	var showLoader = function(_where_to, $this) {
		if (_where_to === _inside_element) {
			$this.css('position', 'relative').append('<div class="loader"></div>');
			return $this;
		} else {
			$('body').append('<div class="loader-fixed"></div>');
			return $('body');
		}
	};

	var hideLoader = function($this) {
		if (typeof $this === typeof undefined) {
			$('.loader').remove();
			return $('body');
		} else {
			$this.find('.loader').remove();
			return $this;
		}
	};

	$.fn.showLoader = function(_where_to) {
		return showLoader(_where_to, this);
	};

	$.fn.hideLoader = function() {
		return hideLoader(this);
	};
	
	var callbacks = {
		openThankYou: function(data,$loader) {
			if (!!data.stored){
				$loader.hideLoader()
				$('#contact-thank-you').foundation('open');
				$('#mailform').foundation('resetForm');
			} else {
				$loader.hideLoader()
				for(var idx in data.form_errors){
					$('#mailform').foundation('addErrorClasses', $('[name=' + idx + ']'));
				}
			}
		},
	}
	var _inside_element = true,
		_inside_body = false;

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

	$.fn.form2Ajax = function($target, $loader ,usejson, doneCallBack) {
		var data = {'empty':0};
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
					$loader.showLoader(_inside_element);
				}
			}
		}).done(function(data) {
			if (typeof $target !== typeof undefined && $target) {
				$target.html(data);
			}
			if (typeof doneCallBack !== typeof undefined) {
				doneCallBack(data, $target, $loader ,usejson);
			}

		});
		return data || this;
	};

	$(document).foundation();
	var filter_el = function($el, e) {
		if (!!e) {
			e.preventDefault();
		}
		$el.addClass('active').siblings('[data-filter]').removeClass('active');
		var el_class = $el.attr('data-filter');
		if (el_class.toLowerCase() === 'none') {
			$('.js-filter').removeClass('invisible');
		} else {
			$('.js-filter').not('.category-' + el_class).addClass('invisible');
			$('.category-' + el_class).removeClass('invisible');
		}
		return true
	}
	$(document)
		.on('click', '[data-filter]', function(e) {
			filter_el($(this), e)
		})
		.on('submit', '.js-ajaxform', function(e) {
			e.preventDefault();
			var $t = $(this);
			$(this).form2Ajax(false, $t.parents('.modal-content'), 'usejson', callbacks[$t.attr('data-callback')])
		});
})();