
import React from "react";

const ProjectStats = () => {
  const stats = [
    {
      title: "Total Projects",
      value: "2",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      gradient: "from-blue-500 to-blue-600",
      change: "+2",
      description: "All time projects",
    },
    {
      title: "Active Projects",
      value: "2",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      gradient: "from-purple-500 to-purple-600",
      change: "+100%",
      description: "Currently in progress",
    },
    {
      title: "Pending Milestones",
      value: "0",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      gradient: "from-orange-500 to-orange-600",
      change: "0",
      description: "Awaiting review",
    },
    {
      title: "Completed Projects",
      value: "0",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      gradient: "from-green-500 to-green-600",
      change: "0",
      description: "Successfully delivered",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="group cursor-pointer">
          <div
            className={`bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  {stat.icon}
                </div>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
                  {stat.change}
                </span>
              </div>

              {/* Main Content */}
              <div className="mb-2">
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <h3 className="font-semibold text-lg opacity-95">
                  {stat.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-white/80 text-sm mb-4">{stat.description}</p>

              {/* Progress Indicator */}
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-white/40 transition-all duration-500"
                  style={{
                    width:
                      stat.title === "Active Projects"
                        ? "100%"
                        : stat.title === "Completed Projects"
                        ? "0%"
                        : "50%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;
