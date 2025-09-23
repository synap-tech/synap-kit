import type { CellContext } from '@tanstack/react-table';

import CellActionRegular from './regular';
import CellActionSSR from './ssr';

interface ITableCellActionProps<TData, TValue> {
  info: CellContext<TData, TValue>;
  isSSR?: boolean;
}

function TableCellAction<TData, TValue>({
  info,
  isSSR,
}: ITableCellActionProps<TData, TValue>) {
  if (isSSR) {
    return <CellActionSSR info={info} />;
  }
  return <CellActionRegular info={info} />;
}

export default TableCellAction;
