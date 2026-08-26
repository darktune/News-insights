import React from 'react';
import Link from 'next/link';
import { PlusCircle, FileText, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
        <Link 
          href="/admin/articles/new" 
          className="flex items-center space-x-2 bg-brand-accent text-white px-4 py-2 rounded-md hover:bg-brand-accent/90 transition-colors shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          <span className="font-medium text-sm">New Article</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Articles</p>
            <p className="text-3xl font-bold text-gray-900">1,284</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-md">
            <FileText className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Views (30d)</p>
            <p className="text-3xl font-bold text-gray-900">45.2K</p>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-md">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Active Authors</p>
            <p className="text-3xl font-bold text-gray-900">12</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-md">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Recent Drafts</h2>
        </div>
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-medium">
                <th className="px-6 py-3 border-b border-gray-100">Title</th>
                <th className="px-6 py-3 border-b border-gray-100">Category</th>
                <th className="px-6 py-3 border-b border-gray-100">Last Edited</th>
                <th className="px-6 py-3 border-b border-gray-100">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">Draft Headline Example {item}</td>
                  <td className="px-6 py-4 text-gray-500">Politics</td>
                  <td className="px-6 py-4 text-gray-500">2 hours ago</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/articles/${item}/edit`} className="text-brand-accent hover:underline font-medium">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
