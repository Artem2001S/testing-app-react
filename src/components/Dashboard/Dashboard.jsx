import React from 'react';
import { Redirect } from 'react-router-dom';
import classes from './Dashboard.module.scss';

export default function Dashboard({ userData }) {
  if (!userData.isAuthorized) {
    return <Redirect to="/" />;
  }
  return <div>Dashboard</div>;
}
