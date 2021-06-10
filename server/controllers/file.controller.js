var path = require('path');
var fs = require('fs');

exports.getImageFile = async (req, res) => {
	const { file, dir } = req.params;

	res.sendFile(path.resolve(`./uploads/${dir}/${file}`), (err) => {
		if (err)
			return res.status(404).json({
				result: 'Fail',
				message: 'File not found'
			});
	});
};

// @route   POST api/files/upload
// @desc    upload image
// @access  Private - Images
exports.uploadMultiFiles = async (req, res, err) => {
	console.log('req.files :>> ', req.files);
	console.log('err :>> ', err);
	try {
		// req.files is array of `photos` files
		let allImages = [];
		for (let index = 0; index < req.files.length; index++) {
			// Create a new Images
			const newImage = {
				image_name: req.files[index].filename,
				image_url: 'api/files/temp/'+req.files[index].filename,
			};
			allImages.push(newImage);
		}
		res.status(200).json({
			result: 'Success',
			message: 'Files uploaded successfuly',
			data: allImages
		});
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			result: 'Fail',
			message: 'File could not be uploaded'
		});
	}
};
// @route   DELETE api/files/delete/:file
// @desc    delete file from the storage
// @access  Private - Images
exports.deleteImage = async (req, res) => {
	const { file } = req.params;
	try {
		const file_path = `uploads\\images\\${file}`;

		/** delete file in the storage. **/
		fs.unlinkSync(file_path);
		return res.status(200).json({
			result: 'Success',
			message: 'image deleted'
		});
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			result: 'Fail',
			message: 'File could not be deleted'
		});
	}
};