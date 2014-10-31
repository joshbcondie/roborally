Router.configure({
  layoutTemplate: 'applicationLayout'
});

Router.route('/', {
	loadingTemplate: 'loading',

	waitOn: function() {
		return Meteor.subscribe('games');
	},

	action: function() {
		this.render('gameList');
		this.render('gameItemPostForm', {to: 'rightPanel'})
	}
});

Router.route('/about', function() {
	this.render('about');
	this.render('aboutSidePanel', {to: 'rightPanel'})
});

Router.route('/games/:_id', {
	name: 'game.page',
	loadingTemplate: 'loading',

	waitOn: function() {
		return [Meteor.subscribe('games'), Meteor.subscribe('chat')];
	},

	action: function() {
		this.render('gamePage', {
			data: function() {
				Session.set('currentGameId', this.params._id);
				var game = Games.findOne(this.params._id);
				if (game === undefined) {
					Router.go('/');
				} else {
					return game;
				}
			}
		});
		this.render('gamePageActions', {to: 'rightPanel'})
	}
});
