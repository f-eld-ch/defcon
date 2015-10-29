if (Incidents.find().count === 0 || Journal.find().count() === 0) {
    Incidents.insert({
        createdAt: new Date(),
        name: 'Test Event 1',
        location: 'FooBar',
    });

    var incident = Incidents.findOne();

    Journal.insert({
        text: 'Ich bin Globi und wer bist du?',
        sender: 'Globi',
        receiver: 'Walterli',
        createdAt: new Date(),
        incident: incident._id,
    });

    Journal.insert({
        text: 'Moritz fragt Max wie das Wetter ist.',
        sender: 'Moritz',
        receiver: 'Max',
        createdAt: new Date(),
        incident: incident._id,
    });

    Journal.insert({
        text: 'Max sagt Moritz, dass hier alles gut ist.',
        sender: 'Max',
        receiver: 'Moritz',
        createdAt: new Date(),
        incident: incident._id,
    });
}

if (Meteor.users.find().count() === 0) {
    console.log("creating user account");
    Accounts.createUser({
        username: Meteor.settings.admin.email,
        email: Meteor.settings.admin.email,
        password: Meteor.settings.admin.password,
    });
}
