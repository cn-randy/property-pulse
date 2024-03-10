import isEmpty from "lodash-es/isEmpty.js";
import PropertyCard from "@/components/PropertyCard";

const fetchProperties = async function () {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const PropertiesPage = async () => {
  const { properties } = await fetchProperties();

  // sort properties by date
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {isEmpty(properties) && <p>No properties found</p>}
        {!isEmpty(properties) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default PropertiesPage;
