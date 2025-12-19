
import { CADData, User, PartnerApplicationData } from '../types';

// NOTE: In a real implementation, you would import your Supabase client here
// import { supabase } from '../lib/supabaseClient';

/**
 * Strategy: Layered Lookup
 * 1. Check Local DB (Official CAD Import)
 * 2. Check Partner API (Estated/ATTOM)
 * 3. Return null (Trigger Manual Entry)
 */
export const fetchCADData = async (address: string): Promise<CADData | null> => {
  console.log(`[Lookup] Searching for: ${address}`);

  // --- LAYER 1: SIMULATED SUPABASE LOOKUP ---
  // In production, uncomment this block:
  /*
  const { data, error } = await supabase
    .from('cad_properties')
    .select('*')
    .ilike('address_full', `%${address}%`) // Simple match, use Full Text Search in prod
    .limit(1)
    .single();
    
  if (data) {
    return {
      accountNumber: data.account_number,
      marketValue: data.market_value,
      yearBuilt: data.year_built,
      sqFt: data.sq_ft,
      lotSize: data.lot_size,
      county: data.county,
      taxYear: data.tax_year,
      source: 'Official CAD',
      isCertified: data.is_certified
    };
  }
  */

  return new Promise((resolve) => {
    setTimeout(() => {
      // SIMULATION: 
      // If address contains "Main", we find a "Real" Harris County record
      if (address.toLowerCase().includes('main')) {
        resolve({
          accountNumber: `114-492-001-00${Math.floor(Math.random() * 99)}`,
          marketValue: 245000,
          yearBuilt: 1985,
          sqFt: 1850,
          lotSize: '0.21 Acres',
          county: 'Harris County',
          taxYear: 2024,
          source: 'Official CAD',
          isCertified: true
        });
        return;
      }

      // If address contains "Oak", we simulate a 3rd Party API hit (Estated/ATTOM)
      if (address.toLowerCase().includes('oak')) {
        resolve({
          accountNumber: `UNK-${Math.floor(Math.random() * 1000)}`,
          marketValue: 310000,
          yearBuilt: 2005,
          sqFt: 2200,
          lotSize: '0.15 Acres',
          county: 'Fort Bend',
          taxYear: 2023, // Older year often implies API lag
          source: 'Data Partner',
          isCertified: false
        });
        return;
      }

      // If address contains "Error", we return null to force manual entry
      if (address.toLowerCase().includes('error')) {
        resolve(null);
        return;
      }

      // FALLBACK: Generative mock for demo purposes (Delete this in production!)
      const baseValue = 150000 + (address.length * 3000); 
      resolve({
        accountNumber: `DEMO-${Math.floor(Math.random() * 100000)}`,
        marketValue: baseValue,
        yearBuilt: 1960 + (address.length % 50),
        sqFt: 1200 + (address.length * 40),
        lotSize: '0.18 Acres',
        county: 'Demo County',
        taxYear: 2024,
        source: 'Estimate',
        isCertified: false
      });
    }, 1200);
  });
};

export const submitLead = async (data: any): Promise<boolean> => {
  return new Promise((resolve) => {
    console.log("Submitting Lead to Routing Engine:", data);
    // In production: await supabase.from('leads').insert(data);
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock Auth Logic
      if (email.includes('@partner.com') || email === 'demo@partner.com') {
        resolve({
          id: 'u_123',
          name: 'Partner User',
          email: email,
          role: 'partner'
        });
      } else {
        reject(new Error('Invalid credentials. Try demo@partner.com'));
      }
    }, 1000);
  });
};

export const submitPartnerApplication = async (data: PartnerApplicationData): Promise<boolean> => {
  return new Promise((resolve) => {
    console.log("Submitting Partner Application:", data);
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};
