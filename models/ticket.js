module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define("Ticket", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM,
            values: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
            defaultValue: 'OPEN'
        },

        priority: {
            type: DataTypes.ENUM,
            values: ['LOW', 'MEDIUM', 'HIGH'],
            defaultValue: 'LOW'
        },

        category: {
            type: DataTypes.STRING,
            allowNull: true
        },

        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },

        assigned_to: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        }

    }, {
        timestamps: true,
        tableName: 'tickets',
        createdAt: "created_at",
        updatedAt: "updated_at",
    });

    // ✅ Associations
    Ticket.associate = (models) => {
        Ticket.belongsTo(models.User, {
            foreignKey: 'created_by',
            as: 'creator'
        });

        Ticket.belongsTo(models.User, {
            foreignKey: 'assigned_to',
            as: 'assignee'
        });
    };

    return Ticket;
};