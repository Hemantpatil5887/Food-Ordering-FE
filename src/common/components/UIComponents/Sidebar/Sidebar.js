import { React, useEffect, useRef } from 'react';
import './Sidebar.scss';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import apiConfigDetails from '../../../../config/api.config';
import { setLoader, setSnackbar } from '../../../../store/common';
import { setStorage, getStorage } from '../../../../utils/storage';

function Sidebar({
    showSidebar, classes = {}, toggleSidebar, children
}) {
    const sidebar = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        sidebar.current.style.width = showSidebar ? '250px' : '0px';
    }, [showSidebar]);
    const switchRegion = async (regions) => {
        try {
            dispatch(setLoader(true));
            setStorage("region", regions);
            dispatch(setSnackbar({ type: 'success', message: `Switched to ${regions} region` }));
            dispatch(setLoader(false));
            setTimeout(() => {
                window.location.href = apiConfigDetails.dashboard;
            }, 3000);
        } catch (e) {
            dispatch(setLoader(false));
            dispatch(setSnackbar({ type: 'error', message: e.message }));
        }
    };

    return (
        <>
            <div className="headerdiv">
                <div className="open-btn" onClick={toggleSidebar} aria-hidden="true">
                    &#9776;
                </div>
            </div>
            {/* <div ref={sidebar} className={`sidebar-container ${classes.container || ''}`}>
                <button type="button" className="close-btn" onClick={toggleSidebar}>
                    &times;
                </button>
                <Link to="/" onClick={toggleSidebar}>
                </Link>
                {children}
            </div> */}
        </>
    );
}

export default Sidebar;
