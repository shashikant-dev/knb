'use client';
import { formatDate } from '../lib/dateUtils';

export default function ContactInquiryDisplay({ inquiry }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <p className="text-gray-900">{inquiry.name}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <p className="text-gray-900">
            {inquiry.email ? (
              <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                {inquiry.email}
              </a>
            ) : (
              <span className="text-gray-500 italic">NA</span>
            )}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
          <p className="text-gray-900">
            {inquiry.mobile ? (
              <a href={`tel:${inquiry.mobile}`} className="text-blue-600 hover:underline">
                {inquiry.mobile}
              </a>
            ) : (
              <span className="text-gray-500 italic">NA</span>
            )}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <p className="text-gray-900 capitalize">{inquiry.service}</p>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <p className="text-gray-900">{inquiry.subject}</p>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <p className="text-gray-900 whitespace-pre-wrap">{inquiry.message}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
            inquiry.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {inquiry.status}
          </span>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <p className="text-gray-900">
            {formatDate(inquiry.createdAt)}
          </p>
        </div>
        
        {inquiry.notes && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <p className="text-gray-900 whitespace-pre-wrap">{inquiry.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}