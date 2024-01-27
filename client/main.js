// client/main.js
import './main.html';
import './main.css';

FlowRouter.route('/', {
  action() {
    BlazeLayout.render('Layout', { main: 'login' });
  },
});

FlowRouter.route('/dashboard/borrower', {
  triggersEnter: [checkLoggedIn, checkUserRole],
  action() {
    BlazeLayout.render('Layout', { main: 'dashboard', role: 'borrower' });
  },
});

FlowRouter.route('/dashboard/lender', {
  triggersEnter: [checkLoggedIn, checkUserRole],
  action() {
    BlazeLayout.render('Layout', { main: 'dashboard', role: 'lender' });
  },
});

Template.registerHelper('isRole', (role) => {
  const user = Meteor.user();
  return user && user.profile && user.profile.role === role;
});

function checkLoggedIn(context, redirect) {
  if (!Meteor.userId()) {
    redirect('/');
  }
}

function checkUserRole(context, redirect) {
  const user = Meteor.user();
  if (user && user.profile && user.profile.role !== context.route.options.role) {
    redirect('/');
  }
}

Template.login.events({
  'submit #login-form'(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const role = event.target.role.value;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.log(error.reason);
      } else {
        FlowRouter.go(`/dashboard/${role}`);
      }
    });
  },
});

Template.dashboard.helpers({
  loanRequests() {
    return LoanRequest.find();
  },
});

Template.dashboard.events({
  'submit #loan-request-form'(event) {
    event.preventDefault();

    const loanData = {
      // Extract loan request data
    };

    // Save loan request to loanrequest collection
    LoanRequest.insert(loanData);

    // Add additional logic for displaying success message or redirect
  },
});

Template.borrowerDashboard.helpers({
  loanRequests() {
    return LoanRequest.find();
  },
});

Template.lenderDashboard.helpers({
  loanRequests() {
    return LoanRequest.find();
  },
  // Additional lender dashboard helpers
});
