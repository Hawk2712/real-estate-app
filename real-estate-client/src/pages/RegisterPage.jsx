import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardBody,
  // CardHeader,
  Typography,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "../schema/Schema";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useAlert } from "../lib/hooks/useAlert";
import { ApiService } from "../api/api-service";
import { useNavigate } from "react-router-dom";

export const REGISTER_URL = "auth/register";
const RegisterPage = () => {
  const { showErrorToast, showSuccessToast } = useAlert();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (formData) => {
    try {
      await ApiService.createData(REGISTER_URL, formData);
      await showSuccessToast("Successfully registered");
      reset();
      navigate("/login");
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  return (
    <Card>
      <CardBody>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-0 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Create Account
              </Typography>
              <Typography variant="small" className="text-gray-600 font-normal">
                Fill the required details below.
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="md"
                type="submit"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                Create Account
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 my-6">
            <div>
              <Input
                color="gray"
                label="Name"
                size="lg"
                className="w-full"
                {...register("name")}
              />
              <Typography variant="small" color="red" className="mt-1">
                {errors.name?.message}
              </Typography>
            </div>
            <div>
              <Input
                color="gray"
                label="Contact"
                size="lg"
                className="w-full"
                {...register("contact")}
              />
              <Typography variant="small" color="red" className="mt-1">
                {errors.contact?.message}
              </Typography>
            </div>
          </div>
          <div className="my-6">
            <Input
              color="gray"
              label="Email Address"
              size="lg"
              className="w-full"
              {...register("email")}
            />
            <Typography variant="small" color="red" className="mt-1">
              {errors.email?.message}
            </Typography>
          </div>
          <div className="my-6">
            <Textarea label="Address" {...register("address")} />
            <Typography variant="small" color="red" className="mt-1">
              {errors.address?.message}
            </Typography>
          </div>
          <div className="grid grid-cols-2 gap-2 my-6">
            <div>
              <Input
                color="gray"
                label="Password"
                size="lg"
                className="w-full"
                type="password"
                {...register("password")}
              />
              <Typography variant="small" color="red" className="mt-1">
                {errors.password?.message}
              </Typography>
            </div>
            <div>
              <Input
                color="gray"
                label="Confirm Password"
                size="lg"
                className="w-full"
                type="password"
                {...register("confirmPassword")}
              />
              <Typography variant="small" color="red" className="mt-1">
                {errors.confirmPassword?.message}
              </Typography>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
export default RegisterPage;
