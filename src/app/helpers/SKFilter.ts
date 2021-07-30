import { DashboardFilterConfig } from "../models/DashboardFilterConfig";

export default class SKFilter {
  constructor(){}

  public filterElements(filters, elements:any[]):any[]{
    const uncheckedFilters = this.getUncheckedFilters(filters);

    for(let filter of uncheckedFilters){
      elements = this.RemoveElements(elements, filter)
    }

    return elements;
  }

  private getUncheckedFilters(filters:DashboardFilterConfig[]):DashboardFilterConfig[]{
    return filters.filter( filter => filter.value === false);
  }
  private RemoveElements(elements:any[], filter:DashboardFilterConfig):any[]{
    return elements.filter(
      element => !filter.filterCriteria(element)
    )
  }
}
