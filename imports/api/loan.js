import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Loans = new Mongo.Collection('loans');

Loans.schema = new SimpleSchema({
  accountHolderName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  lenderName: {
    type: String,
  },
  status: {
    type: String,
    allowedValues: ['pending', 'approved', 'rejected'],
  },
});

Loans.attachSchema(Loans.schema);

if (Meteor.isServer) {
  Meteor.publish('loans', function () {
    // Publish loans based on the user's role
  });
}
