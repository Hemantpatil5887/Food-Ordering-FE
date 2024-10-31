import React, { useState } from 'react';
// import './Login.scss';

import { deleteCookie, setStorage } from '../../utils/storage';
import { getRequestAsync, postRequestAsync } from '../../common/genericAPIs';

function Login() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});




    return (
        <div className="center-container login-container">
            {/* <div className="card login-card">
                <img className="login-image" alt="logo" />
                <Input
                    id="cookie"
                    name="cookie"
                    label="Please enter cookie"
                    value={values.cookie}
                    handleOnChange={(e) => { () => { } }}
                    className={{ formControl: "inlineInput mb10" }}
                />
                {errors?.cookie
                    ? <span className="mb10 error">{errors?.cookie}</span>
                    : null}
                <Button
                    handleOnClick={() => { () => { } }}
                    className="button button-primary"
                >
                    Set Cookie
                </Button>
            </div> */}
        </div>
    );
}

export default Login;
