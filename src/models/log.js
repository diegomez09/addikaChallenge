module.exports = (sequelize, type) => {
    return sequelize.define('log', {
        id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        userId: {
            type: type.STRING,
            allowNull: false
        },
        action: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        postId: {
            type: type.STRING,
            allowNull: false
        }
    })
}