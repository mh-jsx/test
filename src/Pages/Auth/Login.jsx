import Logo from "../../Assets/Icons/newLogo1.png";
import { Form, Input, Button, Alert } from "antd";
// import EmailIcon from "../../Assets/Icons/email-icon-auth.png";
import EmailIcon from "../../Assets/Icons/emailIcon.svg";
// import PasswordIcon from "../../Assets/Icons/visibility.png";
import OpenEye from "../../Assets/Icons/openEye.svg";
import ClosedEye from "../../Assets/Icons/eyeCrossed.svg";
// import KeyIcon from "../../Assets/Icons/key.png";
import KeyIcon from "../../Assets/Icons/keyIcon.svg";
import WareHouseBG from "../../Assets/warehouse-overlay.jpg";
import { useAuthContext } from "./../../Context/authContext";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ValidationRules } from "./../../Constants/ValidationRules";
import { Http } from "./../../Http";
import { useLanguage } from "./../../Context/languageContext";
import strings from "./../../Languages/Languages";
import PrimarySelectLanguage from "./../../Components/Common/PrimarySelectLanguage";

const Login = () => {
	const { login, isAuthenticated, getRole } = useAuthContext();
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	// history hook
	const history = useHistory();

	const { isRTL, language } = useLanguage();

	useEffect(() => {
		// history hook to redirect to dashboard after login.
		if (isAuthenticated()) {
			history.push(getRole() === "admin" ? "/dashboard" : "/orders");
		}
	}, []);

	// handle login form submit
	const handleLogin = (values) => {
		setIsLoading(true);
		Http.post(`/users/login`, values)
			.then((res) => {
				login(res?.data);
				window.location.reload();
			})
			.catch((err) => {
				setErrors(err.response?.data);
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<div className="auth-wrapper">
			<div className="row">
				<div className="col-7 ">
					<div
						className="login-left-container d-flex justify-content-center align-items-center"
						style={{
							background: `linear-gradient(132deg, #000000 0%, #0C0A08B3 40%, #594E4093 81%, #D0B89600 100%), url('${WareHouseBG}')`,
						}}
					>
						<div className="login-left-container__content">
							<h2>{strings.ManageYourWarehouseWithUs}</h2>
							<p>
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
								eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
								voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
								clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
								amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
								nonumy eirmod tempor invidunt ut labore et
							</p>
						</div>
					</div>
				</div>
				<div className="col-5 login-right-container position-relative">
					<div className="language-absolute-right">
						<PrimarySelectLanguage />
					</div>
					<img
						width={221}
						// style={{ border: "1px solid red" }}
						height={111}
						className="mt-30"
						src={Logo}
						alt=""
					/>
					<h1>{strings.login}</h1>
					<p>{strings.pleaseEnterEmailPasswordBelowToLoginToTheSystem}</p>
					<Form
						className="primary-form text-start m-auto w-max-content"
						layout="vertical"
						onFinish={handleLogin}
					>
						{errors?.message && (
							<Alert message={errors?.message} type="error" className="mb-3" showIcon />
						)}

						<Form.Item
							name="email"
							label={strings.usernameOrEmail}
							rules={[ValidationRules.RequiredRule]}
						>
							<Input
								autoFocus
								prefix={
									<div className="input-prefix-bordered">
										<img src={EmailIcon} alt="" />
									</div>
								}
								className="primary-input-w-prefix"
							/>
						</Form.Item>
						<Form.Item
							rules={[ValidationRules.RequiredRule]}
							name="password"
							label={strings.password}
							className="mb-16"
						>
							<Input.Password
								prefix={
									<div className="input-prefix-bordered">
										<img src={KeyIcon} alt="" />
									</div>
								}
								iconRender={(visible) =>
									visible ? <img src={ClosedEye} alt="" /> : <img src={OpenEye} alt="" />
								}
								className="primary-input-w-prefix"
							/>
						</Form.Item>
						<Link to="/forgot-password">
							<div className="f-14 fw-600 text-end cursor-pointer mb-45">
								{strings.forgotPassword} ?
							</div>
						</Link>
						<Button htmlType="submit" className="button-primary-lg" loading={isLoading}>
							{strings.login}
						</Button>
					</Form>
					<div className="auth-footer">
						<Link to="/privacy-policy">
							<span className="mr-30 mt-auto">{strings.privacyPolicy}</span>
						</Link>
						<Link to="/faq">
							<span>{strings.faq}</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;
