module.exports = {
    USER: {
        EMAIL: '"User"."email"',
        ADDITIONAL: '"User"."id"',
        DEFAULT: '"User"."createdAt"',
        STATUS: '"User"."status"::text',
        CREATED_AT: '"User"."createdAt"',
        FULL_NAME: 'CONCAT("User"."firstName", "User"."lastName")'
    }
};
