/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('TodoMojit', function(Y, NAME) {
	"use strict";

    Y.namespace('mojito.controllers')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        index: function(ac) {
			ac.assets.addBlob('<meta charset="utf-8">\n<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">', 'top');
			//ac.assets.addCss('/static/' + ac.type + '/assets/base.css', 'top');
			ac.assets.addBlob('<link href="/static/' + ac.type + '/assets/base.css" rel="stylesheet" type="text/css" />', 'top');
			ac.assets.addBlob('<!--[if IE]>\n<script src="/static/' + ac.type + '/assets/ie.js"></script>\n<![endif]-->', 'top');
			ac.done({});
        },

		operate: function(ac) {
			var op = ac.params.getFromBody('op'),
				data = ac.params.getFromBody('data'),
				todo = Y.mojito.models.Todo;

			Y.log('[operate] Op: ' + op + ', Data: ' + data, 'warn', NAME);

			switch(op) {
				case 'get':
					if(data) {
						//data = id
					} else {
						todo.getAll(function(items) {
							Y.log('getAll => ' + Y.JSON.stringify(items), 'warn', NAME);
							if(items) {
								ac.done(Y.JSON.stringify(items));
							} else {
								ac.error('An error occurred');
							}
						});
					}
					break;
				case 'add':
					data = Y.JSON.parse(data);
					Y.log('ac.done[add]', 'warn', NAME);
					ac.done(data, 'item');
					return;
				case 'delete':
					break;
				case 'update':
					break;
				default:
					Y.log('ac.done[default]', 'warn', NAME);
					ac.done('done');
					break;
			}
		}
    };

}, '0.0.1', {requires: ['mojito', 'TodoMojitModelTodo', 'json', 'mojito-assets-addon', 'mojito-params-addon']});
