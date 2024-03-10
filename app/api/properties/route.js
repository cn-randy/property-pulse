import { StatusCodes } from "http-status-codes";
import connectDB from "@/config/database";
import Property from "@/models/Property";

/**
 ** Fetch protrties  from database
 *
 * @method GET
 * @url /api/properties
 * @param request    -- http request object
 *
 * @returns {Promise<Response>}
 */
export const GET = async function (request) {
  try {
    await connectDB();

    const properties = await Property.find();

    return new Response(JSON.stringify({ properties }), {
      status: StatusCodes.OK,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify("Something went wrong"), {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};
