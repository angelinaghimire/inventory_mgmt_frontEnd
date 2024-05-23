interface Intransactionitem {
  id?: Number;
  intransaction_id: Number;
  product_id: Number;
  quantity: Number;
  unit: String;
  unit_price?: Number;
  total_price?: Number;
  remark?: String;
}

export default Intransactionitem;
