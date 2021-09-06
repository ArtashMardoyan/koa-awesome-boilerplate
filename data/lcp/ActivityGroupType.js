const ActivityType = require('./ActivityType');

const { INTERNAL_USER_ACCEPTED: I_U_A, ANNOUNCEMENT_SHARE: A_SH, ANNOUNCEMENT_LIKE: A_L, CONNECTION_ACCEPT: C_A } = ActivityType;

module.exports.GroupActivity = [A_L, A_SH, C_A, I_U_A];
module.exports.GroupActivityType = `'${A_L}', '${A_SH}', '${C_A}', '${I_U_A}'`;
