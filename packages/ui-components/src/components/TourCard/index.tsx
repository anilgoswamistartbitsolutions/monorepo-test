import Link from 'next/link';
import Image from 'next/image';
import { TourCardProps } from '@travel-platform/shared-utils';

const TourCard: React.FC<TourCardProps> = ({ 
  tour, 
  variant = 'default', 
  showPrice = true,
  className = ''
}) => {
  // Helper function to render stars
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {/* Full stars */}
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <svg
              key={index}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.39 7.27L22 9.27l-5.5 4.21L17.18 22 12 17.27 6.82 22l.68-8.52L2 9.27l7.61-1L12 2z" />
            </svg>
          ))}
        {/* Half star */}
        {halfStar && (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="halfStarGradient"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="0%"
              >
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#9CA3AF" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l2.39 7.27L22 9.27l-5.5 4.21L17.18 22 12 17.27 6.82 22l.68-8.52L2 9.27l7.61-1L12 2z"
              fill="url(#halfStarGradient)"
            />
          </svg>
        )}
        {/* Empty stars */}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <svg
              key={index}
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l2.39 7.27L22 9.27l-5.5 4.21L17.18 22 12 17.27 6.82 22l.68-8.52L2 9.27l7.61-1L12 2z" />
            </svg>
          ))}
      </div>
    );
  };

  const variantStyles = {
    default: {
      card: 'bg-white dark:bg-gray-800',
      price: 'bg-blue-600',
      title: 'group-hover:text-blue-600'
    },
    luxury: {
      card: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20',
      price: 'bg-yellow-600',
      title: 'group-hover:text-yellow-600'
    },
    adventure: {
      card: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      price: 'bg-green-600',
      title: 'group-hover:text-green-600'
    },
    family: {
      card: 'bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20',
      price: 'bg-pink-600',
      title: 'group-hover:text-pink-600'
    }
  };

  const currentVariant = variantStyles[variant];

  return (
    <Link href={`/tours/${tour.slug}`} className={`group ${className}`}>
      <div className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${currentVariant.card}`}>
        <div className="relative overflow-hidden">
          <Image
            src={tour.image}
            alt={tour.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {showPrice && (
            <div className={`absolute top-3 right-3 rounded-full py-1 px-4 ${currentVariant.price}`}>
              <p className="text-white font-medium text-sm">
                {tour.pricing.currency}{tour.pricing.basePrice}
              </p>
            </div>
          )}
          {tour.featured && (
            <div className="absolute top-3 left-3 rounded-full py-1 px-3 bg-red-500">
              <p className="text-white font-medium text-xs">Featured</p>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
            {tour.duration.days} Days / {tour.duration.nights} Nights
          </p>
          <h4 className={`text-gray-900 dark:text-white text-xl font-semibold mb-3 ${currentVariant.title} transition-colors duration-300`}>
            {tour.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {tour.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>{renderStars(tour.rating)}</div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({tour.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard; 