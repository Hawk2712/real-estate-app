import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ApiService } from "../../../api/api-service";
import { useEffect, useState } from "react";
import { useAlert } from "../../../lib/hooks/useAlert";
import ProductCard from "../../../components/ProductCard";

export const PROPERTY_URL = "property";
const PropertyPage = () => {
  const [propertyData, setPropertyData] = useState([]);
  const { showErrorToast, showSuccessToast } = useAlert();

  const fetchData = async () => {
    try {
      const response = await ApiService.fetchData(PROPERTY_URL);
      setPropertyData(response.data);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section>
      <div className="mb-0 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Property list
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See the list of your properties
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link to={"/user/add-edit-property"}>
            <Button className="flex items-center gap-3" size="md">
              <PlusCircleIcon strokeWidth={2} className="h-4 w-4" />
              Add Property
            </Button>
          </Link>
        </div>
      </div>
      <div className="content-block grid md:grid-cols-3 sm:grid-cols-1 gap-6 my-5">
        {propertyData.map((property) => (
          <ProductCard key={property.id} {...property} />
        ))}
      </div>
    </section>
  );
};
export default PropertyPage;
