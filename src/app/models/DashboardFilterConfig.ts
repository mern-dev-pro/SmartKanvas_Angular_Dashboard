
export interface FilterCriteria{
  (element:any):boolean;
}
export interface DashboardFilterConfig{
  filter: string;
  value: boolean;
  label: string;
  filterCriteria: FilterCriteria;
}
