import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from './invoiceSlice';

export default function Desctable() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.invoice.items);

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItem = { ...items[index], [name]: value };
    if (name === 'rate' || name === 'qty') {
      updatedItem.amount = updatedItem.rate * updatedItem.qty;
    }
    dispatch(updateItem({ index, item: updatedItem }));
  };

  return (
    <div>
    <div className="grid grid-cols-12  gap-y-0 mt-12 my-border">
  <div className=" my-center h-8 ">S.No</div>
  <div className=" my-center h-8 col-span-6 mb-3">Description</div>
  <div className=" my-center h-8 mb-3">Pack</div>
  <div className=" my-center h-8 mb-3">HSN</div>
  <div className=" my-center h-8 mb-3">Qty</div>
  <div className=" my-center h-8 mb-3">Rate</div>
  <div className=" my-center h-8 mb-3">Amount</div>
</div>

      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-12 shadow gap-0 gap-y-0 h-8 border">
          <div className="my-border-left my-center border">
            <input
              type="text"
              name="item1"
              value={item.item1}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full h-6"
              placeholder=""
            />
          </div>
          <div className="my-border-left my-center col-span-6 border">
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full h-6"
              placeholder=""
            />
          </div>
          <div className="my-border-left my-center border">
            <input
              type="text"
              name="pack"
              value={item.pack}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full h-6"
              placeholder=""
            />
          </div>
          <div className="my-border-left my-center border">
            <input
              type="text"
              name="hsn"
              value={item.hsn}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full h-6"
              placeholder=""
            />
          </div>
          <div className="my-border-left my-center border">
            <input
              type="text"
              name="qty"
              value={item.qty}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full h-6"
              placeholder=""
            />
          </div>
          <div className="my-border-left my-center border">
            <input
              type="text"
              name="rate"
              value={item.rate}
              onChange={(e) => handleItemChange(index, e)}
              className="w-full "
              placeholder=""
            />
          </div>
          <div className="my-border-left my-center border">
            <input
              type="text"
              name="amount"
              value={item.amount > 0 ? item.amount : ""}
              readOnly
              className="w-full h-6"
              placeholder={item.amount === 0 ? "" : undefined}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
