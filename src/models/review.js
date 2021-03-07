module.exports = (sequelize, type) => {
    return sequelize.define('review', {
        id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        postId: {
            type: type.INTEGER,
            allowNull: false,
        },
        body: {
            type: type.STRING,
            allowNull: false
        },
        userId: {
            type: type.INTEGER
        }
    })
}