import React from 'react';
import DashboardContainer from 'containers/DashboardContainer';
import withUserAuthentication from 'components/hoc/withUserAuthentication';
import UserPanelContainer from 'containers/UserPanelContainer';

function DashboardPage() {
  return (
    <>
      <UserPanelContainer />
      <DashboardContainer />
    </>
  );
}

export default withUserAuthentication(DashboardPage);
