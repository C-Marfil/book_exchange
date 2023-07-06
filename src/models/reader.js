module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: [true],
          msg: "Please provide a name",
        },
        notEmpty: {
          args: [true],
          msg: "Name field cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          arg: [true],
          msg: "Please provide an email",
        },
        notEmpty: {
          args: [true],
          msg: "Email field cannot be empty",
        },
        isEmail: {
          args: [true],
          msg: "Please provide a valid email",
        },
      },
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };

  const ReaderModel = connection.define("Reader", schema, {
    timestamps: false,
  });

  return ReaderModel;
};
