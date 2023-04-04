'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  menu.init({
    id_menu:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    nama_menu: DataTypes.STRING,
    jenis: {
      type: DataTypes.ENUM,
      values:['coffe','non_coffe','snacks','main_course','desserts','ice_cream']
    },
    deskripsi: DataTypes.STRING,
    gambar: DataTypes.STRING,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'menu',
    tableName: 'menu'
  });
  return menu;
};