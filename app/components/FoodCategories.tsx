import AnimatedSection from './AnimatedSection';
// import FeaturedFoods from './FeaturedFoods';

export default function FoodCategories() {
  const categories = [
    {
      id: 1,
      name: 'Pizza',
      icon: '🍕',
      description: 'Wood-fired pizzas',
    },
    {
      id: 2,
      name: 'Burgers',
      icon: '🍔',
      description: 'Juicy burgers',
    },
    {
      id: 3,
      name: 'Desserts',
      icon: '🍰',
      description: 'Sweet treats',
    },
    {
      id: 4,
      name: 'Drinks',
      icon: '🥤',
      description: 'Cold beverages',
    },
  ];

  return (
    <AnimatedSection className="py-10 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
            Browse Our Menu
          </h2>

          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300">
            Choose your favorite category
          </p>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

          {categories.map((category) => (
            <div
              key={category.id}
              className="
                group
                bg-white dark:bg-gray-800
                rounded-3xl
                p-5 md:p-7
                flex flex-col items-center justify-center text-center
                shadow-sm
                hover:shadow-2xl
                hover:-translate-y-1
                transition-all duration-300
                cursor-pointer
                border border-gray-100 dark:border-gray-700
              "
            >

              {/* ICON */}
              <div className="text-5xl md:text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white mb-1">
                {category.name}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                {category.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </AnimatedSection>
  );
}