// --------------------------------------------------------------------------------Empty Rows
<div>
{emptyRows.map((item, index) => (
  <div key={index} className="grid grid-cols-12 shadow gap-0 gap-y-0 h-8 border">
    <div className="my-border-left my-center border">
      <input
        type="text"
        name="Sno"
        value={index + 1}
        readOnly
        className="w-full h-6"
        placeholder=""
      />
    </div>
    <div className="my-border-left my-center col-span-6 border">
      <input
        type="text"
        name="description"
        value={item.name}
        readOnly
        className="w-full h-6"
        placeholder=""
      />
    </div>
    <div className="my-border-left my-center border">
      <input
        type="text"
        name="pack"
        value={item.pack}
        readOnly
        className="w-full h-6"
        placeholder=""
      />
    </div>
    <div className="my-border-left my-center border">
      <input
        type="text"
        name="hsn"
        value={item.hsn}
        readOnly
        className="w-full h-6"
        placeholder=""
      />
    </div>
    <div className="my-border-left my-center border">
      <input
        type="text"
        name="qty"
        value={item.qty}
        readOnly
        className="w-full h-6"
        placeholder=""
      />
    </div>
    <div className="my-border-left my-center border">
      <input
        type="text"
        name="rate"
        value={item.rate}
        readOnly
        className="w-full"
        placeholder=""
      />
    </div>
    <div className="my-border-left my-center border">
      <input
        type="text"
        name="amount"
        value={item.amount}
        readOnly
        className="w-full h-6"
        placeholder="Amount"
      />
    </div>
  </div>
))}
</div>