export const FilterHelper = {
  filterData(data: any[], filters: any) {
    return data.filter((item) => {
      if (filters.minPrice) {
        if (item.price < filters.minPrice) {
          return false;
        }
      }
      if (filters.maxPrice) {
        if (item.price > filters.maxPrice) {
          return false;
        }
      }
      if (filters.size) {
        if (item.size !== filters.size) {
          return false;
        }
      }
      if (filters.gender) {
        if (item.gender !== filters.gender) {
          return false;
        }
      }
      if (filters.categorie) {
        if (!item.categories.find((e: any) => e === filters.categorie)) {
          return false;
        }
      }
      return true;
    });
  },
};
