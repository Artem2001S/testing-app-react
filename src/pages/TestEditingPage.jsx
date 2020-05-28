import React from 'react';
import TestEditingContainer from 'containers/TestEditing/TestEditingContainer';
import withUserAuthentication from 'components/hoc/withUserAuthentication';
import UserPanelContainer from 'containers/UserPanelContainer';

function TestEditingPage() {
  return (
    <>
      <UserPanelContainer />
      <TestEditingContainer />
    </>
  );
}

export default withUserAuthentication(TestEditingPage, true);
