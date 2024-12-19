import ApiClient from "../helpers/ApiClient";
import useSWR from "swr";

const fetcher = (url) => ApiClient.get(url).then((res) => res.data);

export function useMenuItems() {
  const APIURL = `/menu-items`;
  const { data, error, isLoading } = useSWR(APIURL, fetcher);
  return {
    data,
    error,
    isLoading,
    APIURL,
  };
}

export function useMenuItem(id) {
  const APIURL = `/menu-items/${id}`;
  const { data, error, isLoading } = useSWR(APIURL, fetcher);
  return {
    data,
    error,
    isLoading,
    APIURL,
  };
}

export async function addMenuItem(title, netPrice, categoryId, taxGroupId) {
  try {
    const response = await ApiClient.post("/menu-items/add", {
      title,
      netPrice,
      categoryId,
      taxGroupId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateMenuItem(id, title, netPrice, categoryId, taxGroupId) {
  try {
    const response = await ApiClient.post(`/menu-items/update/${id}`, {
      title,
      netPrice,
      categoryId,
      taxGroupId,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function uploadMenuItemPhoto(id, form) {
  try {
    const response = await ApiClient.post(`/menu-items/update/${id}/upload-photo`, form);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function removeMenuItemPhoto(id) {
  try {
    const response = await ApiClient.post(`/menu-items/update/${id}/remove-photo`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteMenuItem(id) {
  try {
    const response = await ApiClient.delete(`/menu-items/delete/${id}`)
    return response;
  } catch (error) {
    throw error;
  }
};

export async function addMenuItemVariant(itemId, title, netPrice) {
  try {
    const response = await ApiClient.post(`/menu-items/variants/${itemId}/add`, {
      title,
      netPrice
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateMenuItemVariant(itemId, variantId, title, netPrice) {
  try {
    const response = await ApiClient.post(`/menu-items/variants/${itemId}/update/${variantId}`, {
      title,
      netPrice
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteMenuItemVariant(itemId, variantId) {
  try {
    const response = await ApiClient.delete(`/menu-items/variants/${itemId}/delete/${variantId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export async function addMenuItemAddon(itemId, title, netPrice) {
  try {
    const response = await ApiClient.post(`/menu-items/addons/${itemId}/add`, {
      title,
      netPrice
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateMenuItemAddon(itemId, addonId, title, netPrice) {
  try {
    const response = await ApiClient.post(`/menu-items/addons/${itemId}/update/${addonId}`, {
      title,
      netPrice
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteMenuItemAddon(itemId, addonId) {
  try {
    const response = await ApiClient.delete(`/menu-items/addons/${itemId}/delete/${addonId}`);
    return response;
  } catch (error) {
    throw error;
  }
};