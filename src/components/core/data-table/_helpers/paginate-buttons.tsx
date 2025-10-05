import ReactPaginate from 'react-paginate';

import { buttonVariants } from '@/components/ui/button';

interface IPaginatedProps {
  totalPages: number;
  onChange: (page: number) => void;
  currentPage: number;
}

function PaginateButtons({
  totalPages,
  onChange,
  currentPage,
}: IPaginatedProps) {
  const handlePageClick = (event: any) => {
    onChange(event.selected);
  };

  return (
    <ReactPaginate
      forcePage={currentPage}
      pageLinkClassName={buttonVariants({
        variant: 'ghost',
        size: 'icon-lg',
        className: 'cursor-pointer',
      })}
      activeLinkClassName={buttonVariants({
        variant: 'outline',
        size: 'icon-lg',
      })}
      previousClassName='hidden'
      nextClassName='hidden'
      containerClassName='flex gap-x-1 items-stretch'
      breakLabel='...'
      onPageChange={handlePageClick}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
    />
  );
}

export default PaginateButtons;
