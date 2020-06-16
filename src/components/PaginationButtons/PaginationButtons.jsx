import React from 'react';
import PropTypes from 'prop-types';
import classes from './PaginationButtons.module.scss';
import PaginationBtn from './PaginationBtn';

function PaginationButtons({ totalCount, currentPage, onItemClick }) {
  return (
    <div className={classes.Pagination}>
      {[...Array(totalCount)].map((_, index) => (
        <div key={index} className={classes.PaginationItem}>
          <PaginationBtn
            className={currentPage === index + 1 ? classes.Current : ''}
            number={index + 1}
            isDisabled={currentPage === index + 1}
            onClick={() => onItemClick(index + 1)}
          />
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

export default React.memo(PaginationButtons, (prev, next) => {
  return (
    prev.currentPage === next.currentPage && prev.totalCount === next.totalCount
  );
});
