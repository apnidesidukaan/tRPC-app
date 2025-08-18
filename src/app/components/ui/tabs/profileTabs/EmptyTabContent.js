
export const EmptyTabContent = ({ icon: Icon, title, message }) => (
  <div className="text-center py-8 sm:py-12">
    <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-gray-600 text-sm sm:text-base">{message}</p>
  </div>
);