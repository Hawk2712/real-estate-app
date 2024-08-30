import { useEffect, useState } from "react";
import { useAlert } from "../lib/hooks/useAlert";
import { useAuth } from "../lib/hooks/useAuth";
import { ApiService } from "../api/api-service";
import { PROPERTY_URL } from "./user/property/Page";
import { Typography, Button } from "@material-tailwind/react";
import ProductCard from "../components/ProductCard";
import { Role } from "../config/constants";
const IndexPage = () => {
  const [data, setData] = useState([]);

  const { showErrorToast, showSuccessToast } = useAlert();
  const { isLoggedIn, role } = useAuth();
  const fetchData = async () => {
    try {
      let response;
      const roles = { role: role };
      if (isLoggedIn && role != Role.ADMIN) {
        response = await ApiService.fetchData("auth/show-others-properties");
      } else {
        response = await ApiService.fetchData("auth/show-all-properties", role);
      }

      setData(response.data);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="main-container">
      <div className="mb-0 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Available properties
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See the list of properties
          </Typography>
        </div>
      </div>
      <div className="content-block grid md:grid-cols-3 sm:grid-cols-1 gap-6 my-5">
        {data.map((property) => (
          <ProductCard key={property.id} {...property} />
        ))}
      </div>
    </section>
  );
};
export default IndexPage;
