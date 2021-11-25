const { Sale, User, SaleProduct, Product } = require('../database/models');

const updateStatusIncoming = async (statusIo, id) => {
  await Sale.update({ status: statusIo }, { where: { id }});
  const saleItens = [];
  const { dataValues: { 
    userId, saleDate, status, sellerId, totalPrice } } = await Sale.findOne({ where: { id } });
  const searchUser = await User.findOne({ where: { id: userId } });
  const sellerName = await User.findOne({ where: { id: sellerId } });
  const saleProds = await SaleProduct.findAll({ where: { saleId: id } });
  const searchProds = await Product.findAll();
  saleProds.forEach(({ productId, quantity }) => {
    const { name, price } = searchProds.find((prod) => prod.id === productId);
    const obj = { name, unitPrice: price, subTotal: price * quantity, quantity };
    saleItens.push(obj);
  });
  const saleObj = {
    id, userName: searchUser.name, sellerName: sellerName.name, saleDate, status, totalPrice, saleItens };

  return saleObj;
};

module.exports = { updateStatusIncoming };
