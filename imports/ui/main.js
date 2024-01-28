import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Userac } from '/imports/api/userac.js';

Template.main.onCreated(function() {
  this.role = new ReactiveVar('');
  this.username = new ReactiveVar('');
  this.password = new ReactiveVar('');
});

Template.main.events({
  'change #role': function(event, template) {
    template.role.set(event.target.value);
  },
  'change #username': function(event, template) {
    template.username.set(event.target.value);
  },
  'change #password': function(event, template) {
    template.password.set(event.target.value);
  },
  'click #login': function(event, template) {
    event.preventDefault();

    const role = template.role.get();
    const username = template.username.get();
    const password = template.password.get();

    Meteor.loginWithPassword(username, password, function(error) {
      if (error) {
        console.log(error);
      } else {
        if (Meteor.user().role === role) {
          if (role === 'borrower') {
            FlowRouter.go('/borrower');
          } else if (role === 'lender') {
            FlowRouter.go('/lender');
          } else if (role === 'admin') {
            FlowRouter.go('/admin');
          }
        } else {
          console.log('Role does not match user profile.');
        }
      }
    });
  }
});

Template.main.helpers({
  role: function() {
    return Template.instance().role.get();
  },
  username: function() {
    return Template.instance().username.get();
  },
  password: function() {
    return Template.instance().password.get();
