import {Mongo} from 'meteor/mongo';

export const Incidents = new Mongo.Collection('incidents');
export const Journal = new Mongo.Collection("journal");

export default function () {
    Incidents();
    Journal();
}
