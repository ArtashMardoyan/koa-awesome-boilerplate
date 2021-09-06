const buyer = {
    BUSINESS: 'business',
    INTERNAL_USER: 'internalUser',
    STORE: 'store',
    ANNOUNCEMENT: 'announcement',
    ORDER: 'order'
};

const seller = {
    BUSINESS: 'business',
    INTERNAL_USER: 'internalUser',
    PRODUCT: 'product',
    STORE: 'store',
    CONNECTION: 'connection',
    ANNOUNCEMENT: 'announcement',
    ORDER: 'order'
};

const withPermissions = {
    seller: {
        [seller.INTERNAL_USER]: ['internalUserMng'],
        [seller.PRODUCT]: ['productLibraryMng'],
        [seller.STORE]: ['storesCreation'],
        [seller.ORDER]: ['orderMng']
    },
    buyer: {
        [buyer.INTERNAL_USER]: ['internalUserMng']
    }
};

module.exports = { buyer, seller, withPermissions };
