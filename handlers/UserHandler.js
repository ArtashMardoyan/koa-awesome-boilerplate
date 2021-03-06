const _ = require('lodash');
const validator = require('validator');
const { Op, literal } = require('sequelize');

const { ErrorMessages, OrderField } = require('../constants');
const { UserStatus } = require('../data/lcp');
const { User } = require('../data/models');

class UserHandler {
    static async actionView(ctx) {
        const currentUserId = _.get(ctx.state, 'user.id', null);

        const profileId = ctx.params.id === 'me' ? currentUserId : ctx.params.id;

        const user = await User.findByPk(profileId);

        if (_.isEmpty(user)) {
            return ctx.notFound(ErrorMessages.USER_NOT_FOUND);
        }

        return ctx.ok({ user });
    }

    static async actionIndex(ctx) {
        const { limit, offset, page: currentPage } = ctx.state.paginate;
        const { orderType, orderField } = ctx.query;

        const orderKey = _.get(OrderField.USER, _.toUpper(_.snakeCase(orderField)), OrderField.USER.DEFAULT);

        const { rows: users, count: total } = await User.findAndCountAll({
            order: [literal(`${orderKey} ${orderType}, ${OrderField.USER.ADDITIONAL}`)],
            offset,
            limit
        });

        return ctx.ok({ users, _meta: { total, currentPage, pageCount: Math.ceil(total / limit) } });
    }

    static async actionCreate(ctx) {
        const userFields = ['firstName', 'lastName', 'email', 'password'];
        const { body } = ctx.request;

        const user = await User.create(_.pick(body, userFields));

        return ctx.created({ user, token: user.generateToken() });
    }

    static async actionLogin(ctx) {
        const { email, password } = ctx.request.body;

        const user = await User.findOne({
            where: { email: validator.normalizeEmail(_.trim(email)), status: { [Op.ne]: UserStatus.DELETED } }
        });

        if (_.isEmpty(user) || !(await user.validatePassword(password))) {
            return ctx.notFound(ErrorMessages.INVALID_CREDENTIALS);
        } else if (user.status === UserStatus.BLOCKED) {
            return ctx.forbidden(ErrorMessages.ACCOUNT_IS_DEACTIVATED);
        }

        return ctx.ok({ user, token: user.generateToken() });
    }

    static async actionUpdate(ctx) {
        const userFields = ['firstName', 'lastName'];
        const { id: userId } = ctx.state.user;
        const { body } = ctx.request;

        await User.update(_.pick(body, userFields), { where: { id: userId } });

        return ctx.ok({ user: await User.findByPk(userId) });
    }
}

module.exports = UserHandler;
