import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../actions/authAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.auth.isAuthenticated);
	const [ name, setName ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ snack, setSnack ] = React.useState({
		open: false,
		severity: '',
		message: ''
	});
  
	const loginAction = async () => {
		const userData = {
			name,
			password
		};
    try {
      await dispatch(loginUser(userData));
    } catch (error) {
      let message = 'login failed'
      if (error.response) message = error.response.data.message
      handleClick('error', message);
    }
	};
	if (user) history.push('/');
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
    <Container component="main" maxWidth="xs">
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={snack.severity}>
					{snack.message}
				</Alert>
			</Snackbar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={loginAction}
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}