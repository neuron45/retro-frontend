import React, { useRef } from "react";
import Page from "../../components/Page";
import { IconCarrot, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { iconStroke } from "../../config/config";
import { useCategories, useTaxGroups } from "../../controllers/settings.controller";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { Link, useNavigate } from "react-router-dom";
import { addMenuItem, deleteMenuItem, useMenuItems } from "../../controllers/menu_item.controller";
import { getImageURL } from "../../helpers/ImageHelper";
import { AddFab } from "../../components/Fab";
import { useInventoryItems } from "../../controllers/inventory.controller";

export default function MenuItemsSettingsPage() {
  const navigate = useNavigate();
  const titleRef = useRef();
  const netPriceRef = useRef();
  const taxGroupIdRef = useRef();
  const categoryIdRef = useRef();

  const {
    data: categories,
    error: errorCategories,
    isLoading: isLoadingCategories,
  } = useCategories();

  const { data:taxGroups, isLoading:isLoadingTaxGroups } = useTaxGroups();
  const {APIURL, data: menuItems,error,isLoading} = useMenuItems();
  const {data: inventoryItems} = useInventoryItems(false);

  if (isLoadingCategories) {
    return <Page>Please wait...</Page>;
  }

  if (errorCategories) {
    return <Page>Error loading details! Please Try Later!</Page>;
  }

  if(isLoading) {
    return <Page>Please wait...</Page>
  }

  if(error) {
    return <Page>Error loading details! Please Try Later!</Page>;
  }

  async function btnAdd() {
    const title = titleRef.current.value;
    const netPrice = netPriceRef.current.value || null;
    const categoryId = categoryIdRef.current.value || null;
    const taxGroupId = taxGroupIdRef.current.value || null;

    if(!title) {
      toast.error("Please enter title!");
      return;
    }

    if(netPrice < 0) {
      toast.error("Please provide valid price!");
      return;
    }

    try {
      toast.loading("Please wait...");
      const res = await addMenuItem(title, netPrice, categoryId, taxGroupId);

      if(res.status == 200) {
        titleRef.current.value = null;
        netPriceRef.current.value = null;
        categoryIdRef.current.value = null;
        taxGroupIdRef.current.value = null;

        await mutate(APIURL);
        toast.dismiss();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const message = error.response.data.message || "Something went wrong!";
      console.error(error);
      toast.dismiss();
      toast.error(message);
    }
  }

  const btnDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure! This process is irreversible!");

    if(!isConfirm) {
      return;
    }

    try {
      toast.loading("Please wait...");
      const res = await deleteMenuItem(id);

      if(res.status == 200) {
        await mutate(APIURL);
        toast.dismiss();
        toast.success(res.data.message);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      console.error(error);

      toast.dismiss();
      toast.error(message);
    }
  };

  const btnShowUpdate = (id) => {
    navigate(`/dashboard/settings/menu-items/${id}`);
  }

  return (
    <Page className="px-8 py-6">
      <div className="flex md:items-center flex-col md:flex-row gap-2">
        <h3 className="text-3xl font-light mr-6">Menu</h3>
        <Link
          to="categories"
          className="w-fit rounded-lg border bg-gray-50 hover:bg-gray-100 transition active:scale-95 hover:shadow-lg text-gray-500 px-3 py-1"
        >
          Categories
        </Link>
      </div>

      <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {(menuItems || []).map((menuItem, index) => {
          const { id, title, net_price, tax_id, category_id, category_title, addons, variants, image } = menuItem;
          const imageURL = image ? getImageURL(image) : null;

          return (
            <div
              key={id}
              className="border px-4 py-3 rounded-2xl flex flex-wrap items-center gap-2 text-sm"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-gray-400">
              {!imageURL && <IconCarrot stroke={iconStroke} /> }
              { imageURL && <img src={imageURL} alt={title} className="top-0 left-0 rounded-lg" /> }
              </div>
              <div className="flex-1">
                <p>
                  {title} - {net_price}
                </p>
                <p className="text-gray-400 text-xs">
                  {category_title}
                </p>
                {variants.length > 0 && <p className="text-gray-400 text-xs">
                  {variants.length} Variants
                </p>}
              </div>
              <div className="flex gap-0">
                <button
                  onClick={() => {
                    btnShowUpdate(id);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition active:scale-95"
                >
                  <IconPencil stroke={iconStroke} />
                </button>
                <button
                  onClick={() => {
                    btnDelete(id);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-gray-100 transition active:scale-95"
                >
                  <IconTrash stroke={iconStroke} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* add dialog */}
      <dialog id="modal-add" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Item</h3>

          <div className="mt-4">
            <label htmlFor="title" className="mb-1 block text-gray-500 text-sm">
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              name="title"
              className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
              placeholder="Enter Item Title"
            />
          </div>

          <div className="flex gap-4 w-full my-4">
            <div className="flex-1">
              <label
                htmlFor="nprice"
                className="mb-1 block text-gray-500 text-sm"
              >
                Net Price
              </label>
              <input
                ref={netPriceRef}
                type="number"
                name="nprice"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
                placeholder="Enter Item Net Price"
              />
            </div>
          </div>

          <div className="flex gap-4 w-full my-4">
            <div className="flex-1">
              <label
                htmlFor="category"
                className="mb-1 block text-gray-500 text-sm"
              >
                Category
              </label>
              <select
                ref={categoryIdRef}
                name="category"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
                placeholder="Select Category"
              >
                <option value="">None</option>
                {
                  categories.map((category, index)=>{
                    return <option value={category.id} key={category.id}>{category.title}</option>
                  })
                }
              </select>
            </div>
            <div className="flex-1">
              <label
                htmlFor="tax"
                className="mb-1 block text-gray-500 text-sm"
              >
                Tax Group
              </label>
              <select
                ref={taxGroupIdRef}
                name="taxGroupId"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
                placeholder="Select Tax Group"
              >
                <option value="">None</option>
                {
                  (taxGroups || []).map((taxGroup)=>{
                    return <option value={taxGroup.id} key={taxGroup.id}>{taxGroup.title}</option>
                  })
                }
              </select>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="rounded-lg hover:bg-gray-200 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-gray-200 text-gray-500">
                Close
              </button>
              <button
                onClick={() => {
                  btnAdd();
                }}
                className="rounded-lg hover:bg-red-800 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-restro-green text-white ml-3"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* add dialog */}
      <AddFab onclick={() => document.getElementById("modal-add").showModal()} />
    </Page>
  );
}
