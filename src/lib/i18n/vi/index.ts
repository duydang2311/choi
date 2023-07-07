import type { Translation } from '../i18n-types';

const vi = {
	error: {
		fetch: 'Đã có lỗi xảy ra trong lúc thực hiện yêu cầu của bạn: {message}.',
		message: {
			badNetwork: 'Kết nối mạng bị gián đoạn'
		}
	},
	login: {
		h1: 'Đăng nhập Choi.',
		name: {
			label: 'Email hoặc tên tài khoản',
			placeholder: 'Email hoặc tên tài khoản',
			empty: 'Email hoặc tên tài khoản không được trống.'
		},
		password: {
			label: 'Mật khẩu',
			placeholder: 'Mật khẩu',
			forgot: 'Quên mật khẩu?',
			empty: 'Mật khẩu không được trống.'
		},
		submit: 'Đăng nhập',
		noAccount: 'Chưa có tài khoản?',
		signUp: 'Đăng ký',
		wrong: 'Email, tên tài khoản hoặc mật khẩu không đúng.',
		ok: 'Đăng nhập Choi thành công.'
	}
} satisfies Translation;

export default vi;
