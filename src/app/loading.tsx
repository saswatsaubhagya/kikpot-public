export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              KIKPOT
            </span>
          </h1>
        </div>
        
        {/* Loading animation */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400 mx-auto"></div>
          
          {/* Floating particles */}
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-float opacity-60"></div>
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-float delay-500 opacity-80"></div>
          <div className="absolute -bottom-2 left-1/2 w-2.5 h-2.5 bg-pink-400 rounded-full animate-float delay-1000 opacity-70"></div>
        </div>
        
        {/* Loading text */}
        <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium">
          Loading amazing things...
        </p>
        
        {/* Progress bar */}
        <div className="mt-4 w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
