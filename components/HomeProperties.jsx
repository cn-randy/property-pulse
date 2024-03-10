import Link from "next/link";
import isEmpty from "lodash-es/isEmpty";
import { URL } from "@/utils/constants";
import PropertyCard from "@/components/PropertyCard";

const fetchProperties = async function () {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
const HomeProperties = async () => {
  const { properties } = await fetchProperties();

  const recentProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isEmpty(recentProperties) && <p>No properties found</p>}

            {!isEmpty(recentProperties) &&
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href={URL.PROPERTIES}
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};
export default HomeProperties;
