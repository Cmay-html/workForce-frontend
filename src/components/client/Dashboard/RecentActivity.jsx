
import React from "react";

const RecentActivity = () => {
  const activities = [];

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2 className="chart-title">Recent Activity</h2>
      </div>

      <div className="activity-list">
        {activities.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "var(--text-light)",
            }}
          >
            <p>No recent activity</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-content">
                <div className="activity-title">{activity.title}</div>
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
