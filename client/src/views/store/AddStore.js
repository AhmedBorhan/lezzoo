import React, { useState } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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

export default function Checkout() {
	const classes = useStyles();
	const [image, setImage] = useState('')
	  const [snack, setSnack] = React.useState({
			open: false,
			severity: '',
			message: ''
		});

	// On file changed
	const onFileChange = async event => {
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append('recfile', event.target.files[0]);

		// Details of the uploaded file
		console.log(event.target.files);

		// Request made to the backend api
		// Send formData object
		try {
			const res = await axios.post('/api/files/upload-multiple', formData);
			setImage(res.data.data[0].image_url)
		} catch (error) {
			console.log('error :>> ', error);
			handleClick('error', 'could not upload file')
		}
	};
	const handleClick = (severity, message) => {
    setSnack({...snack, severity, message, open: true});
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({...snack, open: false});
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
					Create Store
				</Typography>
				<React.Fragment>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField required id="name" name="name" label="Store Name" fullWidth />
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
							{image && <img width="350" src={image} alt="..." />}
						</Grid>
					</Grid>
				</React.Fragment>
				<React.Fragment>
					<div className={classes.buttons}>
						<Button className={classes.button}>Cancel</Button>
						<Button variant="contained" color="primary" className={classes.button}>
							Create store
						</Button>
					</div>
				</React.Fragment>
			</Paper>
		</React.Fragment>
	);
}
