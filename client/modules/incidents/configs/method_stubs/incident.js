import {check} from 'meteor/check';

export default function ({Meteor, Collections}) {
  Meteor.methods({
    'incidents.create'(_id, name, location, createdAt) {
      check(name, String);
      check(location, String);

      createdAt = createdAt ? createdAt : new Date();
      check(createdAt, Date);

      const incident = {
        _id, name, location, createdAt,
        saving: true
      };
      Collections.Incidents.insert(incident);
    }
  });
  Meteor.methods({
    'incidents.update'(_id, name, location, createdAt) {
    }
  });

}
