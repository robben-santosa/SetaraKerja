import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Building2, CheckCircle2 } from 'lucide-react';

// Fix leaflet icon issue in react
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icon for Accessible Companies
const createAccessibleIcon = (color: string) => L.divIcon({
  html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-accessibility"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/></svg>
         </div>`,
  className: 'custom-leaflet-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const defaultCenter: [number, number] = [-2.5489, 118.0149];

const INCLUSIVE_COMPANIES = [
  {
    id: 1,
    name: 'PT Harmoni Nusantara',
    position: [-6.2300, 106.8200] as [number, number],
    address: 'Jl. Jend. Sudirman Kav. 52-53, Jakarta',
    features: ['Jalur Kursi Roda', 'Toilet Aksesibel', 'Lift Khusus', 'Sign Language Interpreter'],
    match: 94,
  },
  {
    id: 2,
    name: 'TechInklusif Studio',
    position: [-6.917464, 107.619123] as [number, number],
    address: 'Jl. R.E. Martadinata, Bandung',
    features: ['Ruang Sensorik Ramah', 'Jalur Kursi Roda', 'Dokumen Braille', 'Job Coach Pendamping'],
    match: 88,
  },
  {
    id: 3,
    name: 'MajuBersama Corp',
    position: [-7.250445, 112.768845] as [number, number],
    address: 'Jl. Pemuda, Surabaya',
    features: ['Fleksibilitas Remote', 'Software Screen Reader', 'Meja Adjustable', 'Akses Kognitif Ringan'],
    match: 92,
  },
  {
    id: 4,
    name: 'Kreatif Digital Group',
    position: [-7.797068, 110.370529] as [number, number],
    address: 'Jl. Sudirman, Yogyakarta',
    features: ['Teks Braille', 'Sign Language Interpreter', 'Desain Ramah Tunanetra'],
    match: 85,
  },
  {
    id: 5,
    name: 'Inovasi Nusantara Hub',
    position: [-6.966667, 110.416664] as [number, number],
    address: 'Semarang, Jawa Tengah',
    features: ['Lift Khusus', 'Jalur Kursi Roda', 'Perangkat Assistive Tech'],
    match: 91,
  }
];

export function InclusiveMap() {
  return (
    <div className="bg-white rounded-2xl border border-[#D5DEEF] p-6 flex flex-col h-[500px] shadow-[0_16px_50px_-32px_rgba(57,88,134,.45)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <MapPin size={16} aria-hidden="true" />
            Peta Perusahaan Inklusif
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Jelajahi kantor inklusif di Indonesia dan akomodasi yang tersedia.
          </p>
        </div>
        <div className="flex gap-2">
           <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium border border-blue-100">
             <div className="w-2 h-2 rounded-full bg-[#628ECB]"></div>
             Verifikasi Aksesibilitas
           </span>
        </div>
      </div>
      
      <div className="flex-1 rounded-xl overflow-hidden border border-slate-200 relative isolate z-0">
          <MapContainer center={defaultCenter} zoom={5} minZoom={4} maxBounds={[[-12, 94], [8, 142]]} className="w-full h-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          
          {INCLUSIVE_COMPANIES.map(company => (
            <Marker key={company.id} position={company.position} icon={createAccessibleIcon('#628ECB')}>
              <Popup className="rounded-xl overflow-hidden">
                <div className="p-1 min-w-[200px]">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 mb-1">
                    <Building2 size={14} className="text-blue-600" />
                    {company.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">{company.address}</p>
                  
                  <div className="mb-2">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Akomodasi Tersedia</div>
                    <ul className="space-y-1">
                      {company.features.map(feat => (
                        <li key={feat} className="text-xs flex items-center gap-1.5 text-slate-700">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="w-full mt-2 bg-blue-600 text-white text-xs font-medium py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                    Lihat Lowongan ({company.match}% Match)
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
