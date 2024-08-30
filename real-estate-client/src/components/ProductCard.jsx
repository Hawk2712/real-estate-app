import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import { API_URL } from "../config/env-helper";
import {
  CurrencyRupeeIcon,
  // EyeDropperIcon,
  EyeIcon,
  // HomeIcon,
  HomeModernIcon,
  MapPinIcon,
  // PlusIcon,
  Square2StackIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { GlobeAltIcon } from "@heroicons/react/16/solid";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/hooks/useAuth";
import { Role, statusColors } from "../config/constants";

const ProductCard = ({
  id,
  image,
  name,
  price,
  sq_ft,
  type,
  description,
  state,
  pincode,
  // created_at,
  // is_active,
  owner_name = null,
  owner_image = null,
  owner_contact = null,
  status,
}) => {
  const { isLoggedIn, role } = useAuth();

  const details = [
    {
      title: `₹ ${price}.00`,
      icon: <CurrencyRupeeIcon strokeWidth={2} className="h-5 w-5" />,
    },
    {
      title: type,
      icon: <TagIcon strokeWidth={2} className="h-5 w-5" />,
    },
    {
      title: `${sq_ft} sqft`,
      icon: <Square2StackIcon strokeWidth={2} className="h-5 w-5" />,
    },
    {
      title: state,
      icon: <GlobeAltIcon strokeWidth={2} className="h-5 w-5" />,
    },
    {
      title: pincode,
      icon: <MapPinIcon strokeWidth={2} className="h-5 w-5" />,
    },
    {
      title: "And many more",
      icon: <HomeModernIcon strokeWidth={2} className="h-5 w-5" />,
    },
  ];
  return (
    <Card className="w-full  shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img src={API_URL + image} alt="ui/ux review check" className="h-72" />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {name}
          </Typography>
          {(owner_name == null ||
            owner_contact == null ||
            (isLoggedIn && role == Role.ADMIN)) && (
            <Chip
              color={statusColors[status] || "blue-gray"}
              className="flex items-center gap-1.5 font-normal"
              value={status}
            />
          )}
        </div>
        <Typography color="gray" className="line-clamp-3 h-32">
          {description}
        </Typography>
        <div className="user-card my-4">
          {isLoggedIn && (owner_name != null || owner_contact !== null) && (
            <UserAvatar
              name={owner_name}
              image={owner_image}
              description={owner_contact}
            />
          )}
        </div>
        <div className="group mt-4 inline-flex flex-wrap items-center gap-4 justify-center">
          {details.map(({ title, icon },index) => (
            <Tooltip content={title} key={index}>
              <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                {icon}
              </span>
            </Tooltip>
          ))}
        </div>
      </CardBody>
      <CardFooter className="pt-3">
        <Link
          to={
            isLoggedIn
              ? role == Role.ADMIN
                ? `/admin/property-details/${id}`
                : `/user/property-details/${id}`
              : "/login"
          }
        >
          <Button
            className="flex items-center text-center justify-center gap-3"
            size="lg"
            fullWidth
          >
            <EyeIcon strokeWidth={2} className="h-4 w-4" />
            View Property
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
