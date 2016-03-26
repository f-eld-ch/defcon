export default {
    pathFor({Meteor, LocalState, FlowRouter}, path, params) {
        let query = params && params.query ? FlowRouter._qs.parse(params.query) : {};
        return FlowRouter.path(path, params, query);
    },
    urlFor({Meteor, LocalState, FlowRouter}, path, params) {
        return Meteor.absoluteUrl(pathFor(path, params));
    },
    currentRoute({Meteor, LocalState, FlowRouter}, path, params) {
        FlowRouter.watchPathChange();
        return FlowRouter.current().route.name === route ? 'active' : '';
    },
};
