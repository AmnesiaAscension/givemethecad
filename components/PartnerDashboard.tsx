import React from 'react';
import { User, LeadData, Condition, Goal, PropertyType } from '../types';
import { Card, Badge, Button } from './UI';
import { Users, DollarSign, Clock, MapPin, ChevronRight, ExternalLink } from 'lucide-react';

// Mock Data for the Dashboard
const MOCK_LEADS: LeadData[] = [
  {
    address: '123 Maple Street, Houston, TX 77002',
    cadData: {
      accountNumber: 'CAD-992831',
      marketValue: 245000,
      yearBuilt: 1985,
      sqFt: 1800,
      lotSize: '0.2 Acres',
      county: 'Harris County',
      taxYear: 2024,
      source: 'Official CAD'
    },
    propertyType: PropertyType.HOUSE,
    condition: Condition.NEEDS_WORK,
    upgrades: 'New roof 2020',
    isPrimaryResidence: true,
    behindOnTaxes: true,
    goal: Goal.CASH_OFFER,
    contactName: 'John Smith',
    contactPhone: '(555) 123-4567',
    contactEmail: 'john@example.com',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'New'
  },
  {
    address: '4502 Oak Avenue, Katy, TX 77494',
    cadData: {
      accountNumber: 'CAD-112345',
      marketValue: 450000,
      yearBuilt: 2010,
      sqFt: 2800,
      lotSize: '0.3 Acres',
      county: 'Fort Bend',
      taxYear: 2023,
      source: 'Data Partner'
    },
    propertyType: PropertyType.HOUSE,
    condition: Condition.GREAT,
    upgrades: 'Pool added 2022',
    isPrimaryResidence: true,
    behindOnTaxes: false,
    goal: Goal.LIST_HOME,
    contactName: 'Sarah Johnson',
    contactPhone: '(555) 987-6543',
    contactEmail: 'sarah@example.com',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'Contacted'
  },
  {
    address: '8812 Pine Road, Conroe, TX 77301',
    cadData: {
      accountNumber: 'CAD-773821',
      marketValue: 180000,
      yearBuilt: 1975,
      sqFt: 1400,
      lotSize: '0.5 Acres',
      county: 'Montgomery',
      taxYear: 2024,
      source: 'Estimate'
    },
    propertyType: PropertyType.LAND,
    condition: Condition.MAJOR_ISSUES,
    upgrades: 'None',
    isPrimaryResidence: false,
    behindOnTaxes: true,
    goal: Goal.LOWER_TAXES,
    contactName: 'Mike Davis',
    contactPhone: '(555) 456-7890',
    contactEmail: 'mike@example.com',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    status: 'New'
  }
];

interface PartnerDashboardProps {
  user: User;
}

export const PartnerDashboard: React.FC<PartnerDashboardProps> = ({ user }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.name}</h1>
          <p className="text-slate-500">Here's what's happening in your territory today.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button variant="outline">Export Data</Button>
          <Button>Refresh Leads</Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border-l-4 border-l-brand-500 flex items-center">
          <div className="p-3 bg-brand-50 rounded-lg mr-4">
            <Users className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">New Leads</p>
            <h3 className="text-2xl font-bold text-slate-900">12</h3>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-emerald-500 flex items-center">
          <div className="p-3 bg-emerald-50 rounded-lg mr-4">
            <DollarSign className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Potential Volume</p>
            <h3 className="text-2xl font-bold text-slate-900">$2.4M</h3>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-amber-500 flex items-center">
          <div className="p-3 bg-amber-50 rounded-lg mr-4">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Actions</p>
            <h3 className="text-2xl font-bold text-slate-900">5</h3>
          </div>
        </Card>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="font-semibold text-slate-800">Recent Assignments</h2>
          <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded border">Sorted by: Newest</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-3">Property</th>
                <th className="px-6 py-3">CAD Value</th>
                <th className="px-6 py-3">Condition / Goal</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_LEADS.map((lead, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3 text-slate-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{lead.address.split(',')[0]}</div>
                        <div className="text-slate-500 text-xs">{lead.address.split(',').slice(1).join(',')}</div>
                        <div className="mt-1 text-xs text-brand-600 font-medium">{lead.propertyType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-700">
                      ${lead.cadData?.marketValue.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">{lead.cadData?.county}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <Badge color={lead.condition === Condition.GREAT ? 'green' : lead.condition === Condition.MAJOR_ISSUES ? 'yellow' : 'blue'}>
                        {lead.condition}
                      </Badge>
                      <div className="text-xs font-medium text-slate-600">{lead.goal}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {lead.status}
                    </span>
                    {lead.behindOnTaxes && (
                      <div className="mt-1 text-xs text-red-600 font-medium flex items-center">
                         Behind on Taxes
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="outline" className="h-8 text-xs px-3">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center">
            <button className="text-sm text-brand-600 font-medium hover:text-brand-700 flex items-center justify-center mx-auto">
                View All Leads <ChevronRight className="w-4 h-4 ml-1" />
            </button>
        </div>
      </div>
    </div>
  );
};