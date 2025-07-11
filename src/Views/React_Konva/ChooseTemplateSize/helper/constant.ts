// interface
export type SizeOption = {
  name: string;
  width: number;
  height: number;
};

// size_name
const SIZE_NAME = {
  LOGO: "Logo",
  BUSINESS_CARD: "Business Card",
  US_LEGAL: "US Legal",
  A5: "A5",
  A6: "A6",
  CUSTOM: "Custom",
};

// size_options
const SIZE_OPTIONS: SizeOption[] = [
  { name: SIZE_NAME.LOGO, width: 600, height: 600 },
  { name: SIZE_NAME.BUSINESS_CARD, width: 1050, height: 600 },
  { name: SIZE_NAME.US_LEGAL, width: 816, height: 800 },
  { name: SIZE_NAME.A5, width: 559, height: 794 },
  { name: SIZE_NAME.A6, width: 397, height: 559 },
  { name: SIZE_NAME.CUSTOM, width: 750, height: 750 },
];

export default SIZE_OPTIONS;
