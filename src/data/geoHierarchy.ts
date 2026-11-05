import { NIGERIA_36_STATES_AND_FCT } from "./nigeriaGeo";

export interface LgaData {
  name: string;
  lat: number;
  lng: number;
}

export interface StateData {
  name: string;
  lat: number;
  lng: number;
  lgas: LgaData[];
}

export interface CountryData {
  name: string;
  code: string;
  lat: number;
  lng: number;
  states: StateData[];
}

// Map the full 36 states + FCT for Nigeria
const nigeriaStatesFormatted: StateData[] = NIGERIA_36_STATES_AND_FCT.map((s) => ({
  name: s.name,
  lat: s.lat,
  lng: s.lng,
  lgas: s.lgas.map((lgaName) => ({
    name: lgaName,
    lat: s.lat,
    lng: s.lng,
  })),
}));

export const GEO_HIERARCHY: CountryData[] = [
  {
    name: "Nigeria",
    code: "NG",
    lat: 9.0765,
    lng: 7.3986,
    states: nigeriaStatesFormatted,
  },
  {
    name: "Ghana",
    code: "GH",
    lat: 5.6037,
    lng: -0.187,
    states: [
      {
        name: "Greater Accra",
        lat: 5.6037,
        lng: -0.187,
        lgas: [
          { name: "Accra Metropolitan", lat: 5.556, lng: -0.1969 },
          { name: "Tema Metropolitan", lat: 5.6698, lng: -0.0166 },
          { name: "Ga East (Dome/Kwabenya)", lat: 5.6833, lng: -0.2333 },
          { name: "Ga West (Amasaman)", lat: 5.7, lng: -0.3 },
          { name: "Ayawaso West (East Legon)", lat: 5.6333, lng: -0.1667 },
        ],
      },
      {
        name: "Ashanti",
        lat: 6.6885,
        lng: -1.6244,
        lgas: [
          { name: "Kumasi Metropolitan", lat: 6.6885, lng: -1.6244 },
          { name: "Asokwa", lat: 6.6667, lng: -1.6 },
          { name: "Oforikrom", lat: 6.6833, lng: -1.5833 },
          { name: "Kwadaso", lat: 6.6833, lng: -1.65 },
        ],
      },
    ],
  },
  {
    name: "Kenya",
    code: "KE",
    lat: -1.2921,
    lng: 36.8219,
    states: [
      {
        name: "Nairobi County",
        lat: -1.2921,
        lng: 36.8219,
        lgas: [
          { name: "Westlands", lat: -1.2683, lng: 36.8042 },
          { name: "Kasarani", lat: -1.2167, lng: 36.9 },
          { name: "Lang'ata (Karen)", lat: -1.3667, lng: 36.75 },
          { name: "Dagoretti (Kilimani)", lat: -1.2833, lng: 36.7833 },
          { name: "Embakasi", lat: -1.3167, lng: 36.9 },
        ],
      },
      {
        name: "Mombasa County",
        lat: -4.0435,
        lng: 39.6682,
        lgas: [
          { name: "Nyali", lat: -4.0333, lng: 39.7 },
          { name: "Mvita (Island)", lat: -4.05, lng: 39.6667 },
          { name: "Kisauni", lat: -4.0, lng: 39.6833 },
        ],
      },
    ],
  },
  {
    name: "United States",
    code: "US",
    lat: 37.0902,
    lng: -95.7129,
    states: [
      {
        name: "Texas",
        lat: 31.9686,
        lng: -99.9018,
        lgas: [
          { name: "Harris County (Houston)", lat: 29.7604, lng: -95.3698 },
          { name: "Dallas County (Dallas)", lat: 32.7767, lng: -96.797 },
          { name: "Travis County (Austin)", lat: 30.2672, lng: -97.7431 },
          { name: "Bexar County (San Antonio)", lat: 29.4241, lng: -98.4936 },
          { name: "Tarrant County (Fort Worth)", lat: 32.7555, lng: -97.3308 },
        ],
      },
      {
        name: "California",
        lat: 36.7783,
        lng: -119.4179,
        lgas: [
          { name: "Los Angeles County", lat: 34.0522, lng: -118.2437 },
          { name: "Orange County", lat: 33.7175, lng: -117.8311 },
          { name: "San Diego County", lat: 32.7157, lng: -117.1611 },
          { name: "Santa Clara County (San Jose)", lat: 37.3382, lng: -121.8863 },
          { name: "San Francisco County", lat: 37.7749, lng: -122.4194 },
        ],
      },
      {
        name: "New York",
        lat: 40.7128,
        lng: -74.006,
        lgas: [
          { name: "New York County (Manhattan)", lat: 40.7831, lng: -73.9712 },
          { name: "Kings County (Brooklyn)", lat: 40.6782, lng: -73.9442 },
          { name: "Queens County", lat: 40.7282, lng: -73.7949 },
          { name: "Bronx County", lat: 40.8448, lng: -73.8648 },
          { name: "Richmond County (Staten Island)", lat: 40.5795, lng: -74.1502 },
        ],
      },
    ],
  },
  {
    name: "United Kingdom",
    code: "GB",
    lat: 55.3781,
    lng: -3.436,
    states: [
      {
        name: "Greater London",
        lat: 51.5074,
        lng: -0.1278,
        lgas: [
          { name: "City of Westminster", lat: 51.4975, lng: -0.1357 },
          { name: "Camden", lat: 51.5428, lng: -0.1426 },
          { name: "Kensington and Chelsea", lat: 51.502, lng: -0.1947 },
          { name: "Greenwich", lat: 51.4826, lng: 0.0077 },
          { name: "Barnet", lat: 51.6256, lng: -0.2 },
          { name: "Croydon", lat: 51.3762, lng: -0.0982 },
        ],
      },
      {
        name: "West Midlands",
        lat: 52.4862,
        lng: -1.8904,
        lgas: [
          { name: "Birmingham", lat: 52.4862, lng: -1.8904 },
          { name: "Coventry", lat: 52.4068, lng: -1.5197 },
          { name: "Wolverhampton", lat: 52.5862, lng: -2.1288 },
        ],
      },
    ],
  },
  {
    name: "Canada",
    code: "CA",
    lat: 56.1304,
    lng: -106.3468,
    states: [
      {
        name: "Ontario",
        lat: 51.2538,
        lng: -85.3232,
        lgas: [
          { name: "Toronto Division", lat: 43.6532, lng: -79.3832 },
          { name: "Peel Regional Municipality (Mississauga/Brampton)", lat: 43.589, lng: -79.6441 },
          { name: "York Regional Municipality (Markham/Vaughan)", lat: 44.0, lng: -79.4667 },
          { name: "Ottawa Division", lat: 45.4215, lng: -75.6972 },
        ],
      },
      {
        name: "British Columbia",
        lat: 53.7267,
        lng: -127.6476,
        lgas: [
          { name: "Metro Vancouver (Vancouver)", lat: 49.2827, lng: -123.1207 },
          { name: "Burnaby", lat: 49.2488, lng: -122.9805 },
          { name: "Surrey", lat: 49.1913, lng: -122.849 },
          { name: "Capital Regional District (Victoria)", lat: 48.4284, lng: -123.3656 },
        ],
      },
    ],
  },
];
