'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Calendar, Tag } from 'lucide-react';
import { Task } from '@/types';
import { formatDate, formatDueDate, isOverdue, capitalizeFirst } from '@/utils/format';

interface RecentTasksProps {
  tasks: Task[];
}

const RecentTasks: React.FC<RecentTasksProps> = ({ tasks }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'badge-completed';
      case 'in-progress':
        return 'badge-in-progress';
      case 'cancelled':
        return 'badge-cancelled';
      default:
        return 'badge-pending';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'badge-urgent';
      case 'high':
        return 'badge-high';
      case 'medium':
        return 'badge-medium';
      default:
        return 'badge-low';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Recent Tasks</h3>
          <Link
            href="/dashboard/tasks"
            className="text-sm text-primary-600 hover:text-primary-500 font-medium"
          >
            View all
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {tasks.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <div className="text-gray-400 mb-2">
              <Calendar className="h-8 w-8 mx-auto" />
            </div>
            <p className="text-gray-500">No tasks yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Create your first task to get started
            </p>
          </div>
        ) : (
          tasks.slice(0, 5).map((task) => (
            <div key={task._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {task.title}
                    </h4>
                    <span className={`badge ${getStatusColor(task.status)}`}>
                      {capitalizeFirst(task.status)}
                    </span>
                    <span className={`badge ${getPriorityColor(task.priority)}`}>
                      {capitalizeFirst(task.priority)}
                    </span>
                  </div>
                  
                  {task.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Created {formatDate(task.createdAt)}
                    </div>
                    
                    {task.dueDate && (
                      <div className={`flex items-center ${
                        isOverdue(task.dueDate) ? 'text-red-600' : ''
                      }`}>
                        <Calendar className="h-3 w-3 mr-1" />
                        Due {formatDueDate(task.dueDate)}
                      </div>
                    )}
                  </div>

                  {task.tags.length > 0 && (
                    <div className="flex items-center mt-2 space-x-1">
                      <Tag className="h-3 w-3 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {task.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {task.tags.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{task.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTasks;
