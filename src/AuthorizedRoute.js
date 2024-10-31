import {
    React, useEffect, useState, useRef, useContext
} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { getRequestAsync } from './common/genericAPIs';
import Dashboard from './routes/Dashboard/Dashboard';
import sidebarRoutes from './utils/sidebarRoutes';
import { getStorage, deleteCookie, removeStorage, setStorage } from './utils/storage';
import { Container, Spinner, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Login from './routes/Login';

function AuthorizedRoute(props) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [cartsCount, setCartsCount] = useState(0);
    const sideRef = useRef(null);
    const { location: { pathname } } = props;
    const { badge, displayName } = useSelector((state) => state.common);

    useEffect(() => {
        const getLoginDetails = async () => {
            try {
                const response = await getRequestAsync('/auth/check/success');
                if (response?.user?.DisplayName) {
                    setStorage(response.data.DisplayName);
                    if (sidebarRoutes.some((e) => e.path === history.location.pathname)) {
                        history.push(history.location.pathname || '');
                    } else {
                        history.replace('/');
                    }
                } else {

                }
                
            } catch (e) {
                console.error("error - ",e)
            }
        };
        const { location: { pathname } } = props;
        if (pathname === "/carts") {
            getLoginDetails();
        }
    }, []);

    const spinnerView = () => {
        return (<>
            <div className='absolute-spinner'>
                <Spinner animation="border" variant="primary" />
            </div>
        </>)

    }

    useEffect(()=>{
        let carts = getStorage('carts');
        carts = carts ? JSON.parse(carts) : [];
        // useDispatch(setBadge(carts.length));
         setCartsCount(carts.length);
    },[]);

    const logout = () => {
        if(getStorage('displayName')){
            deleteCookie('food')
            removeStorage('carts');
            removeStorage('displayname');
            window.location.href = '/'
        } else {
            window.location.href = '/'
        }
    }

    return (
        <>
            {
                pathname !== "/login" && <Nav
                    activeKey="/"
                    className='menu'
                >
                    <div className='left'>
                        <Nav.Item>
                            <Nav.Link href="/">Food Orders</Nav.Link>
                        </Nav.Item>
                    </div>
                    <div className='right'>
                        <Nav.Item>
                            <Nav.Link href="/search" >Search</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/carts">Cart <span className='badge'>{badge || cartsCount}</span></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/" onClick={() => { logout() }}>Sign {getStorage('displayName') ? 'Out' : 'In'}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='tagName'>
                            <Nav.Link eventKey="link-2">{displayName || getStorage('displayName')}</Nav.Link>
                        </Nav.Item>
                    </div>
                </Nav>

            }

            <Container>
                <main className="main-container" ref={sideRef}>
                    <Switch>
                        {sidebarRoutes.map((item) => (
                            <Route
                                key={item.name}
                                path={item.path}
                                component={item.component}
                                exact
                            />
                        ))}
                        <Route path="/login" component={Login} exact />
                        <Route path="/" component={Dashboard} exact />
                        <Route path="*" component={Dashboard} exact />
                    </Switch>
                </main>
                {spinner && spinnerView()}
            </Container>
        </>
    );
}

export default AuthorizedRoute;
