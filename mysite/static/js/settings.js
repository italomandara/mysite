nunjucks.installJinjaCompat();
var env = nunjucks.configure('/static/js/jinja_templates/', {
	autoescape: true
});
var bootstrap = function(){};
window.viewready = function() {};