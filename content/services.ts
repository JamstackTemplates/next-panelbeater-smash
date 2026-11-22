export const serviceIcons = ['clipboard', 'dent', 'bumper', 'panel', 'spray-gun', 'hail', 'jig', 'headlight'] as const;

export interface Service {
  id: string;
  name: string;
  summary: string;
  /** Whole AUD. Zero is free. Null requires assessment. */
  priceFrom: number | null;
  typicalDays: { min: number; max: number };
  insuranceWork: boolean;
  icon: typeof serviceIcons[number];
}

export const services: readonly Service[] = [
  { id: 'free-assessment', name: 'Free assessment and quote', summary: 'Photographed, measured and written up while you wait.', priceFrom: 0, typicalDays: { min: 0, max: 0 }, insuranceWork: true, icon: 'clipboard' },
  { id: 'paintless-dent-repair', name: 'Paintless dent repair', summary: 'Car-park dings pushed out from behind, keeping the factory paint.', priceFrom: 180, typicalDays: { min: 1, max: 1 }, insuranceWork: true, icon: 'dent' },
  { id: 'bumper-scuff-repair', name: 'Bumper scuff and scrape repair', summary: 'Sanded, filled and colour-matched on plastic bumpers.', priceFrom: 350, typicalDays: { min: 1, max: 2 }, insuranceWork: true, icon: 'bumper' },
  { id: 'panel-repair-replacement', name: 'Panel repair and replacement', summary: 'Doors, guards, bonnets and boot lids repaired or replaced.', priceFrom: null, typicalDays: { min: 3, max: 7 }, insuranceWork: true, icon: 'panel' },
  { id: 'colour-matched-respray', name: 'Colour-matched respray', summary: 'Computer-matched to your paint code and blended into the next panel.', priceFrom: null, typicalDays: { min: 3, max: 5 }, insuranceWork: true, icon: 'spray-gun' },
  { id: 'hail-damage-repair', name: 'Hail damage repair', summary: 'Roof, bonnet and boot dents after a storm, mostly paintless.', priceFrom: null, typicalDays: { min: 5, max: 15 }, insuranceWork: true, icon: 'hail' },
  { id: 'chassis-straightening', name: 'Chassis and structural straightening', summary: 'Measured on the jig and pulled back to factory dimensions.', priceFrom: null, typicalDays: { min: 7, max: 21 }, insuranceWork: true, icon: 'jig' },
  { id: 'headlight-restoration', name: 'Headlight restoration', summary: 'Yellowed lenses cut back, polished and UV sealed.', priceFrom: 120, typicalDays: { min: 1, max: 1 }, insuranceWork: false, icon: 'headlight' },
];
