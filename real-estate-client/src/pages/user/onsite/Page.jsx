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
import DataTable from "../../../components/DataTable";
import { useAlert } from "../../../lib/hooks/useAlert";
import UserAvatar from "../../../components/UserAvatar";
import SimpleTextCell from "../../../components/SimpleTextCell";
import { Status, statusColors } from "../../../config/constants";
import { Link } from "react-router-dom";
import { formateDate } from "../../../lib/utils/custom";
import { ApiService } from "../../../api/api-service";

export const ON_SITE_URL = "onsite";

const OnsiteRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [requested, setRequested] = useState([]);

  const { showErrorToast, showSuccessToast, showConfirmAlert } = useAlert();

  const fetchData = async () => {
    try {
      const response = await ApiService.fetchData(ON_SITE_URL);
      const data = response.data;
      setRequests(data.requests);
      setRequested(data.requested);
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  const cancelRequest = async (id) => {
    try {
      const result = await showConfirmAlert(
        "Are you sure?",
        "Want to cancel this request."
      );
      if (result.isConfirmed) {
        await ApiService.deleteData(`${ON_SITE_URL}/${id}`);
        fetchData();
        showSuccessToast("Successfully Cancelled");
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const updateRequest = async (id, status) => {
    try {
      const result = await showConfirmAlert(
        "Are you sure?",
        `Want to ${status} this request.`
      );
      if (result.isConfirmed) {
        const formData = {
          id: id,
          status: status,
        };

        await ApiService.updateData(ON_SITE_URL, formData);
        fetchData();
        showSuccessToast("Successfully Updated");
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
      accessorKey: "p_name",
      header: "Property",
      cell: (info) => (
        <Link to={`/user/property-details/${info.row.original.p_id}`}>
          <SimpleTextCell value={info.getValue()} />{" "}
        </Link>
      ),
    },
    {
      accessorKey: "p_type",
      header: "Property Type",
      cell: (info) => <SimpleTextCell value={info.getValue()} />,
    },
    {
      accessorKey: "p_price",
      header: "Property Price",
      cell: (info) => <SimpleTextCell value={` ₹ ${info.getValue()} .00`} />,
    },
    {
      accessorKey: "date",
      header: "Booking Date",
      cell: (info) => <SimpleTextCell value={formateDate(info.getValue())} />,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => <SimpleTextCell value={info.getValue()} />,
    },
    {
      accessorKey: "b_status",
      header: "Status",
      cell: (info) => (
        <div className="w-max">
          <Chip
            variant="ghost"
            size="sm"
            value={info.getValue()}
            color={statusColors[info.getValue()] || "blue-gray"}
          />
        </div>
      ),
    },
  ];
  const tabs = [
    {
      label: "Requests",
      value: "request",
      data: requests,
      column: [
        {
          accessorKey: "u_image",
          header: "User",
          cell: (info) => (
            <UserAvatar
              name={info.row.original.u_name}
              description={info.row.original.u_contact}
              image={info.getValue()}
            />
          ),
        },
        ...columns,
        {
          accessorKey: "id",
          header: "Action",
          cell: (info) =>
            info.row.original.b_status == "Pending" && (
              <div className="flex gap-2">
                <Tooltip content="Confirm Request">
                  <Button
                    className="flex items-center gap-3"
                    size="md"
                    color="cyan"
                    variant="gradient"
                    onClick={() =>
                      updateRequest(info.row.original.id, Status.APPROVED)
                    }
                  >
                    Accept
                  </Button>
                </Tooltip>
                <Tooltip content="Reject Request">
                  <Button
                    className="flex items-center gap-3"
                    size="md"
                    color="indigo"
                    variant="gradient"
                    onClick={() =>
                      updateRequest(info.row.original.id, Status.REJECTED)
                    }
                  >
                    Reject
                  </Button>
                </Tooltip>
              </div>
            ),
        },
      ],
    },
    {
      label: "Requested",
      value: "requested",
      data: requested,
      column: [
        {
          accessorKey: "o_image",
          header: "Owner",
          cell: (info) => (
            <UserAvatar
              name={info.row.original.o_name}
              description={info.row.original.o_contact}
              image={info.getValue()}
            />
          ),
        },
        ...columns,
        {
          accessorKey: "id",
          header: "Action",
          cell: (info) =>
            info.row.original.b_status == "Pending" && (
              <Tooltip content="Cancel Booking">
                <Button
                  className="flex items-center gap-3"
                  size="md"
                  color="amber"
                  variant="gradient"
                  onClick={() => cancelRequest(info.row.original.id)}
                >
                  Cancel
                </Button>
              </Tooltip>
            ),
        },
      ],
    },
  ];
  return (
    <section>
      <div className="mb-0 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Onsite View list
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See the list of onsite requests
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row"></div>
      </div>
      <div className="my-5">
        <Tabs value="request">
          <TabsHeader className="w-64">
            {tabs.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {tabs.map(({ value, data, column }) => (
              <TabPanel key={value} value={value}>
                <DataTable data={data} columns={column} />
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </section>
  );
};

export default OnsiteRequestPage;
