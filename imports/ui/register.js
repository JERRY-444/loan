import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Userac } from '/imports/api/userac.js';

Template.register.onCreated(function() {
  this.role = new ReactiveVar('');
  this.username = new ReactiveVar('');
  this.password = new ReactiveVar('');
});

Template.register.events({
  'change #role': function(event, template) {
    template.role.set(event.target.value);
  },
  'change #username': function(event, template) {
    template.username.set(event.target.value);
  },
  'change #password': function(event, template) {
    template.password.set(event.target.value);
  },
  'click #register': function(event, template) {
    event.preventDefault();

    const role = template.role.get();
    const username = template.username.get();
    const password = template.password.get();

    Accounts.createUser({
      role: role,
      username: username,
      password: password
    }, function(error) {
      if (error) {
        console.log(error);
      } else {
        FlowRouter.go('/');
      }
    });
  }
});

Template.register.helpers({
  role: function() {
    return Template.instance().role.get();
  },
  username: function() {
    return Template.instance().username.get();
  },
  password: function() {
    return Template.instance().password.get();
  }
});
