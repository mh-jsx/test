import { useEffect, useState } from "react";
import PrimaryInputSearch from "./../Common/PrimaryInputSearch";
import { Button, message } from "antd";
import PlusIcon from "./../../Assets/Icons/plusSquareIcon.svg";
import UserCard from "./../../Pages/Settings/UserCard";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { QueryKeys } from "./../../Constants/QueryKeys";
import { Http } from "./../../Http";
import ClientModifyModal from "./../../Pages/Settings/ClientModifyModal";

const ClientManagement = ({}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [clients, setClients] = useState([]);

	const showModal = () => setIsModalVisible(true);

	// fetch users
	const { data, isLoading, error } = useQuery([QueryKeys.getUsers], () => Http.get(`/users`));

	const GetFilteredData = (data) => {
		if (Array.isArray(data)) {
			return data.filter((item) => item.merchantId !== null);
		}
		return data;
	};

	let users = GetFilteredData(data?.data); // Access the client

	useEffect(() => {
		if (data?.data) {
			setClients(GetFilteredData(data?.data));
		}
	}, [data]);

	const handleSearch = ({ target: { value } }) => {
		if (value === "") {
			setClients(users);
			return;
		}
		setClients(users.filter((item) => item.fullName.toLowerCase().includes(value.toLowerCase())));
	};

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

	const handleCancel = () => setIsModalVisible(false);

	console.log("data", data);

	return (
		<>
			<div className="primary-side-tabs-content">
				<div className="tabs-header mb-24">
					<div className="f-18 fw-600">Total Users : {users?.length}</div>
					<div className="d-flex align-items-center">
						<PrimaryInputSearch handler={handleSearch} styleType="secondary" />
						<Button
							onClick={showModal}
							className="button-primary ml-24"
							icon={<img src={PlusIcon} alt="" />}
						>
							Create Client
						</Button>
					</div>
				</div>
				{
					// users cards
				}
				<div className="row">
					{users &&
						clients &&
						clients.map((card, index) => (
							<UserCard
								key={index}
								card={card}
								onClickDelete={handleDelete}
								showModal={showModal}
								tab="client"
							/>
						))}
				</div>
			</div>
			{isModalVisible && (
				<ClientModifyModal
					heading="Create User"
					isModalVisible={isModalVisible}
					handleCancel={handleCancel}
					apiEndPoint="/users/register"
					method="post"
				/>
			)}
		</>
	);
};

export default ClientManagement;
