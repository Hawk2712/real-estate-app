import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  // DialogFooter,
  Textarea,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { PropertyReviewSchema } from "../schema/Schema";
import { ApiService } from "../api/api-service";
import { BOOKING_URL } from "../pages/user/bookings/Page";
import { useAlert } from "../lib/hooks/useAlert";

const PropertyReview = ({ property_id, open, handleOpen }) => {
  const { showErrorToast, showSuccessToast, showConfirmAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(PropertyReviewSchema),
  });
  const onSubmit = async (data) => {
    try {
      const result = await showConfirmAlert(
        "Are you sure?",
        "Want to add review. This action cannot be undone !"
      );
      if (result.isConfirmed) {
        const formData = { property_id: property_id, ...data };
        await ApiService.createData(`${BOOKING_URL}/add-review`, formData);
        showSuccessToast("Successfully Added");
        reset();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  return (
    <Dialog open={open} handler={handleOpen} size="md" className="p-2">
      <DialogHeader className="justify-between">
        <div>
          <Typography variant="h5" color="blue-gray">
            Add Review Property
          </Typography>
          <Typography color="gray" variant="paragraph">
            Fill the below to submit review message
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
      <DialogBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea label="Review Message" {...register("review_message")} />
          <Typography variant="small" color="red" className="mt-1">
            {errors.review_message?.message}
          </Typography>
          <div className="flex gap-2 justify-end my-3">
            <Button variant="text" color="red" onClick={handleOpen}>
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" type="submit">
              <span>Confirm</span>
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};
export default PropertyReview;
