import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginSchema } from "../schema/Schema";
import { useAlert } from "../lib/hooks/useAlert";
import { ApiService } from "../api/api-service";
import { useAuth } from "../lib/hooks/useAuth";
import { Role } from "../config/constants";

export const LOGIN_URL = "auth/login";
const LoginPage = () => {
  const { showErrorToast, showSuccessToast } = useAlert();
  const { login, setUserImage } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const response = await ApiService.loginUser(LOGIN_URL, formData);
      const { role, image } = response.data;
      if (role == Role.ADMIN) {
        login(role, "/admin/home");
      } else {
        setUserImage(image);
        login(role, "/user/home ");
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <form
      className="grid text-center mt-16  justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <div>
            <Input
              color="gray"
              label="Email"
              size="lg"
              className="w-full"
              type="email"
              {...register("email")}
            />
            <Typography variant="small" color="red" className="mt-1 text-start">
              {errors.email?.message}
            </Typography>
          </div>
          <div>
            <Input
              color="gray"
              label="Password"
              size="lg"
              className="w-full"
              type="password"
              {...register("password")}
            />
            <Typography variant="small" color="red" className="mt-1 text-start">
              {errors.password?.message}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" type="submit" fullWidth>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link to={"/register"}>
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  );
};
export default LoginPage;
