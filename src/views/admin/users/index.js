import { useDisclosure } from "@chakra-ui/react";
import CheckTable from "./components/CheckTable";
import { useEffect, useState } from "react";
import { getApi } from "services/api";

const Index = () => {
  const tableColumns = [
    {
      Header: "#",
      accessor: "_id",
      isSortable: false,
      width: 10,
    },
    { Header: "ID", accessor: "", isSortable: false },
    { Header: "email Id", accessor: "username" },
    { Header: "first Name", accessor: "firstName" },
    { Header: "last Name", accessor: "lastName" },
    { Header: "role", accessor: "roles[0].roleName" },
    { Header: "Coins", accessor: "coins" },
    { Header: "Action", isSortable: false, center: true },
  ];
  const [action, setAction] = useState(false);
  const [dynamicColumns, setDynamicColumns] = useState([...tableColumns]);
  const [selectedColumns, setSelectedColumns] = useState([...tableColumns]);
  const [columns, setColumns] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [data, setData] = useState([]);
  const [displaySearchData, setDisplaySearchData] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { isOpen } = useDisclosure();

  const fetchData = async () => {
    setIsLoding(true);
    let result = await getApi(
      user?.roles[0]?.roleName === "Manager"
        ? `api/user/?parent=${user?._id?.toString()}`
        : "api/user/"
    );
    setData(result.data?.user);
    setIsLoding(false);
  };

  useEffect(() => {
    setColumns(tableColumns);
  }, [action]);

  const dataColumn = dynamicColumns?.filter((item) =>
    selectedColumns?.find((colum) => colum?.Header === item.Header)
  );

  return (
    <div>
      <CheckTable
        // isOpen={isOpen} setAction={setAction} action={action} columnsData={columns}
        isLoding={isLoding}
        columnsData={columns}
        isOpen={isOpen}
        setAction={setAction}
        action={action}
        setSearchedData={setSearchedData}
        allData={data}
        displaySearchData={displaySearchData}
        tableData={displaySearchData ? searchedData : data}
        setData={setData}
        fetchData={fetchData}
        dataColumn={dataColumn}
        setDisplaySearchData={setDisplaySearchData}
        setDynamicColumns={setDynamicColumns}
        dynamicColumns={dynamicColumns}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />
      {/* Add Form */}
    </div>
  );
};

export default Index;
