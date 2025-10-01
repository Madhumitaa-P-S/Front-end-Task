'use client';

import React from 'react';
import { Clock, Calendar, Tag, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Task } from '@/types';
import { formatDate, formatDueDate, isOverdue, capitalizeFirst } from '@/utils/format';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onStatusChange?: (taskId: string, status: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const [showActions, setShowActions] = React.useState(false);

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

  const handleStatusChange = (newStatus: string) => {
    onStatusChange?.(task._id, newStatus);
    setShowActions(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {task.description}
            </p>
          )}
        </div>

        <div className="relative ml-2">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {showActions && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button
                onClick={() => onEdit?.(task)}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Change Status
              </div>
              
              {['pending', 'in-progress', 'completed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 ${
                    task.status === status ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  <span className={`badge ${getStatusColor(status)} mr-2`}>
                    {capitalizeFirst(status)}
                  </span>
                </button>
              ))}
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <button
                onClick={() => onDelete?.(task._id)}
                className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className={`badge ${getStatusColor(task.status)}`}>
            {capitalizeFirst(task.status)}
          </span>
          <span className={`badge ${getPriorityColor(task.priority)}`}>
            {capitalizeFirst(task.priority)}
          </span>
        </div>

        {task.dueDate && (
          <div className={`flex items-center text-xs ${
            isOverdue(task.dueDate) ? 'text-red-600' : 'text-gray-500'
          }`}>
            <Calendar className="h-3 w-3 mr-1" />
            {formatDueDate(task.dueDate)}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Created {formatDate(task.createdAt)}
        </div>

        {task.tags.length > 0 && (
          <div className="flex items-center space-x-1">
            <Tag className="h-3 w-3" />
            <div className="flex space-x-1">
              {task.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {task.tags.length > 2 && (
                <span className="text-gray-400">+{task.tags.length - 2}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close actions */}
      {showActions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
};

export default TaskCard;
