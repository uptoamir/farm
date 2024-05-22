type InfoBoxItemContent = {
  key?: string;
  value?: string | number | null;
  columns?: boolean;
  unit?: string;
  color?: string;
};

type InfoBoxItem = {
  title: string;
  id?: string | number;
  content: Array<InfoBoxItemContent>;
};

type Address = {
  id: string | number;
  province: string | undefined;
  city: string | undefined;
  location: string | null | undefined;
  latlng: string | null | undefined;
};

type Product = {
  id: string | number;
  name: string | undefined;
  fee: string | number | undefined;
};

type FarmSection = {
  id: string | number;
  jahad_name: string | null | undefined;
  product: Product;
  max_capacity: string | number | null | undefined;
  min_capacity: string | number | null | undefined;
  value: string | number | null | undefined;
};

type CultivationType = {
  code: number | undefined;
  name: string | undefined;
};

type Farm = {
  status: string | number | undefined;
  address: Address;
  id: string | number;
  jahad_name: string | undefined;
  sections: Array<FarmSection>;
  has_contradiction: true;
  cultivation_type: CultivationType;
  product: Product;
  year: string | number | undefined;
};

type GetFarmsResponse = {
  count: number | undefined;
  current: number | undefined;
  next: any;
  num_pages: number | undefined;
  previous: any;
  results: Array<Farm>;
};
