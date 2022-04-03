import {Dropdown, Menu} from "antd";
import kebabMenuIcon from "./../../Assets/Icons/kebab-menu.svg";
import PhoneIcon from "./../../Assets/Icons/phone.svg";
import EmailIcon from "./../../Assets/Icons/email.svg";
import ModifyModal from "./ModifyModal";
import {useState} from "react";
import UpdatePasswordModal from "./UpdatePassowordModal";
import ClientModifyModal from "./ClientModifyModal";

const UserCard = ({card, onClickDelete, tab}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordChangeModalVisible, setIsPasswordChangeModalVisible] =
    useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const showPasswordChangeModal = () => setIsPasswordChangeModalVisible(true);
  const handleCancelPasswordChangeModal = () =>
    setIsPasswordChangeModalVisible(false);

  const menu = (
    <Menu>
      <Menu.Item key='0' onClick={showModal}>
        <span className='pr-45'>Edit</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='1' onClick={showPasswordChangeModal}>
        <span>Update password</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='2' onClick={() => onClickDelete.mutate(card.id)}>
        <span>Delete</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='col-3 mb-16'>
      <div className='client-card'>
        <div className='d-flex justify-content-between mb-24'>
          <div className='d-flex'>
            <div className='client-avatar mr-10'> JD </div>
            <div>
              <h3 className='f-16 fw-600 mb-0'>
                {card?.fullName ?? "No Name"}
              </h3>
              <span className='f-12 color-gray'>{card?.role}</span>
            </div>
          </div>
          <Dropdown overlay={menu} trigger={["click"]}>
            <img className='mb-26 cursor-pointer' src={kebabMenuIcon} alt='' />
          </Dropdown>
        </div>
        <div className='client-contact-info'>
          <div className='mb-12'>
            <img src={EmailIcon} alt='' />
            <span className='color-gray'>{card?.email}</span>
          </div>
          {/* <div className='d-flex justify-content-between'>
            <div>
              <img src={PhoneIcon} alt='' />
              <span className='color-gray'>{card?.phone}</span>
            </div>
          </div> */}
          <p className='color-success-light'>
            {card?.isActive ? "Enabled" : "Disabled"}{" "}
            <span className='user-active-indicator' />
          </p>
        </div>
      </div>
      {
        // update user modal
      }
      {isModalVisible && tab === "client" ? (
        <ClientModifyModal
          heading='Update Client'
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          apiEndPoint={`/users/${card.id}`}
          method='put'
          data={card}
          isUpdate={true}
        />
      ) : (
        <ModifyModal
          heading='Update User'
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          apiEndPoint={`/users/${card.id}`}
          method='put'
          data={card}
          isUpdate={true}
        />
      )}
      {
        // delete user modal
      }
      {isPasswordChangeModalVisible && (
        <UpdatePasswordModal
          isModalVisible={isPasswordChangeModalVisible}
          handleCancel={handleCancelPasswordChangeModal}
        />
      )}
    </div>
  );
};

export default UserCard;
