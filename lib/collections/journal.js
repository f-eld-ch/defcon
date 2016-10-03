import {Mongo}        from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
const Journal = new Mongo.Collection("journal");

// Schema
Journal.schema = new SimpleSchema({
  sender: {type: String},
  receiver: {type: String},
  text: {type: String},
  incident: {type: String, regEx: SimpleSchema.RegEx.Id},
  createdAt: {type: Date, defaultValue: new Date()},
  insertedAt: {type: Date, defaultValue: new Date(), optional: true},
  priority: {type: Boolean, defaultValue: false, optional: true}
});
Journal.attachSchema(Journal.schema);

// Helpers
Journal.helpers({});

// Security - don't allow client side updates
Journal.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

export { Journal };
