import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './DropDown.module.scss';

export default function DropDown({ items, current, label, onChange }) {
  const [isDropped, setIsDropped] = useState(false);

  const listClasses = classNames(classes.List, {
    [classes.Dropped]: isDropped,
  });

  const hide = () => setIsDropped(false);

  useEffect(() => {
    if (isDropped) {
      document.addEventListener('click', hide);
    }

    return () => {
      document.removeEventListener('click', hide);
    };
  }, [isDropped]);

  return (
    <div className={classes.DropDown}>
      {label}
      <div className={classes.Header}>
        <div className={classes.Title}>{current}</div>
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
            className={classNames(classes.Item, {
              [classes.Active]: item === current,
            })}
            onClick={() => {
              if (item !== current) {
                onChange(item);
                hide();
              }
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
  label: PropTypes.string,
  items: PropTypes.array.isRequired,
  current: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
