import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { createCategory } from '../../actions/categoryAction';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3)
		}
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1)
	}
}));

//Used to get storeId param from the URL query
const params = new URLSearchParams(window.location.search);

const initState = {
	store:  parseInt(params.get('storeId')),
	name: '',
	image: ''
};



export default function Checkout() {
	const classes = useStyles();
	const history = useHistory();
	const [ category, setCategory ] = useState(initState);
	const [ snack, setSnack ] = React.useState({
		open: false,
		severity: '',
		message: ''
	});
	const createCategoryAction = async () => {
		try {
			await createCategory(category);
			history.goBack();
		} catch (error) {
			let message = 'Could not sumbit action'
      if (error.response) message = error.response.data.message
      handleClick('error', message);
		}
	};

	// Uploading image
	const onFileChange = async (event) => {
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append('recfile', event.target.files[0]);

		// Request made to the backend api
		// Send formData object
		try {
			const res = await axios.post('/api/files/upload-multiple', formData);
			setCategory({ ...category, image: res.data.data[0].image_name });
		} catch (error) {
			handleClick('error', 'could not upload file');
		}
	};
	const handelStateChange = (e) => {
		setCategory({ ...category, [e.target.name]: e.target.value });
	};

	const handleClick = (severity, message) => {
		setSnack({ ...snack, severity, message, open: true });
	};
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnack({ ...snack, open: false });
	};

	return (
		<React.Fragment>
			<Snackbar open={snack.open} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={snack.severity}>
					{snack.message}
				</Alert>
			</Snackbar>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h4" align="center">
					Create Category
				</Typography>
				<React.Fragment>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField onChange={handelStateChange} required id="name" name="name" label="Category Name" fullWidth />
						</Grid>
						<Grid item xs={6}>
							<input
								accept="image/*"
								className={classes.input}
								style={{ display: 'none' }}
								id="raised-button-file"
								type="file"
								onChange={onFileChange}
							/>
							<label htmlFor="raised-button-file">
								<Button component="span" className={classes.button}>
									Upload Image
								</Button>
							</label>
						</Grid>
						<Grid item xs={6}>
							{category.image && <img width="350" src={`api/files/temp/${category.image}`} alt="..." />}
						</Grid>
					</Grid>
				</React.Fragment>
				<React.Fragment>
					<div className={classes.buttons}>
						<Button className={classes.button}>Cancel</Button>
						<Button onClick={createCategoryAction} variant="contained" color="primary" className={classes.button}>
							Create category
						</Button>
					</div>
				</React.Fragment>
			</Paper>
		</React.Fragment>
	);
}
