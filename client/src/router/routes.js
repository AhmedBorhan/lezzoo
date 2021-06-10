// @material-ui/icons
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// core components/views for Admin layout
import StoreView from '../views/store/Stores'
import AddStore from '../views/store/AddStore'
import ItemsView from '../views/items/Items'

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
		path: '/items',
		name: 'Items',
		icon: ShoppingCartIcon,
		component: ItemsView,
		layout: '/nav',
		privilage: 'admin'
	},
	{
		path: '/add-store',
		name: 'Add Store',
		component: AddStore,
		layout: '/',
		privilage: 'admin'
	},
];

export default dashboardRoutes;
