import { useMemo, useState } from 'react';

import { PageProvider, TableProviderSSR } from '@/providers';
import type { IPaginationQuery } from '@/types';
import PageInfo from '@/utils/pageInfo';
import renderSuspenseModals from '@/utils/renderSuspenseModals';
import type { Row } from '@tanstack/react-table';
import { SquarePen, Trash2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { DeleteModal } from '@/components/core/modal';

import { fieldVisitColumns } from '../hr/_config/columns';
import type { IManualEntryTableData } from '../hr/_config/columns/columns.type';
import { filedVisitFilters } from '../hr/_config/columns/facetedFilters';
import { useHrManualEntry2 } from '../hr/_config/query';

const TableSSR = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const params = { is_pagination: 'true' } as IPaginationQuery;
  searchParams.forEach((value, key) => ((params as any)[key] = value));

  const { data, pagination, isLoading, url, deleteData, refetch } =
    useHrManualEntry2<{
      data: IManualEntryTableData[];
    }>(params);

  const pageInfo = useMemo(
    () => new PageInfo('HR/Field Visit', url, 'admin__field_visit'),
    [url]
  );

  const [selectedFieldVisit, setSelectedFieldVisit] =
    useState<IManualEntryTableData>();

  const handleCreate = () => navigate('/hr/field-visit/add');

  const handleUpdate = (row: Row<IManualEntryTableData>) => {
    navigate(`/hr/field-visit/${row.original.uuid}/update`);
  };

  const [deleteItem, setDeleteItem] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleDelete = (row: Row<IManualEntryTableData>) => {
    setDeleteItem({
      id: row?.original?.uuid,
      name: row?.original?.employee_uuid,
    });
  };

  const columns = fieldVisitColumns({
    selectedFieldVisit,
    setSelectedFieldVisit,
  });

  return (
    <PageProvider
      pageName={pageInfo.getTab()}
      pageTitle={pageInfo.getTabName()}
    >
      <TableProviderSSR
        start_date={
          params.start_date ? new Date(params.start_date) : new Date()
        }
        end_date={params.end_date ? new Date(params.end_date) : new Date()}
        title={pageInfo.getTitle()}
        columns={columns}
        data={data?.data ?? []}
        pagination={pagination!}
        isLoading={isLoading}
        handleCreate={handleCreate}
        handleRefetch={refetch}
        defaultVisibleColumns={{
          remarks: false,
          updated_at: false,
          created_by_name: false,
          created_at: false,
        }}
        filterOptions={filedVisitFilters}
        actions={[
          {
            label: 'Edit',
            Icon: SquarePen,
            action: handleUpdate,
            actionType: 'edit',
          },
          {
            label: 'Delete',
            Icon: Trash2,
            action: handleDelete,
            actionType: 'delete',
          },
        ]}
      >
        {renderSuspenseModals([
          <DeleteModal
            {...{
              deleteItem,
              setDeleteItem,
              url: '/hr/manual-entry',
              deleteData,
            }}
          />,
        ])}
      </TableProviderSSR>
    </PageProvider>
  );
};

export default TableSSR;
