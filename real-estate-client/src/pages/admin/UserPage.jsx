import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Chip,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ApiService } from "../../api/api-service";
import { useAlert } from "../../lib/hooks/useAlert";
import DataTable from "../../components/DataTable";
import SimpleTextCell from "../../components/SimpleTextCell";
import UserAvatar from "../../components/UserAvatar";

export const USER_URL = "users";
const UserPage = () => {
  const [users, setUsers] = useState([]);

  const { showErrorToast, showSuccessToast, showConfirmAlert } = useAlert();

  const fetchData = async () => {
    try {
      const response = await ApiService.fetchData(USER_URL);
      setUsers(response.data);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const updateUserStatus = async (id, status) => {
    try {
      const result = await showConfirmAlert(
        "Are you sure?",
        "Want to update status."
      );
      if (result.isConfirmed) {
        const data = { id: id, status: status };
        await ApiService.updateData(`${USER_URL}/status`, data);
        showSuccessToast("Successfully updated");
        fetchData();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      accessorKey: "image",
      header: "User",
      cell: (info) => (
        <UserAvatar
          name={info.row.original.name}
          description={info.row.original.email}
          image={info.getValue()}
        />
      ),
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: (info) => <SimpleTextCell value={info.getValue()} />,
    },

    {
      accessorKey: "address",
      header: "Address",
      cell: (info) => <SimpleTextCell value={info.getValue()} />,
    },

    {
      accessorKey: "is_active",
      header: "Status",
      cell: (info) => (
        <div className="w-max">
          <Chip
            variant="ghost"
            size="sm"
            value={info.getValue() ? "Active" : "De-Active"}
            color={info.getValue() ? "green" : "blue-gray"}
          />
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: (info) => (
        <div className="w-max">
          {info.row.original.is_active ? (
            <Button
              variant="gradient"
              color="blue-gray"
              onClick={() => updateUserStatus(info.getValue(), 0)}
            >
              Disable
            </Button>
          ) : (
            <Button
              variant="gradient"
              color="indigo"
              onClick={() => updateUserStatus(info.getValue(), 1)}
            >
              Enable
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <section>
      <div className="mb-0 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Users list
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See the list of users
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row"></div>
      </div>
      <div className="content-block">
        <DataTable data={users} columns={columns} />
      </div>
    </section>
  );
};

export default UserPage;
