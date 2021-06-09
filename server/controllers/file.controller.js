const crypto = require('crypto');
var path = require('path');
var fs = require('fs');
var url = 'localhost:5000';

exports.getImageFile = async (req, res) => {
	const { file } = req.params;

	res.sendFile(path.resolve(`./uploads/images/${file}`), (err) => {
		console.log('err', err);
		if (err)
			return res.status(404).json({
				result: 'Fail',
				message: {
					en: 'File not found'
				}
			});
	});
};

// @route   POST api/files/upload
// @desc    upload image
// @access  Private - Images
exports.uploadMultiFiles = async (req, res) => {
	console.log('req.files :>> ', req.files);
	try {
		// req.files is array of `photos` files
		let allImages = [];
		for (let index = 0; index < req.files.length; index++) {
			var tmp_path = req.files[index].path;
			var format = req.files[index].mimetype.replace('image/', '.');
			var newFileName = `${Date.now()}_${crypto.randomBytes(8).toString('hex')}${format}`;
			var target_path = `uploads/images/` + newFileName;

			// Create a Images
			const newImage = {
				image_name: newFileName,
				image_url: `${url}/api/files/images/${newFileName}`
			};
			allImages.push(newImage);

			/** copy the uploaded file. **/
			console.log('tmp_path :>> ', tmp_path);
			var src = fs.createReadStream(tmp_path);
			var destPath = fs.createWriteStream(target_path);
			src.pipe(destPath);
			src.on('error', (err) => {
				console.log('err', err);
				return res.status(500).json({
					result: 'Fail',
					message: {
						en: 'File could not be uploaded'
					}
				});
			});
		}
		fs.unlinkSync(tmp_path);
		res.status(200).json({
			result: 'Success',
			message: {
				en: 'Files uploaded successfuly'
			},
			data: allImages
		});
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			result: 'Fail',
			message: {
				en: 'File could not be uploaded'
			}
		});
	}
};
// @route   DELETE api/files/delete/:file
// @desc    delete file from the storage and the database as well
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
			message: {
				en: 'File could not be deleted'
			}
		});
	}
};