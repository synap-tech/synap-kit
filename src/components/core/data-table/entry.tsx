import { TableProvider } from '@/providers';
import type { ITableProviderProps } from '@/providers/table-provider';

const DataTableEntry = <TData, TValue>(
  props: Pick<
    ITableProviderProps<TData, TValue>,
    | 'title'
    | 'columns'
    | 'data'
    | 'toolbarOptions'
    | 'defaultVisibleColumns'
    | 'otherToolBarComponents'
    | 'handleRefetch'
    | 'enableDefaultColumns'
    | 'isLoading'
  > & { children?: React.ReactNode }
) => {
  const { children, ...rest } = props;
  return (
    <TableProvider isEntry enableRowSelection={false} actions={[]} {...rest}>
      {children}
    </TableProvider>
  );
};

export default DataTableEntry;
