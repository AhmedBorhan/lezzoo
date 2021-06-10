import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { fetchOneStore } from '../../actions/storeAction';

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2)
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	cardMedia: {
		paddingTop: '56.25%' // 16:9
	},
	cardContent: {
		flexGrow: 1
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6)
	}
}));

export default function Categories(props) {
	const classes = useStyles();
	const [ rows, setRows ] = useState([]);
	const [ store, setStore ] = useState({name: ''});
	const storeId =  props.match.params.id
	//Request actions
	const fetchAction = async () => {
		const { store } = await fetchOneStore(storeId);
		let newRows = [];
		store.categories.forEach((element) => {
			newRows = [ ...newRows, { name: element.name, image: element.image } ];
		});
		setStore({name: store.name})
		setRows([ ...rows, ...newRows ]);
	};

	useEffect(() => {
		fetchAction();
	}, []);
	return (
		<React.Fragment>
			<>
				<div>
					<Container maxWidth="sm">
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
							{store.name}
						</Typography>
						<Typography variant="h5" align="center" color="textSecondary" paragraph>
							Here you can see all the categories in {store.name} store
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify="center">
								<Grid item>
									<Button variant="contained" color="primary">
										<Link to="/add-category">Add new category</Link>
									</Button>
								</Grid>
								<Grid item>
									<Button variant="outlined" color="primary">
										Secondary action
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth="md">
					<Grid spacing={2} container>
						{rows.map((row, index) => (
							<Grid item key={index} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardMedia className={classes.cardMedia} image={`/api/files/images/${row.image}`} title={row.name} />
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant="h5" component="h2">
											{row.name}
										</Typography>
										{/* <Typography>
                      A description about the category if needed
                    </Typography> */}
									</CardContent>
									<CardActions>
										<Button to={'/items'} size="small">
											View
										</Button>
										<Button size="small" color="secondary">
											Delete
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</>
			{/* Footer */}
			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					Footer
				</Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
					Something here to give the footer a purpose!
				</Typography>
			</footer>
			{/* End footer */}
		</React.Fragment>
	);
}
