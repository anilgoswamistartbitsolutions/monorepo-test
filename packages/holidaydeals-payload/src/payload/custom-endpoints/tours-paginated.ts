import type { RequestHandler } from 'express';

const handler: RequestHandler = async (req, res) => {
  try {
    // Extract page and limit query params with defaults
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

    if (!req.payload) {
      throw new Error('Payload instance not available on request');
    }

    // Query the 'tours' collection with pagination
    const result = await req.payload.find({
      collection: 'tours',
      page,
      limit,
    });

    // Return paginated data in JSON format
    return res.status(200).json({
      success: true,
      data: result.docs,
      pagination: {
        page: result.page,
        limit: result.limit,
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Error in /tours-paginated:', error);

    // Return error response
    return res.status(500).json({
      success: false,
      message: (error as Error).message || 'Server error',
    });
  }
};

export default handler;
