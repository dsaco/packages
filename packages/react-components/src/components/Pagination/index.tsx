import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const BEFORE = 'BEFORE';
const AFTER = 'AFTER';

type PaginationProps = {
  total?: number;
  pageSize?: number;
  siblingCount?: number;
  boundaryCount?: number;
};

type TypePagination = React.FC<PaginationProps>;

const StyledUl = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;

  .before-after {
    min-width: 28px;
    height: 28px;
    margin-right: 10px;
    font-size: 12px;
    line-height: 28px;
    color: rgb(black 0.25);
    text-align: center;
    cursor: pointer;
    user-select: none;
    border-radius: 3px;
    transition: color 250ms, border-color 250ms;

    &::before {
      content: '•••';
    }

    &:hover {
      &::before {
        font-size: 14px;
        color: #1890ff;
        content: attr(data-place);
      }
    }
  }

  .item {
    &:not(:last-child) {
      margin-right: 10px;
    }

    min-width: 28px;
    height: 28px;
    font-size: 14px;
    line-height: 28px;
    color: #333;
    text-align: center;
    cursor: pointer;
    user-select: none;
    border: 1px solid #ccc;
    border-radius: 3px;
    transition: color 250ms, border-color 250ms;

    &-active,
    &:hover {
      color: #1890ff;
      border-color: #40a9ff;
    }

    &.disabled {
      color: #ccc;
      cursor: not-allowed;
      border-color: #ccc;
    }
  }
`;

export const Pagination: TypePagination = (props = {}) => {
  const {
    total = 0,
    pageSize = 10,
    siblingCount = 2,
    boundaryCount = 1,
  } = props;

  const [current, setCurrent] = useState(1);
  const pageCount = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize]
  );

  const pages = useMemo(() => {
    const _pages: (string | number)[] = [];

    for (let i = 1; i < 1 + boundaryCount; i++) {
      _pages.push(i);
    }

    if (current - siblingCount > 1 + boundaryCount) {
      _pages.push(BEFORE);
    }

    for (let i = 0; i < siblingCount * 2 + 1; i++) {
      const _i = current - siblingCount + i;
      if (_i >= 1 + boundaryCount && _i < pageCount - boundaryCount) {
        _pages.push(_i);
      }
    }

    // for (let i = current - siblingCount; i <= current + siblingCount; i++) {
    //   if (i >= 1 + boundaryCount && i < pageCount - boundaryCount) {
    //     _pages.push(i);
    //   }
    // }
    if (current + siblingCount < pageCount - boundaryCount) {
      _pages.push(AFTER);
    }
    for (let i = pageCount - boundaryCount + 1; i <= pageCount; i++) {
      _pages.push(i);
    }

    return _pages;
  }, [total, pageSize, current, siblingCount]);

  const _setCurrent = (_current: number) => {
    setCurrent(_current);
    // onChange && onChange(_current);
  };
  return (
    <StyledUl>
      <li
        onClick={() => {
          if (current !== 1) {
            _setCurrent(current - 1);
          }
        }}
        className={`item ${current === 1 ? 'disabled' : ''}`}
      >
        &lt;
      </li>
      {pages.map((page) => {
        if (page === BEFORE) {
          return (
            <li
              onClick={() => {
                _setCurrent(Math.max(current - 5, 0));
              }}
              data-place="«"
              className="before-after"
              key={page}
            ></li>
          );
        } else if (page === AFTER) {
          return (
            <li
              onClick={() => {
                _setCurrent(Math.min(current + 5, pageCount));
              }}
              data-place="»"
              className="before-after"
              key={page}
            ></li>
          );
        } else {
          return (
            <li
              onClick={() => _setCurrent(page as number)}
              className={`item ${current === page ? 'item-active' : ''}`}
              key={page}
            >
              {page}
            </li>
          );
        }
      })}
      <li
        onClick={() => {
          if (current !== pageCount) {
            _setCurrent(current + 1);
          }
        }}
        className={`item ${current === pageCount ? 'disabled' : ''}`}
      >
        &gt;
      </li>
    </StyledUl>
  );
};
