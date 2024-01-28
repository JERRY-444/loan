import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Userac } from '/imports/api/userac.js';

Template.login.onCreated(function() {
  this.role = new ReactiveVar('');
  this.email = new ReactiveVar('');
  this.password = new ReactiveVar('');
});

Template.login.events({
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

    Meteor.loginWithPassword(email, password, function(error) {
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

Template.login.helpers({
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
