interface Intransaction {
  id?: Number;
  date: Date;
  supplier_id: Number;
  user_id: Number;
  remark?: String;
}

export default Intransaction;
