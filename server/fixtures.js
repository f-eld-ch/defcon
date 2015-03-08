if (Journal.find().count() === 0) {
    Journal.insert({
        text: 'Ich bin Globi und wer bist du?',
        sender: 'Globi',
        receiver: 'Walterli',
        createdAt: new Date(),
    });

    Journal.insert({
        text: 'Moritz fragt Max wie das Wetter ist.',
        sender: 'Moritz',
        receiver: 'Max',
        createdAt: new Date(),
    });

    Journal.insert({
        text: 'Max sagt Moritz, dass hier alles gut ist.',
        sender: 'Max',
        receiver: 'Moritz',
        createdAt: new Date(),
    });
}