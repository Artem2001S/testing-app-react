import React from 'react';
import { Redirect } from 'react-router-dom';
import classes from './Dashboard.module.scss';
import UserPanel from 'components/UserPanel/UserPanel';

export default function Dashboard({ userData }) {
  if (!userData.isAuthorized) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <UserPanel userData={userData} />
      Dashboard
    </div>
  );
}
