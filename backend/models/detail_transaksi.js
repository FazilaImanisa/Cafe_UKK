'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi detail_transaksi -> transaksi (child -> parent)
      // key : id_transaksi
      // parent : transaksi, child: detail_transaksi
      // tipe : 1 meja bisa melakukan banyak transaksi (1 to many)
      this.belongsTo(models.transaksi,{
        foreignKey:"id_transaksi",
        as:"transaksi"
      })

      this.belongsTo(models.menu,{
        foreignKey:"id_menu",
        as:"menu"
      })
    }
  }
  detail_transaksi.init({
    id_detail_transaksi:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    id_transaksi: DataTypes.INTEGER,
    id_menu: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    bayar: DataTypes.INTEGER,
    kembalian: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detail_transaksi',
    tableName: 'detail_transaksi',
    freezeTableName:true
  });
  return detail_transaksi;
};