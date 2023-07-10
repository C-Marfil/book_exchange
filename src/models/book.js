module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: "We need the book title",
        },
        notEmpty: {
          args: [true],
          msg: "Book title cannot be empty",
        },
      },
    },
    reason: DataTypes.STRING,
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  };

  const BookModel = connection.define("Book", schema, {
    timestamps: false,
  });

  return BookModel;
};
