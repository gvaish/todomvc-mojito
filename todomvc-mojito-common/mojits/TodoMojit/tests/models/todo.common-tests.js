YUI.add('TodoMojitModelTodo-tests', function(Y, NAME) {

	var suite = new YUITest.TestSuite('TodoMojitModelTodo-tests'),
		A = YUITest.Assert,
		todo = null;

	suite.add(new YUITest.TestCase({
		name: "Todo Model Tests",

		setUp: function() {
			todo = Y.mojito.models.Todo;
			todo.removeAll(function() {
				todo.add({'title': 'Main Todo'});
			});
		},

		tearDown: function() {
			todo = null;
		},

		'test init': function() {
			todo.init({});
			A.skip();
		},

		'test getall': function() {
			todo.getAll(function(err, items) {
				A.isNotNull(items);
				A.areEqual(1, items.length);
			});
		},

		'test update': function() {
			todo.getAll(function(err, items) {
				var item, id;

				A.isNull(err);
				A.isNotNull(items);
				item = items[0];
				id = item.id;
				item.title = 'Changed';
				todo.update(item, function(err, item) {
					A.isNull(err);
					A.isNotNull(item);
					A.areEqual(id, item.id);

					todo.get(id, function(err, item) {
						A.isNull(err);
						A.isNotNull(item);
						A.areEqual('Changed', item.title);
					});
				});
			});
		},

		'test get': function() {
			todo.getAll(function(err, items) {
				var id;

				A.isNull(err);
				A.isNotNull(items);
				id = items[0].id;
				todo.get(id, function(err, item) {
					A.isNull(err);
					A.isNotNull(item);
					A.areEqual(id, item.id);
				});
			});
		},

		'test add': function() {
			todo.add({'title': 'Second Todo'}, function(err, items) {
				A.isNotNull(items);
				A.areEqual(2, items.length);
			});
		}
	}));

	YUITest.TestRunner.add(suite);

}, "0.1.0", { requires: ["mojito-test", "TodoMojitModelTodo"] });
