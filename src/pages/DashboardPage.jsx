import React from 'react';
import DashboardContainer from 'containers/DashboardContainer';
import withUserAuthentication from 'components/hoc/withUserAuthentication';

function DashboardPage() {
  return <DashboardContainer />;
}

export default withUserAuthentication(DashboardPage);
