import React from 'react';
import Button from 'components/UIElements/Button/Button';

function PaginationBtn({ className, number, isDisabled, onClick }) {
  return (
    <Button disabled={isDisabled} transparent handleClick={onClick}>
      <div className={className}>{number}</div>
    </Button>
  );
}

export default React.memo(PaginationBtn);
