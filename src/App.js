import React from 'react';
import { Provider } from 'react-redux';
import AuthPage from 'pages/AuthPage';
import store from 'redux/store';

function App() {
  return (
    <Provider store={store}>
      <AuthPage />
    </Provider>
  );
}

export default App;
