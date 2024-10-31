import { React, useState, useEffect } from 'react';
import './Dashboard.scss';
import { getRequestAsync } from '../../common/genericAPIs';
import { Spinner, Row, Col, Button } from 'react-bootstrap';
import { setStorage, getStorage } from '../../utils/storage';
import { useDispatch } from 'react-redux';
import { setBadge } from '../../store/common';


function Dashboard() {
    const dispatch = useDispatch();
    const [menu, setMenu] = useState([]);
    // const [hotels, setHotels] = useState([]);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        getAllMenu()
    }, []);

    const spinnerView = () => {
        return (<>
            <div className='absolute-spinner'>
                <Spinner animation="border" className="spinner" />
            </div>
        </>)

    };

    const addToCart = async (item) => {
        const cartsList = JSON.parse(getStorage('carts')) || [];
        cartsList.push({
            ...item,
            userName: getStorage('displayName')
        });
        setStorage('carts', JSON.stringify(cartsList))
        dispatch(setBadge(cartsList.length))

    };

    const getAllMenu = async () => {
        try {
            setSpinner(true);
            const response = await getRequestAsync('/Menu/all');
            setMenu(response?.data || [])
            setSpinner(false);

        } catch (e) {
            setSpinner(false);
            history.replace('/');
        }
    };

    return (
        <div className="center-container dashboard-container">
            {spinner && spinnerView()}
            <div className='menus'>
                <Row>
                    {
                        menu && menu.length && menu.map((menuItem, index) => {
                            const image = menuItem?.image_url;
                            return (
                                <Col xs={4} className='menuItem' key={index}>
                                    <div className='left'>
                                        <div className='name'>{menuItem.name}</div>
                                        <div className='price'>&#8377;{` ${menuItem.price}`}</div>
                                        <div className='description'>{menuItem.description}</div>
                                        {/* <div className='type' >{menuItem.type}</div> */}
                                    </div>
                                    <div className='right'>
                                        {image ?
                                            <div className='imageOfMenu' style={{ backgroundImage: `url(${menuItem.image_url})` }}></div>
                                            : <div className='imageOfMenu'></div>
                                        }
                                        <Button className='cartBtn' onClick={() => { addToCart(menuItem) }}> Add to Cart</Button>
                                    </div>
                                </Col>

                            )
                        })
                    }
                </Row>
            </div>
        </div>
    );
}

export default Dashboard;
