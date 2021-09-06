const common = {
    MESSAGING: 'messaging',
    CONNECTIONS: 'connections',
    ANNOUNCEMENTS: 'announcements',
    COMPANY_ACTIVITY: 'company_activity',
    INTERNAL_USERS_MNG: 'internalUsersMng',
    INTERNAL_USERS_VIEW: 'internalUsersView'
};

const seller = {
    ...common,
    BUYER_MNG: 'buyerMng',
    STORES_VIEW: 'storesView',
    STORE_SPECIFIC: 'storeSpecific',
    STORES_CREATION: 'storesCreation',
    IMAGE_LIBRARY_MNG: 'imgLibraryMng',
    IMAGE_LIBRARY_VIEW: 'imgLibraryView',
    PRODUCT_LIBRARY_MNG: 'productLibraryMng',
    PRODUCT_LIBRARY_VIEW: 'productLibraryView'
};

const buyer = {
    ...common,
    MALLS: 'malls',
    MALLS_CONNECTED: 'mallsConnected'
};

const service = { MEMBERS: 'members' };

module.exports = { seller, buyer, service };
