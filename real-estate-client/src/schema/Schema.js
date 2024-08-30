import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
    name: yup.string().min(3, "Please enter the valid name"),
    contact: yup.string().length(10, "Invalid contact number"),
    email: yup.string().email().required("Email is required"),
    address: yup.string().min(10, "Please enter valid address"),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Passwords must match')
});

export const LoginSchema = yup.object().shape({
    email: yup.string().email("Enter valid email address").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const PropertySchema = yup.object().shape({
    name: yup.string().min(3, "Please enter a valid property name of at least 3 characters").required("Property name is required"),
    type: yup.string().required("Please select a property type"),
    price: yup.number().typeError("Price must be a number").required("Price is required"),
    sq_ft: yup.number().typeError("Square footage must be a number").required("Square footage is required"),
    state: yup.string().required("State is required"),
    area: yup.string().required("Area is required"),
    landmark: yup.string().required("Landmark is required"),
    status: yup.string().required("Status is required"),
    address: yup.string().required("Address is required"),
    pincode: yup.string().matches(/^\d{5,6}$/, "Pincode must be 5 or 6 digits").required("Pincode is required"),
    map: yup.string().required("Embedded map is required"),
    image: yup.mixed()
        // .test('fileSize', 'File size is too large (max 5MB)', async (value) => {
        //     if (!value || value.length === 0) return true; // File is optional
        //     return await value[0].size <= MAX_FILE_SIZE;
        // })
        .test('fileType', 'Unsupported file type', async (value) => {
            if (!value || value.length === 0) return true; // File is optional
            return await value[0]?.type?.startsWith('image/');
        })
        .nullable()
        .optional(),
    description: yup.string().min(10, "Description should be at least 10 characters long").required("Description is required"),
});

export const BookingSchema = yup.object().shape({
    booking_cost: yup.string().required("Booking cost is required"),
    description: yup.string().min(10, "Description should be at least 10 characters long").required("Description is required"),
});

export const OnsiteSchema = yup.object().shape({
    date: yup.string().required("Onsite Date is required"),
    description: yup.string().min(10, "Description should be at least 10 characters long").required("Description is required"),
});

export const ProfileSchema = yup.object().shape({
    image: yup.mixed()
        .test('fileSize', 'File size is too large (max 5MB)', async (value) => {
            if (!value || value.length === 0) return true; // File is optional
            return await value[0].size <= MAX_FILE_SIZE;
        })
        .test('fileType', 'Unsupported file type', async (value) => {
            if (!value || value.length === 0) return true; // File is optional
            return await value[0]?.type?.startsWith('image/');
        })
        .nullable()
        .optional(),
    contact: yup.string().length(10, "Invalid contact number"),
    address: yup.string().min(10, "Please enter valid address"),
    email: yup.string().email().required("Please enter valid email"),
    password: yup.string().optional(),
});

export const PropertyReviewSchema = yup.object().shape({
    review_message: yup.string().min(10, "Please enter valid review message"),
})