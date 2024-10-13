'use client'

import { useState, useEffect } from 'react';
import { fetchCompanyInfo } from '../lib/tradingBot';

export default function CompanyInfo({ api }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCompanyInfo(api);
      setInfo(data);
    };

    fetchData();
  }, [api]);

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{info.name} Info</h2>
      <ul className="space-y-2">
        <li><strong>Founded:</strong> {info.founded}</li>
        <li><strong>Headquarters:</strong> {info.headquarters}</li>
        <li><strong>Trading Volume (24h):</strong> ${info.volume24h.toLocaleString()}</li>
        <li><strong>Number of Markets:</strong> {info.markets}</li>
        <li><strong>Number of Currencies:</strong> {info.currencies}</li>
      </ul>
    </div>
  );
}