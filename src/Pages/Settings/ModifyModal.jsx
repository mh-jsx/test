import {Modal, Button, Form, message, Alert, Checkbox} from "antd";
import CloseIcon from "../../Assets/Icons/closewhite.svg";
import FormInput from "../../Components/Common/AntdFormComponents/FormInput";
import FormInputPassword from "../../Components/Common/AntdFormComponents/FormInputPassword";
import PasswordIcon from "../../Assets/Icons/visibility.png";
import FormSelect from "./../../Components/Common/AntdFormComponents/FormSelect";
import {Http} from "./../../Http";
import {useMutation, useQueryClient} from "react-query";
import {ValidationRules} from "./../../Constants/ValidationRules";

const ModifyModal = ({
  isModalVisible,
  handleCancel,
  heading,
  apiEndPoint,
  data,
  method,
  isUpdate,
}) => {
  // Access the client
  const queryClient = useQueryClient();

  // create user
  const createUser = useMutation(
    (values) => {
      return Http[method](apiEndPoint, values);
    },
    {
      onSuccess: () => {
        message.success("User created successfully");
        queryClient.invalidateQueries(["users"]);
        handleCancel();
      },
    }
  );

  const modules = [
    {key: "dashboard", value: "Dashboard"},
    {key: "orders", value: "Orders"},
    {key: "awb", value: "AWB"},
    {key: "courier", value: "Courier"},
    {key: "reports", value: "Reports"},
    {key: "clients", value: "Clients"},
    {key: "inventory", value: "Inventory"},
    {key: "billing", value: "Billing"},
    {
      key: "tickets",
      value: "Tickets",
    },
  ];

  return (
    <Modal
      closable={false}
      title=''
      visible={isModalVisible}
      onCancel={handleCancel}
      className='primary-modal modify-client-modal-wrapper'
      footer={false}
    >
      <div className='primary-modal-container'>
        <div className='primary-modal-header'>
          <div className='d-flex align-items-center'>
            <h1 className='f-18 fw-700 mb-0 text-white mr-50'>{heading}</h1>
          </div>
          <Button className='button-close' onClick={handleCancel}>
            <img src={CloseIcon} alt='' />
          </Button>
        </div>
        <div className='modify-user-modal-content'>
          <h2 className='f-18 fw-600 mt-30 mb-24'>
            Please fill below information to create new user
          </h2>
          <Form
            initialValues={data}
            layout='vertical'
            className='primary-form'
            onFinish={(values) => createUser.mutate(values)}
          >
            {createUser.error && (
              <Alert
                message={createUser?.error?.response?.data?.message}
                type='error'
                className='mb-3'
                showIcon
              />
            )}

            {/* <div className='row'> */}
            {/* <div className='col-6'> */}
            <FormInput
              rules={[ValidationRules.RequiredRule]}
              name='fullName'
              label='Full Name'
              styleType='width-100'
            />
            <FormInput
              rules={[ValidationRules.RequiredRule]}
              name='phone'
              label='Phone'
              styleType='width-100'
            />
            <FormInput
              rules={[ValidationRules.RequiredRule]}
              name='username'
              label='Username'
              styleType='width-100'
            />
            <FormInput
              rules={[ValidationRules.EmailRule]}
              name='email'
              label='Email'
              styleType='width-100'
            />
            {!isUpdate && (
              <FormInputPassword
                rules={[ValidationRules.RequiredRule]}
                name='password'
                label='Password'
                iconRender={PasswordIcon}
                styleType='width-100'
              />
            )}

            <div className='d-flex align-items-center'>
              <FormSelect
                rules={[ValidationRules.RequiredRule]}
                name='role'
                label='Role'
                options={[
                  {key: "super", value: "super", label: "Super Admin"},
                  {key: "admin", value: "admin", label: "Admin"},
                  {key: "staff", value: "staff", label: "Staff"},
                ]}
              />
              <div className='ml-24'>
                {/* <FormSwitch
                  name='isActive'
                  label='Status'
                  rules={[ValidationRules.RequiredRule]}
                /> */}
              </div>
            </div>
            {/* </div> */}

            {/* <div className='col-5 ms-auto'>
                <h2 className='f-14 fw-500 mb-0'>Modules</h2>
                <p className='f-12 color-gray'>
                  You can specify those modules data in this role which you want
                  to give access to user.
                </p>
                {modules.map((module) => (
                  <div className='mb-2'>
                    <Checkbox /> <span className='ml-10'>{module?.value}</span>
                  </div>
                ))}
              </div>
            </div> */}

            <div className='d-flex justify-content-end mt-40 pb-24'>
              <Button className='button-default mr-24' onClick={handleCancel}>
                Cancel
              </Button>
              <Button htmlType='submit' className='button-primary'>
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default ModifyModal;
