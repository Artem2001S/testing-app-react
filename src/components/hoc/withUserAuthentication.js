import React, { useEffect, useState } from 'react';
import { getCurrentUserData } from 'redux/api/userOperations';
import {
  startApiRequest,
  finishApiRequest,
  changeIsAuthorizedStatus,
  signIn,
} from 'redux/actions/actionCreators';
import { Link } from 'react-router-dom';
import { useAction } from 'hooks/useAction';

export default function withUserAuthentication(
  WrappedComponent,
  needToCheckAdmin
) {
  return function (props) {
    const onStartRequest = useAction(startApiRequest);
    const onFinishRequest = useAction(finishApiRequest);
    const onChangeIsAuthorizedStatus = useAction(changeIsAuthorizedStatus);
    const onSignIn = useAction(signIn);

    const [authorizationInfo, setAuthorizationInfo] = useState({});
    const [isDataReceived, setIsDataReceived] = useState(false);

    useEffect(() => {
      onStartRequest();

      getCurrentUserData().then((authInfo) => {
        onFinishRequest();
        setAuthorizationInfo(authInfo);
        setIsDataReceived(true);

        if (!authInfo.isAuthorized) {
          onChangeIsAuthorizedStatus(false);
        } else {
          onSignIn(authInfo.user);
        }
      });
    }, [onChangeIsAuthorizedStatus, onFinishRequest, onSignIn, onStartRequest]);

    if (!isDataReceived) {
      return <div>Проверка пользователя...</div>;
    }

    if (!authorizationInfo.isAuthorized) {
      return (
        <div>
          <h2>You are not logged in.</h2>
          <div>
            <Link to="/registration">Go to registration</Link>
          </div>
          <div>
            <Link to="/">Go to authorization</Link>
          </div>
        </div>
      );
    }

    if (needToCheckAdmin && !authorizationInfo.isAdmin) {
      return (
        <>
          <h1>You're not an admin</h1>
          <div>
            <Link to="/dashboard">Go to dashboard</Link>
          </div>
        </>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
