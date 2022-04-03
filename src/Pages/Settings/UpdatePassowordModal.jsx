import {Modal, Button, Form, Alert} from "antd";
import CloseIcon from "../../Assets/Icons/closewhite.svg";
import {useMutation, useQueryClient} from "react-query";
import FormInputPassword from "../../Components/Common/AntdFormComponents/FormInputPassword";
import PasswordIcon from "../../Assets/Icons/visibility.png";
import {ValidationRules} from "../../Constants/ValidationRules";
import {Http} from "./../../Http";
import {QueryKeys} from "./../../Constants/QueryKeys";

const UpdatePasswordModal = ({isModalVisible, handleCancel, heading}) => {
  // Access the client
  const queryClient = useQueryClient();

  // update password
  const updatePassword = useMutation(
    (values) => {
      return Http.post("/users/updatePassword", values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.getUsers]);
      },
    }
  );

  return (
    <Modal
      closable={false}
      title=''
      visible={isModalVisible}
      onCancel={handleCancel}
      className='primary-modal change-password-modal-wrapper'
      footer={false}
    >
      <div className='primary-modal-container'>
        <div className='primary-modal-header'>
          <div className='d-flex align-items-center'>
            <h1 className='f-18 fw-700 mb-0 text-white mr-50'>
              Change Password
            </h1>
          </div>
          <Button className='button-close' onClick={handleCancel}>
            <img src={CloseIcon} alt='' />
          </Button>
        </div>
        <div className='change-password-modal-content'>
          <h2 className='f-18 fw-600 mt-30 mb-24'>Create new password</h2>
          <Form
            className='primary-form'
            layout='vertical'
            onFinish={(values) => updatePassword.mutate(values)}
          >
            {updatePassword.error && (
              <Alert
                message={updatePassword?.error?.response?.data?.message}
                type='error'
                className='mb-3'
                showIcon
              />
            )}
            <FormInputPassword
              name='newPassword'
              label='New password'
              rules={ValidationRules.password}
              iconRender={PasswordIcon}
              styleType='width-100'
            />
            <FormInputPassword
              name='confirmPassword'
              label='Confirm password'
              rules={ValidationRules.ConfirmPassword}
              iconRender={PasswordIcon}
              styleType='width-100'
            />
            <div className='d-flex justify-content-end mt-40 pb-24'>
              <Button className='button-default mr-24' onClick={handleCancel}>
                Cancel
              </Button>
              <Button htmlType='submit' className='button-primary'>
                Update
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default UpdatePasswordModal;
