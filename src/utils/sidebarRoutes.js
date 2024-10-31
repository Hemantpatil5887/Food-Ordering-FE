import Dashboard from '../routes/Dashboard';
import Search from '../routes/search';
import Carts from '../routes/carts';
import Login from '../routes/Login';
import User from '../routes/User';


export default [
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: Dashboard
    },
    {
        name: 'Search',
        path: '/search',
        component: Search
    },
    {
        name: 'Carts',
        path: '/carts',
        component: Carts
    },
    // {
    //     name: 'Login',
    //     path: '/login',
    //     component: Login
    // },
    // {
    //     name: 'User',
    //     path: '/user',
    //     component: User
    // }
    
    
]
