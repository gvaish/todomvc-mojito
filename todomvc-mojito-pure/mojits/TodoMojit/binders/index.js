/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('TodoMojitBinderIndex', function(Y, NAME) {
	"use strict";

	Y.namespace('mojito.binders')[NAME] = {

		init: function(mojitProxy) {
			this.mp = mojitProxy;
		},

		bind: function(node) {
			var self = this;

			this.node = node;
			this.inputNode = node.one('#new-todo');
			this.listNode = node.one('#todo-list');
			this.toggleAll = node.one('#toggle-all');

			this.addHandlers();
		},

		addHandlers: function() {
			var node = this.node,
				self = this;

			this.inputNode.on('keypress', function(e) {
				self.enterCreate(e);
			});

			this.toggleAll.on('click', function(e) {
				//mark all completed <=> not completed
			});

			node.delegate(['keypress', 'change', 'blur'], function(e) {
				if(e.type === 'change' || e.type === 'blur' || e.keyCode === 13 || e.keyCode === 27) {
					self.stopEdit(e);
				}
			}, '.edit');

			node.delegate(['dblclick'], function(e) {
				self.startEdit(e);
			}, 'div.view > label');

			node.delegate('click', function(e) {
				//delete
			}, '.destroy');

			node.delegate('click', function(e) {
				//complete <=> !complete
			}, '.toggle');
		},

		updateUI: function() {
			//
		},

		startEdit: function(e) {
			var lbl = e.currentTarget,
				li = lbl.ancestor('li');

			li.addClass('editing');
			li.one('.edit').focus().select();
		},

		stopEdit: function(e) {
			//alert('value: ' + e.currentTarget.get("value"));
			var input = e.currentTarget,
				li = input.ancestor('li'),
				lbl = li.one('label'),
				value = Y.Escape.html(Y.Lang.trim(input.get("value"))),
				oldValue = lbl.getHTML();

			li.removeClass('editing');
			if(e.keyCode === 27) {
				input.set("value", oldValue);
			} else {
				//TODO: update the model on server as well
				lbl.setHTML(value);
			}
		},

		enterCreate: function(e) {
			var value = Y.Escape.html(Y.Lang.trim(this.inputNode.get('value'))),
				self  = this;

			if (e.keyCode !== 13 || !value) {
				return;
			}

			this.mp.invoke('operate', {
				params: {
					'body': {
						'op': 'add',
						'data': Y.JSON.stringify({ 'title': value })
					}
				}
			}, function(err, response) {
				if(err) {
					alert('Error occurred: ' + err);
				} else {
					self.addTodoItem(response);
					self.inputNode.set('value', '');
				}
			});
		},

		addTodoItem: function(html) {
			var self = this,
				toAdd = Y.Node.create('<li>' + html + '</li>');

			this.listNode.prepend(toAdd);
		}
	};

}, '0.0.1', {requires: ['mojito-client', 'node', 'json' ]});
