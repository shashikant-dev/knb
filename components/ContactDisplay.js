'use client';
import { formatDate } from '../lib/dateUtils';

export default function ContactDisplay({ contact, showActions = false, onStatusChange, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
          {contact.status && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contact.status)}`}>
              {contact.status}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium text-gray-700">Email:</span>
            <span className="ml-2 text-gray-900">
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                  {contact.email}
                </a>
              ) : (
                <span className="text-gray-500 italic">NA</span>
              )}
            </span>
          </div>
          
          <div>
            <span className="font-medium text-gray-700">Mobile:</span>
            <span className="ml-2 text-gray-900">
              {contact.mobile ? (
                <a href={`tel:${contact.mobile}`} className="text-blue-600 hover:underline">
                  {contact.mobile}
                </a>
              ) : (
                <span className="text-gray-500 italic">NA</span>
              )}
            </span>
          </div>
        </div>
        
        {contact.service && (
          <div className="text-sm">
            <span className="font-medium text-gray-700">Service:</span>
            <span className="ml-2 text-gray-900 capitalize">{contact.service}</span>
          </div>
        )}
        
        {contact.subject && (
          <div className="text-sm">
            <span className="font-medium text-gray-700">Subject:</span>
            <span className="ml-2 text-gray-900">{contact.subject}</span>
          </div>
        )}
        
        {contact.message && (
          <div className="text-sm">
            <span className="font-medium text-gray-700">Message:</span>
            <p className="mt-1 text-gray-900 whitespace-pre-wrap">{contact.message}</p>
          </div>
        )}
        
        {contact.createdAt && (
          <div className="text-xs text-gray-500">
            {formatDate(contact.createdAt)}
          </div>
        )}
        
        {showActions && (
          <div className="flex space-x-2 pt-2 border-t border-gray-100">
            {onStatusChange && (
              <select
                value={contact.status || 'new'}
                onChange={(e) => onStatusChange(contact._id, e.target.value)}
                className="text-xs px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(contact._id)}
                className="text-xs px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}