import React from 'react';
import TestEditingContainer from 'containers/TestEditing/TestEditingContainer';
import withUserAuthentication from 'components/hoc/withUserAuthentication';

function TestEditingPage() {
  return <TestEditingContainer />;
}

export default withUserAuthentication(TestEditingPage, true);
