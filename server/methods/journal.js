import {Journal,Incidents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {logger} from '/server/lib/logger.js';
import moment   from 'moment';
import {check,Match} from 'meteor/check';

export default() => {
  Meteor.methods({

    'journal.create' (message) {
      check(message, {
        sender: String,
        receiver: String,
        text: String,
        incident: String,
        createdAt: Match.Optional(Date),
        priority: Match.Optional(Boolean)
      });

      const selector = {
        _id: message.incident
      };
      if (!Incidents.findOne(selector)) {
        throw new Meteor.Error('journal.create.INVALID', 'Ereignis schein falsch zu sein', message);
      }

      Journal.insert({
        createdAt: message.createdAt ? message.createdAt : new Date(),
        insertedAt: new Date(),
        text: message.text,
        sender: message.sender,
        receiver: message.receiver,
        incident: message.incident,
        priority: message.priority ? message.priority : false
      });
    },

    'journal.update' (message) {
      check(message, {
        _id: String,
        sender: String,
        receiver: String,
        text: String,
        incident: String,
        createdAt: Date,
        priority: Boolean
      });

      let msg = Journal.findOne(message._id);
      if (!msg) {
        throw new Meteor.Error(404, 'Nachricht existiert nicht', message._id);
      }

      let difference = moment().diff(moment(msg.insertedAt), 'seconds');
      if (!msg.insertedAt || difference > 60) {
        throw new Meteor.Error('update-outdated-journal-message', 'Nachricht kann nicht mehr editiert werden (nur möglich während 60 Sekunden).', message._id);
      } else {
        Journal.update(message._id, {
          $set: {
            createdAt: message.createdAt,
            text: message.text,
            sender: message.sender,
            receiver: message.receiver
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
