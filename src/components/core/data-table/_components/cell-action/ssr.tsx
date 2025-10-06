import type { CellContext } from '@tanstack/react-table';

import useTableSSR from '@/hooks/useTableSSR';

import ActionsUI from './actions-ui';

function CellActionSSR<TData, TValue>({
  info,
}: {
  info: CellContext<TData, TValue>;
}) {
  const row = info.row;
  const { actions } = useTableSSR();

  return <ActionsUI actions={actions} row={row} />;
}

export default CellActionSSR;
