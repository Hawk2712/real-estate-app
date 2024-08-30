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
import DataTable from "../../../components/DataTable";
import UserAvatar from "../../../components/UserAvatar";
import SimpleTextCell from "../../../components/SimpleTextCell";
import { useEffect, useState } from "react";
import { useAlert } from "../../../lib/hooks/useAlert";
import { ApiService } from "../../../api/api-service";
import { Status, statusColors } from "../../../config/constants";
import { Link } from "react-router-dom";
import PropertyReview from "../../../components/AddReview";

export const BOOKING_URL = "booking";

const BookingsPage = () => {
  const [requests, setRequests] = useState([]);
  const [requested, setRequested] = useState([]);
  const [open, setOpen] = useState(false);
  const [property_id, setPropertyId] = useState(false);

  const handleOpen = () => setOpen(!open);

  const { showErrorToast, showSuccessToast, showConfirmAlert } = useAlert();

  const fetchData = async () => {
    try {
      const response = await ApiService.fetchData(BOOKING_URL);
      const data = response.data;
      setRequests(data.requests);
      setRequested(data.requested);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const confirmBooking = async (user_id, property_id, booking_id) => {
    try {
      const result = await showConfirmAlert(
        "Are you sure?",
        "Want to confirm this booking."
      );
      if (result.isConfirmed) {
        const formData = {
          user_id: user_id,
          property_id: property_id,
          booking_id: booking_id,
          status: Status.APPROVED,
        };

        await ApiService.updateData(BOOKING_URL, formData);
        fetchData();
        showSuccessToast("Successfully Updated");
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const result = await showConfirmAlert(
        "Are you sure?",
        "Want to cancel this booking."
      );
      if (result.isConfirmed) {
        await ApiService.deleteData(`${BOOKING_URL}/${id}`);
        fetchData();
        showSuccessToast("Successfully Cancelled");
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
      accessorKey: "booking_cost",
      header: "Booking Price",
      cell: (info) => <SimpleTextCell value={` ₹ ${info.getValue()} .00`} />,
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
            info.row.original.p_status != Status.ADMIN_BLOCK &&
            info.row.original.b_status == Status.PENDING && (
              <Tooltip content="Confirm Booking">
                <Button
                  className="flex items-center gap-3"
                  size="md"
                  color="blue-gray"
                  variant="gradient"
                  onClick={() =>
                    confirmBooking(
                      info.row.original.u_id,
                      info.row.original.p_id,
                      info.row.original.id
                    )
                  }
                >
                  Confirm
                </Button>
              </Tooltip>
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
            info.row.original.b_status == Status.PENDING ? (
              <Tooltip content="Cancel Booking">
                <Button
                  className="flex items-center gap-3"
                  size="md"
                  color="amber"
                  variant="gradient"
                  onClick={() => cancelBooking(info.row.original.id)}
                >
                  Cancel
                </Button>
              </Tooltip>
            ) : (
              info.row.original.b_status == Status.APPROVED && (
                <Button
                  className="flex items-center gap-3"
                  size="md"
                  color="light-blue"
                  variant="gradient"
                  onClick={() => {
                    setPropertyId(info.row.original.p_id);
                    handleOpen();
                  }}
                >
                  Add Review
                </Button>
              )
            ),
        },
      ],
    },
  ];

  return (
    <section>
      <PropertyReview
        property_id={property_id}
        handleOpen={handleOpen}
        open={open}
      />
      <div className="mb-0 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Bookings list
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See the list of your bookings
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
export default BookingsPage;
