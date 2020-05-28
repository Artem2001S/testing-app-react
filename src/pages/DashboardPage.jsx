import React from 'react';
import DashboardContainer from 'containers/DashboardContainer';
import withUserAuthentication from 'components/hoc/withUserAuthentication';
import UserPanel from 'components/UserPanel/UserPanel';

function DashboardPage() {
  return (
    <>
      <UserPanel />
      <DashboardContainer />
    </>
  );
}

export default withUserAuthentication(DashboardPage);
