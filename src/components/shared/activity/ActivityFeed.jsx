import React, { useState, useEffect } from 'react';

const ActivityFeed = ({ projectId }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API call to fetch activities
    const fetchActivities = async () => {
      try {
        // const response = await api.get(`/activities?projectId=${projectId}`);
        // setActivities(response.data);
        setActivities([]); // Empty state until API is implemented
      } catch (error) {
        console.error('Failed to fetch activities:', error);
        setActivities([]);
      }
    };

    if (projectId) {
      fetchActivities();
    } else {
      setActivities([]);
    }
  }, [projectId]);

  const getActivityColor = (type) => {
    switch (type) {
      case 'milestone_completed':
        return 'text-green-600';
      case 'message_sent':
        return 'text-primary-600';
      case 'proposal_accepted':
        return 'text-purple-600';
      case 'project_created':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return activityTime.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Activity Feed</h3>
        <p className="text-sm text-gray-600">Recent project activities</p>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No activities yet
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className={`text-sm font-medium ${getActivityColor(activity.type)}`}>
                    •
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{activity.user}</span>{' '}
                        {activity.action}{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatTime(activity.timestamp)}
                      </span>
                    </div>
                    {activity.details && (
                      <p className="text-xs text-gray-600 mt-1">
                        {activity.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;