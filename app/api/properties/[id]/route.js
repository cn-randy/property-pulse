import { StatusCodes } from "http-status-codes";
import connectDB from "@/config/database";
import { Property } from "@/models/Property";

/**
 ** Fetch a single property by id
 *
 *? @method GET
 *? @url /api/properties:id
 *
 *? @param request    - http request object
 *? @param params     - request url parameters
 *
 *? @returns {Promise<Response>}
 */
export const GET = async function (request, { params }) {
  try {
    await connectDB();

    const property = await Property.findById(params.id);
    if (!property) {
      return new Response(
        JSON.stringify("Property not found", { status: StatusCodes.NOT_FOUND }),
      );
    }

    return new Response(JSON.stringify({ property }), {
      status: StatusCodes.OK,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Something went wrong" }),
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    );
  }
};
