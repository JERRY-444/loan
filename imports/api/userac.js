import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Userac = new Mongo.Collection('userac');

Userac.schema = new SimpleSchema({
  role: {
    type: String,
    allowedValues: ['admin', 'borrower', 'lender'],
    label: 'Role'
  },
  username: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: 'Email'
  },
  password: {
    type: String,
    label: 'Password'
  }
});

Userac.attachSchema(Userac.schema);
