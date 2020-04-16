import React from 'react';
import PropTypes from 'prop-types';
import classes from './PaginationButtons.module.scss';
import Button from 'components/Button/Button';

export default function PaginationButtons({
  totalCount,
  current,
  onItemClick,
}) {
  const arr = new Array(totalCount).fill(1);

  return (
    <div className={classes.Pagination}>
      {arr.map((_, index) => (
        <div key={index} className={classes.PaginationItem}>
          <Button
            disabled={current === index + 1}
            transparent
            handleClick={onItemClick.bind(this, index + 1)}
          >
            {current === index + 1 ? (
              <div className={classes.Current}>{index + 1}</div>
            ) : (
              index + 1
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}

PaginationButtons.propTypes = {
  totalCount: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

PaginationButtons.defaultProps = {
  totalCount: 1,
  current: 1,
  onItemClick: () => {},
};
