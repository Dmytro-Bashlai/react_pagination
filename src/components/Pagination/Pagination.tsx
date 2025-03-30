import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageCount);

  function handlePageChange(page: number) {
    if (page !== currentPage) {
      onPageChange(page);
    }
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < pageCount) {
      handlePageChange(currentPage + 1);
    }
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`?page=${currentPage - 1}&perPage=${perPage}`}
          aria-disabled={currentPage === 1}
          onClick={e => {
            e.preventDefault();
            handlePrevPage();
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => {
        return (
          <li
            key={page}
            className={cn('page-item', { active: page === currentPage })}
            onClick={e => {
              e.preventDefault();
              handlePageChange(page);
            }}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`?page=${page}&perPage=${perPage}`}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li className={cn('page-item', { disabled: currentPage === pageCount })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href={`?page=${currentPage + 1}&perPage=${perPage}`}
          aria-disabled={currentPage === pageCount}
          onClick={e => {
            e.preventDefault();
            handleNextPage();
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
