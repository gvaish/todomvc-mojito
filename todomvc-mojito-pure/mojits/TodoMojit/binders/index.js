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

			//self.mp.invoke('operate', { 'params': { 'body': { 'op': 'noop' }}}, function() {
				self.resync();
			//});
		},

		resync: function() {
			var self = this;
			Y.log('resync called...', 'warn', NAME);
			self.mp.invoke('operate',  { 'params': { 'body': { 'op': 'get' } }}, function(err, response) {
				//Y.log('get, err => ' + err, 'warn', NAME);
				Y.log('get, response => response-size: ' + response.length, 'warn', NAME);
				if(!err) {
					self.listNode.append(response);
				}
			});
		},

		addHandlers: function() {
			var node = this.node,
				self = this;

			this.inputNode.on('keypress', function(e) {
				self.addItem(e);
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
				self.deleteItem(e);
			}, '.destroy');

			node.delegate('click', function(e) {
				self.toggleItem(e);
			}, '.toggle');
		},

		updateUI: function() {
			//
		},

		toggleItem: function(e) {
			var cbox = e.currentTarget,
				complete = cbox.get('checked'),
				li = cbox.ancestor('li'),
				id = li.get('id'),
				self = this;

			this.mp.invoke('operate', { 'params': {
				'body': { 'op': 'toggle', 'data': id }
			}}, function(err, response) {
				if(err) {
					alert('Error: ' + err);
				} else {
					li[complete ? 'addClass' : 'removeClass']('completed');
				}
			});
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
				//this.addItem(e);
				lbl.setHTML(value);
			}
		},

		deleteItem: function(e) {
			var btn = e.target,
				li = btn.ancestor('li'),
				itemId = li.get('id');

			//Y.log('Delete: ' + itemId, 'warn', NAME);
			this.mp.invoke('operate', { 'params':
				{ 'body': { 'op': 'delete', 'data': itemId }}
			}, function(err, response) {
				if(err) {
					alert('Error while deleting: ' + err);
				} else {
					li.get('parentNode').removeChild(li);
				}
			});
		},

		addItem: function(e) {
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
					//self.addTodoItem(response);
					//alert('Response: ' + response);
					//self.listNode.set('inner')
					self.inputNode.set('value', '');
					self.resync();
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
