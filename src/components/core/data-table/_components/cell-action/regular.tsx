import type { CellContext } from '@tanstack/react-table';

import useTable from '@/hooks/useTable';

import ActionsUI from './actions-ui';

function CellActionRegular<TData, TValue>({
  info,
}: {
  info: CellContext<TData, TValue>;
}) {
  const row = info.row;
  const { actions } = useTable();

  return <ActionsUI actions={actions} row={row} />;
}

export default CellActionRegular;
