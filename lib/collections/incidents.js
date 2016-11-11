import {Mongo}        from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Journal}      from '/lib/collections/journal';

// Collection
const Incidents = new Mongo.Collection('incidents');

// Schema Definition
Incidents.schema = new SimpleSchema({
  name: {type: String},
  location: {type: String},
  createdAt: {type: Date, defaultValue: new Date()},
  closedAt: {type: Date, defaultValue: undefined, optional: true},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
});
Incidents.attachSchema(Incidents.schema);

// Helpers
Incidents.helpers({
  get_journal() {
    return Journal.findOne({incident: this._id});
  }
});

// Security - don't allow client side updates
Incidents.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

export { Incidents };
