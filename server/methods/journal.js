import {Journal,Incidents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {logger} from '/server/lib/logger.js';
import moment   from 'moment';
import {check,Match} from 'meteor/check';

export default() => {
  Meteor.methods({

    'journal.create' (id, sender, receiver ,text, createdAt, incident) {
      check(sender, String);
      check(receiver, String);
      check(text, String);
      check(incident, String);
      check(createdAt, Date);

      const selector = {
        _id: incident
      };
      if (!Incidents.findOne(selector)) {
        throw new Meteor.Error('journal.create.INVALID', 'Ereignis existiert nicht!');
      }

      Journal.insert({
        createdAt: createdAt ? createdAt : new Date(),
        insertedAt: new Date(),
        text: text,
        sender: sender,
        receiver: receiver,
        incident: incident,
        priority: false
      });
    },

    'journal.update' (id, sender, receiver ,text, createdAt, incident) {
      check(id, String);
      check(sender, String);
      check(receiver, String);
      check(text, String);
      check(incident, String);
      check(createdAt, Match.Optional(Date));

      let msg = Journal.findOne(id);
      if (!msg) {
        throw new Meteor.Error(404, 'Nachricht existiert nicht', id);
      }

      let difference = moment().diff(moment(msg.insertedAt), 'seconds');
      if (!msg.insertedAt || difference > 60) {
        throw new Meteor.Error('update-outdated-journal-message', 'Nachricht kann nicht mehr editiert werden (nur möglich während 60 Sekunden).');
      } else {
        Journal.update(id, {
          $set: {
            createdAt: createdAt,
            text: text,
            sender: sender,
            receiver: receiver,
            incident: incident,
            priority: msg.priority
          }
        });
      }
    },

    'journal.delete' (_id) {
      check(_id, String);
      const selector = {
        _id
      };
      logger.info('deletion of message ', _id , ' by User ', Meteor.uuid() );


      let msg = Journal.findOne(selector);
      if (!msg) {
        throw new Meteor.Error(404, 'Nachricht existiert nicht', _id);
      }
      let difference = moment().diff(moment(msg.insertedAt), 'seconds');
      if (!msg.insertedAt || difference > 60) {
        throw new Meteor.Error(403, 'Nachricht kann nicht gelöscht werden (nur möglich während 60 Sekunden).', _id);
      } else {
        Journal.remove(selector);
      }
    },

    'journal.togglePriority' (_id) {
      check(_id, String);
      const selector = {
        _id
      };

      let message = Journal.findOne(selector);
      if (!message) {
        throw new Meteor.Error(404, 'Nachricht existiert nicht', _id);
      }

      if (Meteor.isServer) {
        logger.debug("setting priority on message ", _id, !message.priority);
      }
      Journal.update(selector, {
        $set: {
          priority: !message.priority
        }
      });
    }
  });
};
