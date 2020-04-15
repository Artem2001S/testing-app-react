import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './DropDown.module.scss';

export default function DropDown({ items, current, onChange }) {
  const [isDropped, setIsDropped] = useState(false);

  const listClasses = classNames(classes.List, {
    [classes.Dropped]: isDropped,
  });

  return (
    <div className={classes.DropDown}>
      <div className={classes.Header}>
        <div className={classes.Title}>item2</div>
        <div
          className={classes.Arrow}
          onClick={setIsDropped.bind(this, !isDropped)}
        >
          {isDropped ? '▲' : '▼'}
        </div>
      </div>
      <div className={listClasses}>
        {items.map((item) => (
          <div
            key={item}
            className={classes.Item}
            onClick={() => {
              onChange();
              setIsDropped(false);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

DropDown.propTypes = {
  items: PropTypes.array,
  current: PropTypes.string,
  onChange: PropTypes.func,
};
