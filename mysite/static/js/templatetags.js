function Static() {
	this.tags = ['static'];
	this.parse = function(parser, nodes, lexer) {
		// get the tag token
		var tok = parser.nextToken();

		// parse the args and move after the block end. passing true
		// as the second arg is required if there are no parentheses
		var args = parser.parseSignature(null, true);
		parser.advanceAfterBlockEnd(tok.value);

		// See above for notes about CallExtension
		return new nodes.CallExtension(this, 'run', args);
	};
	this.run = function(context, argument, body, errorBody) {
		return argument;
	}
}

function DjUrl() {
	this.tags = ['url'];
	this.parse = function(parser, nodes, lexer) {
		// get the tag token
		var tok = parser.nextToken();

		// parse the args and move after the block end. passing true
		// as the second arg is required if there are no parentheses
		var args = parser.parseSignature(null, true);
		parser.advanceAfterBlockEnd(tok.value);

		// See above for notes about CallExtension
		return new nodes.CallExtension(this, 'run', args);
	};
	this.run = function(context, argument, body, errorBody) {
		return argument;
	}
}

function Trans() {
	this.tags = ['trans'];
	this.parse = function(parser, nodes, lexer) {
		// get the tag token
		var tok = parser.nextToken();

		// parse the args and move after the block end. passing true
		// as the second arg is required if there are no parentheses
		var args = parser.parseSignature(null, true);
		parser.advanceAfterBlockEnd(tok.value);

		// See above for notes about CallExtension
		return new nodes.CallExtension(this, 'run', args);
	};
	this.run = function(context, argument, body, errorBody) {
		return argument;
	}
}

function Load() {
	this.tags = ['load'];
	this.parse = function(parser, nodes, lexer) {
		// get the tag token
		var tok = parser.nextToken();

		// parse the args and move after the block end. passing true
		// as the second arg is required if there are no parentheses
		var args = parser.parseSignature(null, true);
		parser.advanceAfterBlockEnd(tok.value);

		// See above for notes about CallExtension
		return new nodes.CallExtension(this, 'run', args);
	};
	this.run = function(context, argument, body, errorBody) {
		return '';
	}
}

env.addExtension('static', new Static());
env.addExtension('trans', new Trans());
env.addExtension('url', new DjUrl());
env.addFilter('date', function(str, type) {
    return str;
});
env.addFilter('slugify', function(str) {
    return str;
});