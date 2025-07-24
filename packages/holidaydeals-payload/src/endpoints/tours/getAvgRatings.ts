import type { PayloadRequest } from 'payload'

export const getAverageRating = async (req: PayloadRequest) => {
  const  id  = req?.routeParams?.id

  try {
    const reviews = await req.payload.find({
      collection: 'reviews',
      where: {
        tour: {
          equals: id,
        },
        status: {
          equals: 'approved',
        },
      },
      limit: 1000,
      depth: 0,
    })

    const ratings = reviews.docs.map((r: any) => r.rating)
    const total = ratings.length
    const average =
      total > 0 ? parseFloat((ratings.reduce((sum, r) => sum + r, 0) / total).toFixed(2)) : 0

    return Response.json({
      tourId: id,
      totalReviews: total,
      averageRating: average,
    })
  } catch (error) {
    console.error('Error fetching average rating:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
