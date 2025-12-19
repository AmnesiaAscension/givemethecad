
export enum Condition {
  GREAT = 'Great',
  GOOD = 'Good',
  NEEDS_WORK = 'Needs Work',
  MAJOR_ISSUES = 'Major Issues'
}

export enum Goal {
  CASH_OFFER = 'Get a Cash Offer',
  LIST_HOME = 'Talk to an Agent (List)',
  LOWER_TAXES = 'Lower My Taxes (Protest)',
  VALUE_CHECK = 'Just a Value Check'
}

export enum PropertyType {
  HOUSE = 'Single Family',
  CONDO = 'Condo/Townhome',
  LAND = 'Land'
}

export type CADSource = 'Official CAD' | 'Data Partner' | 'User Provided' | 'Estimate';

export interface CADData {
  accountNumber: string;
  marketValue: number;
  yearBuilt: number;
  sqFt: number;
  lotSize: string;
  county: string;
  taxYear: number;
  source: CADSource;
  isCertified?: boolean;
}

export interface LeadData {
  address: string;
  cadData?: CADData;
  propertyType: PropertyType;
  condition: Condition;
  upgrades: string;
  isPrimaryResidence: boolean;
  behindOnTaxes: boolean;
  goal: Goal;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  submittedAt?: Date;
  status?: 'New' | 'Contacted' | 'Closed';
}

export type StepProps = {
  data: LeadData;
  updateData: (fields: Partial<LeadData>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'partner' | 'admin';
}

export interface PartnerApplicationData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  role: 'Investor' | 'Agent' | 'Tax Protest Firm';
  serviceAreas: string;
  leadTypes: string[];
  notes: string;
}
