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
            type: type.INTEGER,
            allowNull: false
        },
        action: {
            type: type.STRING,
            allowNull: false
        },
        postId: {
            type: type.INTEGER,
            allowNull: false
        }
    })
}