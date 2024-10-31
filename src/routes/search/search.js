import { React, useState, useEffect } from 'react';
import '../Dashboard/Dashboard.scss'
import { getRequestAsync } from '../../common/genericAPIs';
import { Spinner, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setStorage, getStorage } from '../../utils/storage';
import { setBadge } from '../../store/common';

function Search() {
    const dispatch = useDispatch();
    const [searchMenu, setSearchMenu] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [searchItem, setSearchItem] = useState("");
    const spinnerView = () => {
        return (<>
            <div className='absolute-spinner'>
                <Spinner animation="border" className="spinner" />
            </div>
        </>)

    }

    const handleOnChange = async (e, key) => {
        setSearchItem((val) => ({
            ...val,
            [key]: e.target.value
        }));

        try {
            let query = "";
            if (searchItem?.name?.length) {
                query = `name=${searchItem.name}`
            }
            if (searchItem?.type?.length) {
                query += query.length ? `&type=${searchItem.type}` : `type=${searchItem.type}`;
            }
            if (query) {
                setSpinner(true);
                const response = await getRequestAsync(`/Menu/all?${query}`);
                setSearchMenu(response?.data || [])
                setSpinner(false);
            }

        } catch (e) {
            setSpinner(false);
            setSearchMenu([])
        }
    };
    const addToCart = async (item) => {
        const carts = getStorage('carts'); 
        const cartsList = carts ? JSON.parse(carts) : [];
        cartsList.push({
            ...item,
            userName: getStorage('displayName')
        });
        setStorage('carts', JSON.stringify(cartsList))
        dispatch(setBadge(cartsList.length))

    };

    return (
        <div className="center-container dashboard-container">
            {spinner && spinnerView()}
            <div className='searchBox'>
                <div className='left'>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search for food"
                            aria-describedby="basic-addon2"
                            onChange={(e) => {
                                handleOnChange(e, "name");
                            }}
                        />
                    </InputGroup>
                </div>
                <div className='right'>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search by type"
                            aria-describedby="basic-addon2"
                            onChange={(e) => {
                                handleOnChange(e, "type");
                            }}
                        />
                    </InputGroup>
                </div>
            </div>
            <div className='menus'>
                <Row>
                    {
                        searchMenu && searchMenu.length ? searchMenu.map((menuItem, index) => {
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
                                        <Button className='cartBtn' onClick={()=> {addToCart(menuItem)}}> Add to Cart</Button>
                                    </div>
                                </Col>

                            )
                        })
                            : <>{
                                (<div className="denger">No Found </div>)
                            }</>
                    }
                </Row>
            </div>
        </div>
    );
}

export default Search;
