import {useState} from "react";
import PrimaryInputSearch from "./../Common/PrimaryInputSearch";
import {Button, message} from "antd";
import PlusIcon from "./../../Assets/Icons/plusSquareIcon.svg";
import UserCard from "./../../Pages/Settings/UserCard";
import {useQuery, useMutation, useQueryClient} from "react-query";
import {QueryKeys} from "./../../Constants/QueryKeys";
import {Http} from "./../../Http";
import ModifyModal from "./../../Pages/Settings/ModifyModal";

const UserManagement = ({}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const showModal = () => setIsModalVisible(true);
  const handleSearch = ({target: {value}}) => setSearch(value);

  // fetch users
  const {data, isLoading, error} = useQuery([QueryKeys.getUsers], () =>
    Http.get(`/users`)
  );

  const GetFilteredData = (data) => {
    if (Array.isArray(data)) {
      return data.filter((item) => item.merchantId === null);
    }
    return [];
  };

  const handleCancel = () => setIsModalVisible(false);

  // const users = GetFilteredData(data?.data); // Access the client
  let users = GetFilteredData(data?.data); // Access the client
  const queryClient = useQueryClient();

  // delete user
  const handleDelete = useMutation(
    (id) => {
      return Http.delete(`/users/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.getUsers]);
        message.success("User deleted successfully");
      },
    }
  );

  return (
    <>
      <div className='primary-side-tabs-content'>
        <div className='tabs-header mb-24'>
          <div>Total Users : {users?.length}</div>
          <div className='d-flex align-items-center'>
            <PrimaryInputSearch
              handler={handleSearch}
              value={search}
              styleType='secondary'
            />
            <Button
              onClick={showModal}
              className='button-primary ml-24'
              icon={<img src={PlusIcon} alt='' />}
            >
              Create User
            </Button>
          </div>
        </div>
        {
          // users cards
        }
        <div className='row'>
          {users &&
            users.map((card, index) => (
              <UserCard
                key={index}
                card={card}
                onClickDelete={handleDelete}
                showModal={showModal}
              />
            ))}
        </div>
      </div>{" "}
      {isModalVisible && (
        <ModifyModal
          heading='Create User'
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          apiEndPoint='/users/register'
          method='post'
        />
      )}
    </>
  );
};

export default UserManagement;
