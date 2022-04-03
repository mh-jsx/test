import MainHeading from "./../../Components/Common/MainHeading";
import clsx from "clsx";
import {useState} from "react";
import UserManagement from "./../../Components/Settings/UserManagement";
import ClientManagement from "./../../Components/Settings/ClientManagement";

const Index = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const staticTabsData = [
    {key: 0, title: "User Management"},
    {key: 1, title: "Client Management"},
  ];

  return (
    <div className='settings-wrapper'>
      <MainHeading title='Settings' />
      <div className='row'>
        <div className='col-3'>
          <ul className='primary-side-tabs'>
            {staticTabsData.map((tab, index) => (
              <li
                className={clsx(index === currentTab && "active-tab")}
                key={tab.key}
                onClick={() => setCurrentTab(index)}
              >
                {tab.title}
              </li>
            ))}
          </ul>
        </div>
        <div className='col-9'>
          {!currentTab ? <UserManagement /> : <ClientManagement />}
        </div>
      </div>
    </div>
  );
};

export default Index;
