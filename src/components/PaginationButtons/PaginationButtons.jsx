import React from 'react';
import PropTypes from 'prop-types';
import classes from './PaginationButtons.module.scss';
import Button from 'components/UIElements/Button/Button';

export default function PaginationButtons({
  totalCount,
  currentPage,
  onItemClick,
}) {
  return (
    <div className={classes.Pagination}>
      {[...Array(totalCount)].map((_, index) => (
        <div key={index} className={classes.PaginationItem}>
          <Button
            disabled={currentPage === index + 1}
            transparent
            handleClick={() => onItemClick(index + 1)}
          >
            {currentPage === index + 1 ? (
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
  currentPage: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

PaginationButtons.defaultProps = {
  totalCount: 1,
  currentPage: 1,
  onItemClick: () => {},
};
