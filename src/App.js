import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthorizedRoute from './AuthorizedRoute';
import Snackbar from './common/components/UIComponents/Snackbar/snackbar'

function App() {
    const dispatch = useDispatch();
    const snackbar = useSelector((state) => state.common.snackbar);
    return (
        <>
            {snackbar.message && (
                <Snackbar message="This is a Snackbar message!" onClose={() => setShowSnackbar(false)} />
            )}
            <Switch>
                <>
                    <Route path="/" component={AuthorizedRoute} />
                </>
            </Switch>
        </>
    );
}

export default App;
