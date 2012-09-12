YUI.add('TodoMojitModelTodo', function(Y, NAME) {

	var storage;

	YUI({
	    gallery: 'gallery-2012.01.25-21-14'
	}).use('gallery-storage-lite', function(_Y) {
		Y.log('gallery-storage-lite.... => Y: ' + Y.JSON.stringify(Y.Object.keys(_Y)), 'warn', NAME);
		_Y.StorageLite.on('storage-lite:ready', function () {
			storage = _Y.StorageLite;
			if(!storage.getItem('todo')) {
				Y.log('setting todo to {}');
				storage.setItem('todo', {}, true);
			}
		});
	});

	Y.mojito.models.Todo = {
		init: function(config) {
			this.config = config;
			Y.log('loading storage lite...', 'warn', NAME);
		},

		getAll: function(callback) {
			if(storage) {
				var rv = storage.getItem('todo', true);
				Y.log(' rv: ' + Y.JSON.stringify(rv));
				callback(rv);
			} else {
				callback(null);
			}
		},
	};

}, "0.0.1", { requires: [ 'json' ] });
