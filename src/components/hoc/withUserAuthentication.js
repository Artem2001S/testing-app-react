import React, { useEffect, useState } from 'react';
import { getCurrentUserData } from 'redux/api/userOperations';
import { useDispatch } from 'react-redux';
import {
  startApiRequest,
  finishApiRequest,
  changeIsAuthorizedStatus,
  signIn,
} from 'redux/actions/actionCreators';
import { Link } from 'react-router-dom';

export default function withUserAuthentication(
  WrappedComponent,
  needToCheckAdmin
) {
  return function (props) {
    const dispatch = useDispatch();

    const [authorizationInfo, setAuthorizationInfo] = useState({});
    const [isDataReceived, setIsDataReceived] = useState(false);

    useEffect(() => {
      dispatch(startApiRequest());

      getCurrentUserData().then((authInfo) => {
        dispatch(finishApiRequest());
        setAuthorizationInfo(authInfo);
        setIsDataReceived(true);

        if (!authInfo.isAuthorized) {
          dispatch(changeIsAuthorizedStatus(false));
        } else {
          dispatch(signIn(authInfo.user));
        }
      });
    }, [dispatch]);

    if (!isDataReceived) {
      return <></>;
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
