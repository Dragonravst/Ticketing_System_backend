const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        role: {
            type: DataTypes.ENUM('ADMIN', 'AGENT', 'CUSTOMER'),
            allowNull: false,
            defaultValue: 'CUSTOMER'
        },

        status: {
            type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'BLOCKED'),
            allowNull: false,
            defaultValue: 'ACTIVE'
        }

    }, {
        timestamps: true,
        tableName: 'users',
        createdAt: "created_at",
        updatedAt: "updated_at",

        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },

            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    });

    // ✅ Associations
    User.associate = (models) => {
        User.hasMany(models.Ticket, {
            foreignKey: 'created_by',
            as: 'createdTickets'
        });

        User.hasMany(models.Ticket, {
            foreignKey: 'assigned_to',
            as: 'assignedTickets'
        });
    };

    return User;
};