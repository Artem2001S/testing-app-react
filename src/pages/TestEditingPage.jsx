import React from 'react';
import TestEditingContainer from 'containers/TestEditing/TestEditingContainer';
import withUserAuthentication from 'components/hoc/withUserAuthentication';
import UserPanel from 'components/UserPanel/UserPanel';

function TestEditingPage() {
  return (
    <>
      <UserPanel />
      <TestEditingContainer />
    </>
  );
}

export default withUserAuthentication(TestEditingPage, true);
