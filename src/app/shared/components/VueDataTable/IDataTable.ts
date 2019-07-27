export interface IDataTableHeader {
  [key: string]: IDataTableHeaderItem;
}

export interface IDataTableHeaderItem {
  title?: string;
  visible?: boolean;
  sortKey?: string;
  slot?: string;
  sortable?: boolean;
}

export interface IComputedDataRowCell {
  key: string;
  value: any;
  visible: boolean;
  slot?: string;
}
