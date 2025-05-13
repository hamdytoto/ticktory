import { apiSlice } from "../../app/api/apiSlice";
import { registerApi } from "./register/registerApi";
import { verifyUserApi } from "./register/verifyUserApi";
import { verifyUserResendApi } from "./register/verifyUserResend";
import { loginApi } from "./login/LoginApi";
import { getProfileApi, updateProfileApi } from "./profile/profileApis";
import {
	changePasswordApi,
	forgetPasswordApi,
	resetPasswordApi,
	validatePasswordApi,
} from "./passwordApis/passwordApis";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		registerApi: registerApi(builder),
		verifyUser: verifyUserApi(builder),
		verifyUserResend: verifyUserResendApi(builder),
		login: loginApi(builder),
		forgetPassword: forgetPasswordApi(builder),
		resetPassword: resetPasswordApi(builder),
		validatePassword: validatePasswordApi(builder),
		changePassword: changePasswordApi(builder),
		getProfile: getProfileApi(builder),
		updateProfile: updateProfileApi(builder),

	}),
});

export const {
	useRegisterApiMutation,
	useVerifyUserMutation,
	useVerifyUserResendMutation,
	useLoginMutation,
	useForgetPasswordMutation,
	useResetPasswordMutation,
	useValidatePasswordMutation,
	useChangePasswordMutation,
	useGetProfileQuery,
	useUpdateProfileMutation,
} = authApiSlice;
