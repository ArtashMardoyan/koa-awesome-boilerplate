const _ = require('lodash');
const { Op } = require('sequelize');
const passportJwt = require('passport-jwt');
const koaPassport = require('koa-passport');
const passportAnonymous = require('passport-anonymous');

const { AccessTokenType } = require('../constants');
const { Admin, User } = require('../data/models');
const { UserStatus } = require('../data/lcp');
const config = require('../config');

const { ExtractJwt } = passportJwt;
const JwtStrategy = passportJwt.Strategy;
const AnonymousStrategy = passportAnonymous.Strategy;
const jwtOptions = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config.JWT_SECRET };

koaPassport.use(
    'jwt.user',
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            const { ACTIVATED, PENDING } = UserStatus;

            if (!_.has(payload, 'type')) {
                return done(null, null);
            }

            const user =
                payload.type === AccessTokenType.ADMIN
                    ? await Admin.findByPk(payload.id)
                    : await User.findOne({ where: { id: payload.id, status: { [Op.in]: [ACTIVATED, PENDING] } } });

            if (_.isEmpty(user) || user.accessTokenSalt !== payload.salt) {
                return done(null, null);
            }

            user.accessTokenType = payload.type;

            done(null, user);
        } catch (e) {
            done(e, null);
        }
    })
);

koaPassport.use(new AnonymousStrategy());

module.exports = koaPassport;
