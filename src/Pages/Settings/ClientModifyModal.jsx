import {Modal, Button, Form, message, Alert, Select, Checkbox} from "antd";
import CloseIcon from "../../Assets/Icons/closewhite.svg";
import FormInput from "../../Components/Common/AntdFormComponents/FormInput";
import FormInputPassword from "../../Components/Common/AntdFormComponents/FormInputPassword";
import PasswordIcon from "../../Assets/Icons/visibility.png";
import FormSelect from "../../Components/Common/AntdFormComponents/FormSelect";
import {Http} from "../../Http";
import {useMutation, useQueryClient, useQuery} from "react-query";
import {ValidationRules} from "../../Constants/ValidationRules";
import FormSwitch from "../../Components/Common/AntdFormComponents/FormSwitch";
import arrowDownSm from "./../../Assets/Icons/arrow-down-sm.png";
import GetFilteredClients from "./../../Utils/GetFilteredClients";
import _ from "lodash";
import {QueryKeys} from "./../../Constants/QueryKeys";

const {Option} = Select;
const ClientModifyModal = ({
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

  const {data: customersNode, isLoading: isCustomersLoading} = useQuery(
    [QueryKeys.FetchShipHeroCustomers],
    () => Http.get("/customers/shiphero"),
    {enabled: isModalVisible}
  );

  // fetch clients - installed, uninstalled
  const {data: merchants, isLoading: isLoadingAuthorize} = useQuery(
    [QueryKeys.getAllMerchants],
    () => Http.get("/salla/clients?status=authorize")
  );

  let filteredMerchants =
    !!merchants && GetFilteredClients(_.reverse(merchants?.data?.rows));

  // create user
  const createUser = useMutation(
    (values) => {
      // finding current selected merchant details
      const merchantDetails = filteredMerchants.find(
        (merchant) => merchant.merchant === values.merchantId
      );

      // finding the shipHero customer which has same name with merchant store nam
      const shipHeroCustomerDetails =
        customersNode?.data?.account?.data?.customers?.edges?.find(
          (customer) => {
            return (
              customer.node.warehouses[0].company_alias.toLowerCase() ===
              merchantDetails?.local.en.toLowerCase()
            );
          }
        );

      if (shipHeroCustomerDetails) {
        return Http[method](apiEndPoint, {
          ...values,
          role: "client",
          shipHeroAccountId: shipHeroCustomerDetails.node.id,
        });
      }
      return Promise.reject();
    },
    {
      onSuccess: () => {
        message.success("User created successfully");
        queryClient.invalidateQueries(["users"]);
        handleCancel();
      },
      onError: (err) =>
        message.error(
          "Ship hero Customer not exist against the merchant /store name "
        ),
    }
  );

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
            <Form.Item label='Merchant / Store' name='merchantId'>
              <Select
                className='primary-select'
                suffixIcon={<img src={arrowDownSm} alt='' />}
              >
                {Array.isArray(filteredMerchants) &&
                  filteredMerchants.map((item, index) => (
                    <Option key={item.merchant} value={item.merchant}>
                      {item.storeName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <FormInput
              rules={[ValidationRules.RequiredRule]}
              name='fullName'
              label='Name'
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
              {/* <FormSelect
                rules={[ValidationRules.RequiredRule]}
                name='role'
                label='Role'
                options={[{key: "client", value: "client", label: "Client"}]}
              /> */}
              <div className='ml-24'>
                {/* <FormSwitch
                  name='isActive'
                  label='Status'
                  rules={[ValidationRules.RequiredRule]}
                /> */}
              </div>
            </div>

            <div className='d-flex justify-content-end mt-40 pb-24'>
              <Button className='button-default mr-24' onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                htmlType='submit'
                className='button-primary'
                loading={isLoadingAuthorize || isCustomersLoading}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default ClientModifyModal;
