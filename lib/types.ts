export type ItemType = 'book' | 'stationery';

export type BookCategory =
  | 'Kannada Literature'
  | 'Academic & College'
  | 'Engineering & Medical'
  | 'Competitive Exams'
  | 'School Textbooks'
  | 'Fiction & Novels'
  | 'Self-Help & Biographies'
  | 'Children & Comics';

export type StationeryCategory =
  | 'College & School Notebooks'
  | 'Pens & Writing Instruments'
  | 'Engineering & Drafting Tools'
  | 'Medical & Lab Supplies'
  | 'Art & Craft Materials'
  | 'Office & Filing Supplies'
  | 'Calculators & Electronics';

export type ItemCategory = BookCategory | StationeryCategory;

export interface Item {
  id: string;
  title: string;
  type: ItemType;
  category: ItemCategory;
  authorOrBrand: string;
  price: number;
  originalPrice?: number;
  coverImage: string;
  description: string;
  inStock: boolean;
  isNewArrival: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  editionOrSpec?: string;
  language?: string;
  sku?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface StoreContact {
  name: string;
  tagline: string;
  address: {
    shopNo: string;
    building: string;
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    fullAddress: string;
    landmark: string;
  };
  phoneNumbers: {
    primary: string;
    secondary: string;
    formattedPrimary: string;
    formattedSecondary: string;
  };
  email: string;
  timings: {
    weekdays: string;
    sunday: string;
    isOpenToday: boolean;
  };
  deliveryInfo: {
    davangereCoverage: string;
    outstationDelivery: string;
    orderCallNotice: string;
  };
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
}
