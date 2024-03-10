"use client";

// Node modules
import { useEffect, useState } from "react";
import { FaArrowLeft, FaBookmark, FaPaperPlane, FaShare } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";

import { URL } from "@/utils/constants";
import { fetchProperty } from "@/utils/request";

import Spinner from "@/components/spinner";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertDetails from "@/components/PropertDetails";

const PropertyPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const response = await fetchProperty(id);
        setProperty(response.property);
      } catch (error) {
        console.error("Error fetching property: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData(id);
    }
  }, [id, property]);

  if (!property && !isLoading) {
    return (
      <h1 className="text-cemter text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  }
  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }

  if (!isLoading && property) {
    return (
      <>
        {/* <!--Property Header Image --> */}
        <PropertyHeaderImage image={property.images[0]} />
        <section>
          <div className="container m-auto py-6 px-6">
            <Link
              href={URL.PROPERTIES}
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <FaArrowLeft className="mr-2"></FaArrowLeft> Back to Properties
            </Link>
          </div>
        </section>

        {/* <!--Property Info --> */}
        <section className="bg-blue-50">
          <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
              <PropertDetails property={property} />
              {/* <!--Sidebar-- */}
              <aside className="space-y-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                  <FaBookmark className="mr-2"></FaBookmark> Bookmark Property
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                  <FaShare className="mr-2"></FaShare> Share Property
                </button>

                {/* <!--Contact Form --> */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-6">
                    Contact Property Manager
                  </h3>
                  <form>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Name:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="phone"
                      >
                        Phone:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="text"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="message"
                      >
                        Message:
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                        id="message"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>
                    <div>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                        type="submit"
                      >
                        <FaPaperPlane className="mr-2"></FaPaperPlane> Send
                        Message
                      </button>
                    </div>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </>
    );
  }
};
export default PropertyPage;
