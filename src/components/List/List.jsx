import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './List.module.scss';

export default function List({
  centered,
  vertical,
  smallMargin,
  children,
  ...attrs
}) {
  const listClasses = classNames(classes.List, {
    [classes.vertical]: vertical,
    [classes.centered]: centered,
    [classes.smallMargin]: smallMargin,
  });

  return (
    <div className={listClasses} {...attrs}>
      {children}
    </div>
  );
}

List.propTypes = {
  vertical: PropTypes.bool,
  centered: PropTypes.bool,
  smallMargin: PropTypes.bool,
  children: PropTypes.node,
};
