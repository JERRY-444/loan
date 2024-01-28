import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Userac } from '/imports/api/userac.js';

Template.register.onCreated(function() {
  this.role = new ReactiveVar('');
  this.email = new ReactiveVar('');
  this.password = new ReactiveVar('');
});

Template.register.events({
  'change #role': function(event, template) {
    template.role.set(event.target.value);
  },
  'change #email': function(event, template) {
    template.email.set(event.target.value);
  },
  'change #password': function(event, template) {
    template.password.set(event.target.value);
  },
  'submit form': function(event, template) {
    event.preventDefault();

    const role = template.role.get();
    const email = template.email.get();
    const password = template.password.get();

    Accounts.createUser({
      role: role,
      email: email,
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
  email: function() {
    return Template.instance().email.get();
  },
  password: function() {
    return Template.instance().password.get();
  }
});
