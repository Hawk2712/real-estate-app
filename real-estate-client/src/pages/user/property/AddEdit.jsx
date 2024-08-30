import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
  Textarea,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { PropertySchema } from "../../../schema/Schema";
import { cloneElement, useEffect, useState } from "react";
import {
  PROPERTY_TYPES,
  statesInIndia,
  STATUS,
} from "../../../config/constants";
import { useAlert } from "../../../lib/hooks/useAlert";
import { ApiService } from "../../../api/api-service";
import { useNavigate, useParams } from "react-router-dom";
import { PROPERTY_URL } from "./Page";

const AddEditProperty = () => {
  const { showErrorToast, showSuccessToast, showConfirmAlert } = useAlert();
  const [defaultVal, setDefaultVal] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(PropertySchema),
    defaultValues: defaultVal,
  });

  const onSubmit = async (data) => {
    const result = await showConfirmAlert(
      "Are you sure?",
      "Want to register/update this property."
    );
    if (result.isConfirmed) {
      try {
        if (data) {
          const formDataToSend = new FormData();

          Object.keys(data).forEach((key) => {
            if (key !== "image") {
              formDataToSend.append(key, data[key]);
            } else {
              // Ensure 'data.image' is an array and get the first file
              if (data.image && data.image.length > 0) {
                formDataToSend.append("upload", "Property");
                formDataToSend.append("image", data.image[0]);
              }
            }
          });

          if (id) {
            formDataToSend.append("id", id);
            await ApiService.updateData(PROPERTY_URL, formDataToSend);
            await showSuccessToast("Property Updated successfully");
          } else {
            await ApiService.createData(PROPERTY_URL, formDataToSend);
            await showSuccessToast("Property Registered successfully");
          }

          navigate("/user/property");
        }
      } catch (error) {
        showErrorToast(error.message);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await ApiService.fetchData(`${PROPERTY_URL}/${id}`);

      const {
        type,
        address,
        area,
        description,
        image,
        landmark,
        map,
        name,
        pincode,
        price,
        sq_ft,
        state,
        status,
      } = response.data;

      const defaultValue = {
        type: type,
        address: address,
        area: area,
        description: description,
        image: image,
        landmark: landmark,
        map: map,
        name: name,
        pincode: pincode,
        price: price,
        sq_ft: sq_ft,
        state: state,
        status: status,
      };

      setDefaultVal(defaultValue);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    reset(defaultVal);
  }, [defaultVal]);
  useEffect(() => {
    id && fetchData();
  }, [id]);
  return (
    <>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-0 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  {id ? "Edit Property" : "  Add Property"}
                </Typography>
                <Typography
                  variant="small"
                  className="text-gray-600 font-normal"
                >
                  Fill the required details below to {id ? "edit " : "add "}
                  property record.
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-3"
                  size="md"
                  type="submit"
                >
                  <PlusCircleIcon strokeWidth={2} className="h-4 w-4" />
                  Submit
                </Button>
              </div>
            </div>
            <div className="form-content">
              <div className="grid grid-cols-2 gap-2 my-6">
                <div>
                  <Input
                    color="gray"
                    label="Property Title"
                    size="lg"
                    className="w-full"
                    {...register("name")}
                  />
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.name?.message}
                  </Typography>
                </div>
                <div>
                  <Controller
                    name="type"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        size="lg"
                        label="Select Type"
                        selected={(element) =>
                          element &&
                          cloneElement(element, {
                            disabled: true,
                            className:
                              "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                          })
                        }
                        {...field}
                      >
                        {PROPERTY_TYPES.map((value) => (
                          <Option
                            key={value}
                            value={value}
                            className="flex items-center gap-2"
                          >
                            {value}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />

                  <Typography variant="small" color="red" className="mt-1">
                    {errors.type?.message}
                  </Typography>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 my-6">
                <div>
                  <Input
                    color="gray"
                    label="Sq ft"
                    size="lg"
                    className="w-full"
                    {...register("sq_ft")}
                  />
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.sq_ft?.message}
                  </Typography>
                </div>
                <div>
                  <Input
                    color="gray"
                    label="Property Price"
                    size="lg"
                    className="w-full"
                    {...register("price")}
                  />
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.price?.message}
                  </Typography>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 my-6">
                <div>
                  <Controller
                    name="state"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        size="lg"
                        label="Select State"
                        selected={(element) =>
                          element &&
                          cloneElement(element, {
                            disabled: true,
                            className:
                              "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                          })
                        }
                        {...field}
                      >
                        {statesInIndia.map((value) => (
                          <Option
                            key={value}
                            value={value}
                            className="flex items-center gap-2"
                          >
                            {value}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.state?.message}
                  </Typography>
                </div>
                <div>
                  <Input
                    color="gray"
                    label="Area"
                    size="lg"
                    className="w-full"
                    {...register("area")}
                  />
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.area?.message}
                  </Typography>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 my-6">
                <div>
                  <Input
                    color="gray"
                    label="Landmark"
                    size="lg"
                    className="w-full"
                    {...register("landmark")}
                  />
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.landmark?.message}
                  </Typography>
                </div>
                <div>
                  <Input
                    color="gray"
                    label="Pin-code"
                    size="lg"
                    className="w-full"
                    {...register("pincode")}
                  />
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.pincode?.message}
                  </Typography>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 my-6">
                <div>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        size="lg"
                        label="Select Status"
                        selected={(element) =>
                          element &&
                          cloneElement(element, {
                            disabled: true,
                            className:
                              "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                          })
                        }
                        {...field}
                      >
                        {STATUS.map((value) => (
                          <Option
                            key={value}
                            value={value}
                            className="flex items-center gap-2"
                          >
                            {value}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.status?.message}
                  </Typography>
                </div>
                <div>
                  <Input
                    color="gray"
                    label="Image"
                    size="lg"
                    className="w-full"
                    type="file"
                    {...register("image")}
                  />
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.image?.message}
                  </Typography>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 my-6">
                <div>
                  <Textarea label="Address" {...register("address")} />
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.address?.message}
                  </Typography>
                </div>
                <div>
                  <Textarea label="Embedded Map" {...register("map")} />
                  <Typography variant="small" color="red" className="mt-1">
                    {errors.map?.message}
                  </Typography>
                </div>
              </div>

              <div className="my-6">
                <Textarea label="Description" {...register("description")} />
                <Typography variant="small" color="red" className="mt-1">
                  {errors.description?.message}
                </Typography>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};
export default AddEditProperty;
