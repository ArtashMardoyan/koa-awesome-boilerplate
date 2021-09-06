const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { DataTypes, Model } = require('sequelize');

const { AccessTokenType } = require('../../constants');
const { Sanitize } = require('../../components');
const { UserStatus } = require('../lcp');
const config = require('../../config');

class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
                accessTokenSalt: { type: DataTypes.STRING },
                activationCode: { type: DataTypes.INTEGER },
                forgotPasswordCode: { type: DataTypes.INTEGER },
                firstName: { type: DataTypes.STRING(50), validate: { len: [2, 50] }, allowNull: false },
                lastName: { type: DataTypes.STRING(50), validate: { len: [2, 50] }, allowNull: false },
                status: {
                    allowNull: false,
                    type: DataTypes.ENUM,
                    values: _.values(UserStatus),
                    defaultValue: UserStatus.PENDING
                },
                email: {
                    allowNull: false,
                    type: DataTypes.STRING,
                    validate: { isEmail: true },
                    unique: { message: 'email.unique' }
                },
                password: {
                    allowNull: false,
                    type: DataTypes.STRING,
                    validate: { is: /(?=.*\d)(?=.*[a-z])(?=.*[!@#\\^&\])(?=.*[A-Z]).{6,}/ }
                }
            },
            {
                sequelize,
                timestamps: true,
                tableName: 'user',
                setterMethods: {
                    firstName(value) {
                        this.setDataValue('firstName', value ? _.trim(value) : null);
                    },
                    lastName(value) {
                        this.setDataValue('lastName', value ? _.trim(value) : null);
                    },
                    email(value) {
                        this.setDataValue('email', value ? validator.normalizeEmail(_.trim(value)) : null);
                    },
                    password(value) {
                        this.setDataValue('password', value ? Sanitize.cleanPassword(value) : null);
                    }
                },
                hooks: { beforeSave: User.hookBeforeSave }
            }
        );
    }

    static associate(models) {}

    static addScopes(models) {}

    static hookBeforeSave(user) {
        if (user.isNewRecord || user.changed('password')) {
            const salt = bcrypt.genSaltSync(6);

            user.accessTokenSalt = salt;
            user.password = User.generateHash(user.password, salt);
        }
    }

    static generateHash(myPlaintextPassword, salt) {
        return bcrypt.hashSync(myPlaintextPassword, salt);
    }

    static additionalAttributes(alias = 'User', userFields = 'user') {}

    validatePassword(myPlaintextPassword = '') {
        return bcrypt.compareSync(myPlaintextPassword, this.password);
    }

    generateToken() {
        const { id, accessTokenSalt: salt } = this;

        return { type: 'jwt', access: jwt.sign({ id, salt, type: AccessTokenType.USER }, config.JWT_SECRET) };
    }

    fields() {
        const model = this.get();
        const hiddenFields = ['password', 'forgotPasswordCode', 'activationCode', 'accessTokenSalt'];

        return _.omit(model, hiddenFields);
    }
}

module.exports = User;
