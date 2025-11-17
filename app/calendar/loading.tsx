export default function Loading() {
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="w-full h-full p-6">
      <div className="w-full h-full flex flex-col gap-3">
        {/* Week Navigator Skeleton */}
        <div className="w-full shrink-0 flex items-center justify-between">
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Calendar Grid Skeleton */}
        <div className="grid grid-cols-7 gap-2.5 items-stretch flex-1">
          {DAYS.map((day, index) => (
            <div key={index} className="flex flex-col h-full">
              {/* Day Name */}
              <div className="text-center shrink-0 mb-[9px]">
                <div className="h-4 w-8 bg-gray-200 rounded mx-auto animate-pulse" />
              </div>

              {/* Day Content Container */}
              <div className="bg-gray-100 rounded-md flex flex-col gap-1 flex-1 p-2">
                {/* Date Header */}
                <div className="flex justify-between items-center mb-2">
                  <div className="h-3 w-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse" />
                </div>

                {/* Session Card Skeletons */}
                {index % 3 === 0 && (
                  <div className="bg-white/80 border border-gray-200 rounded-md p-1.5 animate-pulse">
                    <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                    <div className="space-y-1">
                      <div className="h-10 bg-gray-100 rounded" />
                      <div className="h-10 bg-gray-100 rounded" />
                    </div>
                  </div>
                )}

                {index % 4 === 0 && index !== 0 && (
                  <>
                    <div className="bg-white/80 border border-gray-200 rounded-md p-1.5 animate-pulse">
                      <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
                      <div className="space-y-1">
                        <div className="h-10 bg-gray-100 rounded" />
                      </div>
                    </div>
                    <div className="bg-white/80 border border-gray-200 rounded-md p-1.5 animate-pulse">
                      <div className="h-3 w-28 bg-gray-200 rounded mb-2" />
                      <div className="space-y-1">
                        <div className="h-10 bg-gray-100 rounded" />
                        <div className="h-10 bg-gray-100 rounded" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
