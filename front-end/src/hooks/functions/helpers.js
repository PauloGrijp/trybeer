import { formatManipulatePrice, formatSaveAndRenderPrice } from '../../helpers/functions';

export function sumTotalPrice(sales) {
  const totalSales = sales
    .reduce((acc, cur) => acc + (
      cur.quantity * formatManipulatePrice(cur.unitPrice)
    ), 0);

  const formatedTotal = formatSaveAndRenderPrice(totalSales.toFixed(2));

  return formatedTotal;
}

export function updateOrders(orders, data, setOrders) {
  const updateStatusOrder = [...orders];
  const findOrder = updateStatusOrder.findIndex((order) => order.id === data.id);
  if (findOrder >= 0) {
    updateStatusOrder[findOrder] = data;
    setOrders(updateStatusOrder);
  }
}

export function updateSingleOrder(sigleOrder, data, setSingleOrder) {
  const updateStatusOrder = { ...sigleOrder };
  updateStatusOrder.status = data.status;
  setSingleOrder(updateStatusOrder);
}
