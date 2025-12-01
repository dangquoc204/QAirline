// models/posts.js
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
      image: DataTypes.STRING,
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: DataTypes.TEXT,
      cta: DataTypes.STRING,
      post_type: {
        type: DataTypes.ENUM("introduction", "promotion", "announcement", "news"),
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true, // Cho phép giá trị null nếu không có ngày bắt đầu
      }, 
      end_date: { 
        type: DataTypes.DATE,
        allowNull: true, // Cho phép giá trị null nếu không có ngày kết thúc
      },
      is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      tableName: "posts", // Tên bảng trong cơ sở dữ liệu
      timestamps: true, // Tự động thêm createdAt và updatedAt
    });
  
    Post.associate = function (models) {
      Post.belongsTo(models.Admin, { foreignKey: "admin_id" });
    };
  
    return Post;
  };
