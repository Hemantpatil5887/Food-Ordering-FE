import { React, useState, useEffect } from 'react';
// import './/Dashboard.scss';
import '../Dashboard/Dashboard.scss'
import { getRequestAsync, postRequestAsync } from '../../common/genericAPIs';
import { Spinner, Row, Col, Form, Button, Toast } from 'react-bootstrap';
import { setStorage, getStorage } from '../../utils/storage';
import { useDispatch } from 'react-redux';
import { setBadge, setDisplayName, setSnackbar } from '../../store/common';
function Carts() {
    const dispatch = useDispatch();
    const [cartsItems, setCartsItems] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [total, setTotal] = useState(false);
    const [toast, setToast] = useState("");
    useEffect(() => {
        const carts = JSON.parse(getStorage('carts')) || [];
        setCartsItems(carts);
        let countTotal = 0;
        carts && carts.length && carts.map((item) => {
            countTotal = countTotal + item.price;
            countTotal = parseFloat(countTotal.toFixed(2));
        });
        setTotal(countTotal);
    }, [])
    const spinnerView = () => {
        return (<>
            <div className='absolute-spinner'>
                <Spinner animation="border" className="spinner" />
            </div>
        </>)

    }

    const remove = (id) => {
        const carts = JSON.parse(getStorage('carts')) || [];
        const updatedData = carts && carts.length && carts.filter(item => item.item_id !== id);
        let countTotal = 0;
        updatedData.length && updatedData.map((item) => {
            countTotal = countTotal + item.price;
            countTotal = parseFloat(countTotal.toFixed(2));
        });
        setTotal(countTotal);
        dispatch(setBadge(updatedData.length))
        setCartsItems(updatedData);
        setStorage('carts', JSON.stringify(updatedData));

    };

    const orderNow = async (cartsItems) => {
        try {
            
            const checkUserLogIN = await getRequestAsync('/auth/check/success');
            setStorage('displayName', checkUserLogIN.data.DisplayName);
            dispatch(setDisplayName(checkUserLogIN.data.DisplayName));
            const orders = await postRequestAsync('/Carts/add',{"orders":cartsItems});
            setToast("Order successfully placed");
            setTimeout(()=>{setToast("")},1000);
        } catch (error) {
            console.log(error);
            setToast("Something went wrong");
            setTimeout(()=>{setToast("")},1000);
        }

    };
    const  ToastView = () =>  {
        return (
          <Toast className='toastView'>
            <Toast.Body>{toast}</Toast.Body>
          </Toast>
        );
      }
    const cartView = () => {
        return (
            <>
                <div className='menus carts' key={1}>
                    {
                        cartsItems && cartsItems.length && cartsItems.map((menuItem, index) => {
                            const image = menuItem?.image_url;
                            return (
                                <Row key={`ROW_${index}`}>
                                    <Col className='menuItem' key={index}>
                                        <div className='remove' onClick={() => { remove(menuItem.item_id) }}>X</div>
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
                                        </div>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </div>
                <div className='priceing'>
                    <div className='bill'>Bill Details</div>
                    {
                        cartsItems && cartsItems.length && cartsItems.map((menuItem, index) => {
                            return (
                                <>
                                    <div className='items'>
                                        <span className='nameOfItem'>{menuItem.name}</span>
                                        <span className='priceOfItem'> - &#8377; {menuItem.price}</span>
                                    </div>
                                </>
                            )
                        })
                    }
                    <div className='totalCount'>
                        <div className='divider'></div>
                        <div className='items'>
                            <span className='nameOfItem'>Item Total</span>
                            <span className='priceOfItem'> - &#8377; {total}</span>
                        </div>
                        <div className='items'>
                            <span className='nameOfItem'>TO PAY</span>
                            <span className='priceOfItem'> - &#8377; {total}</span>
                        </div>
                        <Button className='order' onClick={() => { orderNow(cartsItems) }}>Order Now</Button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="center-container dashboard-container">
            {spinner && spinnerView()}
            <div>
                {
                    !cartsItems.length ? (
                        <div className="denger">No Found </div>
                    ) : cartView()
                }
            </div>
            {
                toast && ToastView()
            }
        </div>
    );
}

export default Carts;
