/**
 * Client-sided file allowing for a customizable UI (i18n-like)
 */

import SimpleSchema from 'simpl-schema';

const i18n = new SimpleSchema({
    language: {type: String, max: 2, min: 2},
    consentWindow: Object,
    'consentWindow.title': {type: String},
    'consentWindow.confirmationBox': {type: String},
    'consentWindow.validationBtn': {type: String},
    profileWindow: Object,
    'profileWindow.title': {type: String},
    'profileWindow.lastConnection': {type: String},
    'profileWindow.lastConnectionMomentFormat': {type: String},
    'profileWindow.contactBtn': {type: String},
    'profileWindow.closeBtn': {type: String},
    'profileWindow.legalNotice': {type: String},
    contactWindow: Object,
    'contactWindow.title': {type: String},
    'contactWindow.email': {type: String},
    'contactWindow.selectPlaceholder': {type: String},
    'contactWindow.subject': {type: String},
    'contactWindow.change': {type: String},
    'contactWindow.access': {type: String},
    'contactWindow.delete': {type: String},
    'contactWindow.comment': {type: String},
    'contactWindow.validationBtn': {type: String},
});

const userFields = new SimpleSchema({
    firstName: {type: String},
    lastName: {type: String},
    picture: {type: String},
    email: {type: String},
});

GDPRconfig = {
    ui: {
        consentWindow: {},
        profileWindow: {},
        contactWindow: {},
    },
    addi18n: function (config) {
        try {
            i18n.validate(config);
        }
        catch (e) {
            console.error('GDPRconfig.addi18n()', e.message);
        }

        GDPRconfig.language = config.language;
        GDPRconfig.ui.consentWindow[config.language] = config.consentWindow;
        GDPRconfig.ui.profileWindow[config.language] = config.profileWindow;
        GDPRconfig.ui.contactWindow[config.language] = config.contactWindow;
    },

    setUserFields(config) {
        if (typeof config.firstName === 'undefined') {
            config.firstName = GDPRconfig.user.firstName;
        }
        if (typeof config.lastName === 'undefined') {
            config.lastName = GDPRconfig.user.lastName;
        }
        if (typeof config.picture === 'undefined') {
            config.picture = GDPRconfig.user.picture;
        }
        if (typeof config.email === 'undefined') {
            config.email = GDPRconfig.user.email;
        }
        try {
            userFields.validate(config);
        }
        catch (e) {
            console.error('GDPRconfig.setUserFields()', e.message);
        }
        GDPRconfig.user = config;
    }
};


GDPRconfig.setUserFields({
    firstName: 'profile.firstName',
    lastName: 'profile.lastName',
    picture: 'profile.picture',
    email: "profile.email"
});