const ApiError = require('../exceptions/api-error');
const userServise = require('../service/user-service');
const { validationResult } = require('express-validator');

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(
					ApiError.BadRequest('Ошибка при валидации', errors.array())
				);
			}
			const { email, password } = req.body;
			const userData = await userServise.registration(email, password);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userServise.login(email, password);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
            return res.json(userData)
		} catch (e) {
			next(e);
		}
	}
	async logout(req, res, next) {
		try {
		} catch (e) {
			next(e);
		}
	}
	async activation(req, res, next) {
		try {
			const activationLink = req.params.link;
			await userServise.activate(activationLink);
			return res.redirect(process.env.CLIENT_URL);
		} catch (e) {
			next(e);
		}
	}
	async refresh(req, res, next) {
		try {
		} catch (e) {
			next(e);
		}
	}
	async getUsers(req, res, next) {
		try {
			res.json(['123', '324']);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();
