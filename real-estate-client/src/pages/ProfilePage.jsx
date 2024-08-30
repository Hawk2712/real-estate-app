import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import user from "../assets/images/user.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { API_URL } from "../config/env-helper";
import { useAuth } from "../lib/hooks/useAuth";
import { ProfileSchema } from "../schema/Schema";
import { ApiService } from "../api/api-service";
import { useAlert } from "../lib/hooks/useAlert";
import { Role } from "../config/constants";

const FETCH_USER = "auth/get-user";
export const UPDATE_PROFILE = "auth/update-profile";

const ProfilePage = () => {
  const [data, setData] = useState({});
  const [defaultValue, setDefaultValue] = useState({});
  const { showErrorToast, showSuccessToast, showConfirmAlert } = useAlert();
  const { role, setUserImage } = useAuth();
  const formContext = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues: defaultValue,
  });

  const fetchData = async () => {
    try {
      const response = await ApiService.fetchData(FETCH_USER);
      const data = response.data;
      setData(data);
      const { contact, address, image, email } = data;
      const defVal = {
        contact: contact,
        address: address,
        image: image,
        email: email,
      };
      setUserImage(image);
      setDefaultValue(defVal);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (data) {
        const result = await showConfirmAlert(
          "Are you sure?",
          "Want to update profile."
        );
        if (result.isConfirmed) {
          const formDataToSend = new FormData();
          formDataToSend.append("contact", data.contact);
          formDataToSend.append("address", data.address);
          formDataToSend.append("email", data.email);

          if (data.password) {
            formDataToSend.append("password", data.password);
          }
          if (data.image && data.image.length > 0) {
            formDataToSend.append("upload", "Users");
            formDataToSend.append("image", data.image[0]);
          }
          await ApiService.updateData(UPDATE_PROFILE, formDataToSend);
          showSuccessToast("Successfully updated");
          fetchData();
          formContext.reset();
        }
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    formContext.reset(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <form
        onSubmit={formContext.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <Card className="h-full w-full" shadow={false}>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-0 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  User Profile
                </Typography>
                <Typography color="gray" className="mt-1 font-semibold">
                  Update your profile
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-3"
                  size="md"
                  type="submit"
                  onClick={() => formContext.handleSubmit(onSubmit())}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                  Update Profile
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody className="flex gap-4">
            <Card className="w-4/12 border border-gray-300" shadow={false}>
              <CardHeader
                floated={false}
                className="h-72 overflow-hidden relative"
              >
                <img
                  src={data.image ? API_URL + data.image : user}
                  alt="profile-picture"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </CardHeader>
              <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {data.name}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="font-medium"
                  textGradient
                >
                  {data.user_type}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="font-medium"
                  textGradient
                >
                  {data.email}
                </Typography>
              </CardBody>
            </Card>
            <div className="shrink w-full">
              <div className="grid grid-cols-2 gap-2 my-4">
                <div>
                  <Input
                    color="gray"
                    label="Image"
                    size="lg"
                    className="w-full md:max-w-xl"
                    type="file"
                    accept="image/*"
                    {...formContext.register("image")}
                  />

                  <Typography variant="small" color="red" className="mt-1">
                    {formContext.formState.errors.image?.message}
                  </Typography>
                </div>
                <div>
                  <Input
                    color="gray"
                    label="Contact"
                    size="lg"
                    className="w-full md:max-w-xl"
                    {...formContext.register("contact")}
                  />
                  <Typography variant="small" color="red" className="mt-1">
                    {formContext.formState.errors.contact?.message}
                  </Typography>
                </div>
              </div>
              <div className="my-4">
                <Input
                  color="gray"
                  label="Email Address"
                  size="lg"
                  className="w-full"
                  readOnly={role == Role.ADMIN}
                  {...formContext.register("email")}
                />
                <Typography variant="small" color="red" className="mt-1">
                  {formContext.formState.errors.email?.message}
                </Typography>
              </div>
              <div className="my-4">
                <Textarea
                  label="Address"
                  {...formContext.register("address")}
                />
                <Typography variant="small" color="red" className="mt-1">
                  {formContext.formState.errors.address?.message}
                </Typography>
              </div>
              <div className="my-4">
                <Input
                  color="gray"
                  label="Password"
                  size="lg"
                  className="w-full"
                  {...formContext.register("password")}
                />
                <Typography variant="small" color="red" className="mt-1">
                  {formContext.formState.errors.password?.message}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      </form>
    </>
  );
};

export default ProfilePage;
