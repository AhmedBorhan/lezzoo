import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './router/routes';
import PrivateRoute from './router/PrivateRoute';
import Login from './views/LogIn';
import Dashboard from './views/dashboard/Dashboard';
import { setAuthToken } from './actions/authAction';
const switchRoutes = (
	<Switch>
		{routes.map((prop, key) => {
			if (prop.privilage === 'admin')
				return <PrivateRoute exact path={prop.path} component={prop.component} key={key} />;
			return <Route exact path={prop.path} component={prop.component} key={key} />;
		})}
		<Route />
	</Switch>
);

export default function App() {
	if (localStorage.getItem('token')) setAuthToken(localStorage.getItem('token'));
	return (
		<Router>
			<Switch>
				<Route exact path="/login" component={Login} />
				<div>
					<Dashboard component={switchRoutes} />
				</div>
			</Switch>
		</Router>
	);
}
