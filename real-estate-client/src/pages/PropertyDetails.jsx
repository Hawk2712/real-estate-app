import { Link, useParams } from "react-router-dom";
import { useAlert } from "../lib/hooks/useAlert";
import { ApiService } from "../api/api-service";
import { PROPERTY_URL } from "./user/property/Page";
import { useEffect, useState } from "react";

import {
  Button,
  IconButton,
  Rating,
  Typography,
  Chip,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  CardHeader,
  Avatar,
} from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { API_URL } from "../config/env-helper";
import UserAvatar from "../components/UserAvatar";
import {
  BackspaceIcon,
  GlobeAltIcon,
  HomeModernIcon,
  LifebuoyIcon,
  MapIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  ShoppingBagIcon,
  Square2StackIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookingSchema, OnsiteSchema } from "../schema/Schema";
import { BOOKING_URL } from "./user/bookings/Page";
import { ON_SITE_URL } from "./user/onsite/Page";
import { Role, Status, statusColors } from "../config/constants";
import { useAuth } from "../lib/hooks/useAuth";

const PropertyDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { showErrorToast, showConfirmAlert, showSuccessToast } = useAlert();
  const { isLoggedIn, role } = useAuth();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [onsiteOpen, setOnsiteOpen] = useState(false);
  const handleOnsiteOpen = () => setOnsiteOpen((cur) => !cur);

  const fetchData = async () => {
    try {
      const response = await ApiService.fetchData(`${PROPERTY_URL}/${id}`);
      setData(response.data);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const propertyStatus = async (status) => {
    try {
      const result = await showConfirmAlert(
        "Are you sure?",
        "Want to update status."
      );
      if (result.isConfirmed) {
        const data = { id: id, status: status };
        await ApiService.updateData(`${PROPERTY_URL}/status`, data);
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
  return (
    <section>
      <div className="mx-auto container grid  grid-cols-1 md:grid-cols-2 py-4">
        <div>
          <img
            src={API_URL + data.image}
            alt={data.name}
            width={600}
            height={30}
            className="rounded-sm"
          />
          <div className="py-5">
            <div dangerouslySetInnerHTML={{ __html: data.map }} />
          </div>
        </div>

        <div className="py-5">
          <Typography className="mb-4" variant="h3">
            {data.name}
          </Typography>
          <Typography variant="h5">₹ {data.price} .00 </Typography>
          <div className="flex items-center gap-2 my-3">
            {(data.is_owner || (isLoggedIn && role === Role.ADMIN)) && (
              <Chip
                color={statusColors[data.status] || "blue-gray"}
                className="flex items-center gap-1.5 font-normal"
                value={data.status}
              />
            )}

            <Chip
              variant="outlined"
              value={data.type}
              className="rounded-full p-2"
              icon={<TagIcon strokeWidth={2} className="w-4 h-4" />}
            />
            <Chip
              variant="outlined"
              value={`${data.sq_ft} sq.ft`}
              className="rounded-full p-2"
              icon={<Square2StackIcon strokeWidth={2} className="w-4 h-4" />}
            />
          </div>

          <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
            {data.description}
          </Typography>
          <div className="my-8 flex items-center gap-2">
            {/* <Rating value={4} className="text-amber-500" />
            <Typography className="!text-sm font-bold !text-gray-700">
              4.0/5 (100 reviews)
            </Typography> */}

            <UserAvatar
              name={data.owner_name}
              image={data.owner_image}
              description={data.owner_contact}
            />
          </div>
          <Typography color="blue-gray" variant="h6"></Typography>

          <div className="mb-4 flex w-full items-center gap-3 md:w-1/2">
            {isLoggedIn && role === Role.ADMIN ? (
              data.status === Status.ACTIVE ||
              data.status === Status.DEACTIVATE ? (
                <Button
                  className="flex items-center gap-2"
                  size="md"
                  color="indigo"
                  onClick={() => propertyStatus(Status.ADMIN_BLOCK)}
                >
                  Block
                </Button>
              ) : (
                <Button
                  className="flex items-center gap-2"
                  size="md"
                  color="cyan"
                  onClick={() => propertyStatus(Status.ACTIVE)}
                >
                  Enable
                </Button>
              )
            ) : data.is_owner ? (
              data.status !== Status.SOLD &&
              data.status !== Status.ADMIN_BLOCK && (
                <>
                  <Link to={`/user/add-edit-property/${data.id}`}>
                    <Button
                      className="flex items-center gap-2"
                      size="md"
                      color="indigo"
                    >
                      <PencilSquareIcon strokeWidth={2} className="h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  {/* <Button
                    className="flex items-center gap-2"
                    size="md"
                    color="red"
                  >
                    <TrashIcon strokeWidth={2} className="h-4 w-4" />
                    Delete
                  </Button> */}
                </>
              )
            ) : (
              data.status !== Status.SOLD && (
                <>
                  <BookProperty
                    handleOpen={handleOpen}
                    open={open}
                    property_id={data.id}
                    owner_id={data.owner_id}
                    price={data.price}
                  />
                  <Button color="gray" className="w-auto" onClick={handleOpen}>
                    Book Property
                  </Button>
                  <OnSiteView
                    handleOpen={handleOnsiteOpen}
                    open={onsiteOpen}
                    owner_id={data.owner_id}
                    property_id={data.id}
                  />
                  <Button
                    color="gray"
                    className="w-auto"
                    onClick={handleOnsiteOpen}
                  >
                    Request to view
                  </Button>
                </>
              )
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
            <Typography
              color="blue-gray"
              className="flex gap-2 items-center font-medium"
            >
              <GlobeAltIcon strokeWidth={2} className="h-4 w-4" />
              {data.state}
            </Typography>
            <Typography
              color="blue-gray"
              className="flex gap-2 items-center font-medium"
            >
              <MapPinIcon strokeWidth={2} className="h-4 w-4" />
              {data.pincode}
            </Typography>
          </div>
          <div className="mt-3">
            <Typography
              color="blue-gray"
              className="flex gap-2 items-center font-sans"
            >
              <MapIcon strokeWidth={2} className="h-4 w-4" />
              {data.area}
            </Typography>
            <Typography
              color="blue-gray"
              className="flex gap-2 items-center font-sans"
            >
              <LifebuoyIcon strokeWidth={2} className="h-4 w-4" />
              {data.landmark}
            </Typography>
            <Typography
              color="blue-gray"
              className="flex gap-2 items-center font-sans"
            >
              <HomeModernIcon strokeWidth={2} className="h-4 w-4" />
              {data.address}
            </Typography>
            <div className="review my-4 border-t-2">
              {data.review &&
                data.review.map(({ name, image, contact, review_message }) => (
                  <div className="my-3">
                    <UserAvatar
                      name={name}
                      image={image}
                      description={contact}
                    />
                    <Typography className="font-light" color="gray">
                      {review_message}
                    </Typography>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PropertyDetails;

const BookProperty = ({ open, handleOpen, property_id, owner_id, price }) => {
  const { showErrorToast, showSuccessToast, showConfirmAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(BookingSchema),
  });

  const onSubmit = async (data) => {
    try {
      await handleOpen();
      const result = await showConfirmAlert(
        "Are you sure?",
        "Want to book this property."
      );
      if (result.isConfirmed) {
        const formData = {
          owner_id: owner_id,
          property_id: property_id,
          ...data,
        };

        await ApiService.createData(BOOKING_URL, formData);
        showSuccessToast("Successfully booked");
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  useEffect(() => {
    open && reset();
  }, [open]);
  return (
    <Dialog size="md" open={open} handler={handleOpen} className="p-2">
      <DialogHeader className="justify-between">
        <div>
          <Typography variant="h5" color="blue-gray">
            Book Property
          </Typography>
          <Typography color="gray" variant="paragraph">
            Fill the below details to submit booking
          </Typography>
        </div>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody className="overflow-y-auto !px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              color="gray"
              label="Booking Price"
              size="lg"
              className="w-full"
              defaultValue={price}
              min={price}
              {...register("booking_cost")}
            />
            <Typography variant="small" color="red" className="mt-1 text-start">
              {errors.booking_cost?.message}
            </Typography>
          </div>
          <div className="my-6">
            <Textarea label="Description" {...register("description")} />
            <Typography variant="small" color="red" className="mt-1">
              {errors.description?.message}
            </Typography>
          </div>
          <div className="flex gap-2 items-end justify-end">
            <Button
              className="flex items-center gap-3"
              size="md"
              variant="text"
              onClick={handleOpen}
            >
              Cancel
            </Button>
            <Button className="flex items-center gap-3" size="md" type="submit">
              <ShoppingBagIcon strokeWidth={2} className="w-4 h-4" />
              Book Now
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

const OnSiteView = ({ open, handleOpen, property_id, owner_id }) => {
  const { showErrorToast, showSuccessToast, showConfirmAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(OnsiteSchema),
  });

  const onSubmit = async (data) => {
    try {
      await handleOpen();
      const result = await showConfirmAlert(
        "Are you sure?",
        "Want to request to view this property."
      );
      if (result.isConfirmed) {
        const formData = {
          owner_id: owner_id,
          property_id: property_id,
          ...data,
        };

        await ApiService.createData(ON_SITE_URL, formData);
        showSuccessToast("Successfully requested");
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  useEffect(() => {
    open && reset();
  }, [open]);
  return (
    <Dialog size="md" open={open} handler={handleOpen} className="p-2">
      <DialogHeader className="justify-between">
        <div>
          <Typography variant="h5" color="blue-gray">
            Request Onsite View
          </Typography>
          <Typography color="gray" variant="paragraph">
            Fill the below details to onsite view
          </Typography>
        </div>
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody className="overflow-y-auto !px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              color="gray"
              label="Date"
              size="lg"
              className="w-full"
              type="date"
              {...register("date")}
            />
            <Typography variant="small" color="red" className="mt-1 text-start">
              {errors.date?.message}
            </Typography>
          </div>
          <div className="my-6">
            <Textarea label="Description" {...register("description")} />
            <Typography variant="small" color="red" className="mt-1">
              {errors.description?.message}
            </Typography>
          </div>
          <div className="flex gap-2 items-end justify-end">
            <Button
              className="flex items-center gap-3"
              size="md"
              variant="text"
              onClick={handleOpen}
            >
              Cancel
            </Button>
            <Button className="flex items-center gap-3" size="md" type="submit">
              <PaperAirplaneIcon strokeWidth={2} className="w-4 h-4" />
              Request Now
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};
