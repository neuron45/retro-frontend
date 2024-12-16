import ApiClient from "../helpers/ApiClient";
import useSWR from "swr";

const fetcher = (url) => ApiClient.get(url).then((res) => res.data);

export function useInventoryItems(assigned) {
  const APIURL = `/inventory-items?assigned=false`;
  const { data, error, isLoading } = useSWR(APIURL, fetcher);
  return {
    data,
    error,
    isLoading,
    APIURL,
  };
}

export function useInventoryItem(id) {
    const APIURL = `/inventory-items/${id}`;
    const { data, error, isLoading } = useSWR(APIURL, fetcher);

    return {
      data,
      error,
      isLoading,
      APIURL,
    };
}

export function useInventoryUnits() {
    const APIURL = `/inventory-items/units`;
    const { data, error, isLoading } = useSWR(APIURL, fetcher);
    return {
      data,
      error,
      isLoading,
      APIURL,
    };
}

export async function addInventoryItem(title, minimumStockLevel, unitId) {
    const APIURL = `/inventory-items/add`;
    try {
      const response = await ApiClient.post(APIURL, {
        title,
        minimumStockLevel,
        unitId
      });
      return response;
    } catch (error) {
      throw error;
    }
}


export async function updateInventoryItem(id, title, minimumStockLevel, unitId) {
    const APIURL = `/inventory-items/update/${id}`;
    try {
      const response = await ApiClient.post(APIURL, {
        title,
        minimumStockLevel,
        unitId
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  export  async function addInventoryMovememt(inventoryItemId, stockQuantity, remarks, type, unitPrice, date) {
    const APIURL = `/inventory-items/${inventoryItemId}/movements/${type}`;
    try {
      const response = await ApiClient.post(APIURL, {
        unitPrice,
        stockQuantity,
        remarks,
        createdAt: date
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  