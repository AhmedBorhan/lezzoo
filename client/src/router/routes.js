// @material-ui/icons
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// core components/views for Admin layout
import StoreView from '../views/store/Stores';
import AddStore from '../views/store/AddStore';

import ItemsView from '../views/items/Items';
import CategoryItems from '../views/items/CategoryItems';
import AddItem from '../views/items/AddItem';

import CategoryView from '../views/category/Categories';
import AddCategory from '../views/category/AddCategory';

const dashboardRoutes = [
	{
		path: '/',
		name: 'Stores',
		icon: StoreMallDirectoryIcon,
		component: StoreView,
		layout: '/nav',
		privilage: 'admin'
	},
		{
		path: '/add-store',
		name: 'Add store',
		component: AddStore,
		layout: '/',
		privilage: 'admin'
	},
	{
		path: '/items',
		name: 'Items',
		icon: ShoppingCartIcon,
		component: ItemsView,
		layout: '/nav',
		privilage: 'admin'
	},
		{
		path: '/items/:store/:category',
		name: 'Items',
		icon: ShoppingCartIcon,
		component: CategoryItems,
		layout: '/',
		privilage: 'admin'
	},
	{
		path: '/store/:store',
		name: 'Store categories',
		component: CategoryView,
		layout: '/',
		privilage: 'admin'
	},
	{
		path: '/add-item',
		name: 'Add Item',
		component: AddItem,
		layout: '/',
		privilage: 'admin'
	},
	{
		path: '/add-category',
		name: 'Add Category',
		component: AddCategory,
		layout: '/',
		privilage: 'admin'
	}
];

export default dashboardRoutes;
