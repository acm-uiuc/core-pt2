const role = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      extra: {
          type: DataTypes.JSONB,
          unique: false,
          allowNull: true,
      }
    });
    return Role;
  };
  
  export default role;