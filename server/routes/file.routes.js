const multer = require('multer');
//filtering the file so it takes just images
const fileFilter = (req, file, cb) => {
	if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
		cb(null, true);
	} else {
		cb('file type must be ( .jpeg , .png , .jpg)', false);
	}
};
/*
 initializing multer, 
 @OPTIMIZATION max image size is 1080 * 1080

 all images are uploaded to temporary folder, and then after approving they will be moved to another folder
*/
const storage = multer.diskStorage({
	destination: './uploads/temp',
	filename: (req, file, cb) => {
		console.log('file :>> ', file);
		cb(null, `${Date.now()}${file.mimetype.replace('image/', '.')}`);
	}
});

const upload = multer({
	storage,
	limits: {
		fileSize: 1080 * 1080
	},
	fileFilter
});

module.exports = (app) => {
	const passport = require('passport');
	const file = require('../controllers/file.controller');
	var router = require('express').Router();

	router.get('/:dir/:file', file.getImageFile);

	router.post(
		'/upload-multiple',
		// passport.authenticate('jwt', { session: false }),
		upload.array('recfile', 10),
		file.uploadMultiFiles
	);

	// router.delete('/delete/:file', passport.authenticate('jwt', { session: false }), file.deleteImage);

	app.use('/api/files', router);
};
