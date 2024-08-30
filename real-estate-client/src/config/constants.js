import { UPDATE_PROFILE } from "../pages/ProfilePage";
import { PROPERTY_URL } from "../pages/user/property/Page";

export const CONTENT_TYPE_JSON = 'application/json';
export const CONTENT_TYPE_FORM = 'multipart/form-data';

export const MULTIPART_URL = [
    PROPERTY_URL, UPDATE_PROFILE
];

export const Role = {
    ADMIN: 'ADMIN',
    User: 'USER'
}

export const PROPERTY_TYPES = ["Commercial", "Agriculture", "Other"]

export const BOOKING_STATUS = [
    "Pending", "Confirmed", "Cancelled", "Completed"
];
export const Status = {
    NOT_STARTED: 'Not Started',
    IN_PROGRESS: 'In Progress',
    PENDING_REVIEW: 'Pending Review',
    REJECTED: 'Rejected',
    COMPLETED: 'Completed',
    APPROVED: 'Approved',
    ACTIVE: 'Active',
    DEACTIVATE: 'Deactivate',
    ADMIN_BLOCK: 'Admin Block',
    SOLD: 'Sold',
    PENDING: 'Pending'
};


export const statusColors = {
    'Not Started': 'blue-gray',
    'In Progress': 'blue',
    'Pending Review': 'orange',
    'Rejected': 'red',
    'Completed': 'green',
    'Approved': 'green',
    'Active': 'green',
    'Deactivate': 'blue-gray',
    'Admin Block': 'red',
    'Sold': 'indigo'
};

export const STATUS = [Status.ACTIVE, Status.DEACTIVATE];

export const statesInIndia = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh",
    "Jammu and Kashmir"
];