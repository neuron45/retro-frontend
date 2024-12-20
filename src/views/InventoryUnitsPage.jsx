import React, { useRef, useState } from "react";
import Page from "../components/Page";
import {
  IconPencil,
  IconEyeOff,
} from "@tabler/icons-react";
import { iconStroke } from "../config/config";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import { addInventoryUnit, updateInventoryUnit,  useInventoryUnits } from "../controllers/inventory.controller";
import { AddFab } from "../components/Fab";
import "react-datepicker/dist/react-datepicker.css";


export default function InventoryUnitsPage() {
  const [isEditing, setIsEditing] = useState(false); 
  const [itemTitle, setItemTitle] = useState('');
  const [currentId, setCurrentId] = useState(null);
  
  const titleRef = useRef(null);
  const unitQuantityRef = useRef();
  const descriptionRef = useRef();

  const {
    data: units,
    error,
    isLoading,
    APIURL,
  } = useInventoryUnits();

  if (isLoading) {
    return <Page>Please wait...</Page>;
  }

  if (error) {
    return <Page>Error loading details! Please try later!</Page>;
  }

  const btnShowUpdate = (id) => {
    setIsEditing(true);
    setCurrentId(id);
    const item = units.find((item) => item.id == id);

    if (titleRef.current) {
      setItemTitle(item.title);
      titleRef.current.value = item.title;
    }
    if (unitQuantityRef.current) {
      unitQuantityRef.current.value = item.quantity;
    }
    if (descriptionRef.current) {
      descriptionRef.current.value = item.description;
    }
    document.getElementById("modal-add").showModal();
  }

const resetFormFields = () => {
    const refs = [titleRef, unitQuantityRef, descriptionRef];
    refs.forEach(ref => {
        if (ref.current) {
            ref.current.value = null;
        }
    });
};

  const btnUpdate = async() => {
    const title = itemTitle || null;
    const quantity = unitQuantityRef.current.value || null;
    const description = descriptionRef.current.value || null;
    const id = currentId;
    if(!id) {
      toast.error("Invalid unit id!");
      return;
    }
    if(!title) {
      toast.error("Please enter title!");
      return;
    }

    if(!quantity) {
      toast.error("Please enter quantity!");
      return;
    }
  

    try {
      toast.loading("Please wait...");
      const res = await updateInventoryUnit(id, title, quantity, description);

      if(res.status == 200) {
        resetFormFields();
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

  // const btnSearch = async () => {
  //   const searchQuery = searchRef.current.value;
  //   if (!new String(searchQuery).trim()) {
  //     return;
  //   }

  //   try {
  //     toast.loading("Please wait...");
  //     const res = await searchInvoices(new String(searchQuery).trim());
  //     if(res.status == 200) {
  //       toast.dismiss();
  //       setState({
  //         ...state,
  //         search: searchQuery,
  //         searchResults: res.data,
  //         spage: 1,
  //       });
  //     } else {
  //       toast.dismiss();
  //       toast.error("No result found!");
  //     }

  //   } catch (error) {
  //     console.error(error);
  //     const message = error.response.data.message || "Something went wrong! Try later!";

  //     toast.dismiss();
  //     toast.error(message);
  //   }
  // }

  // const btnClearSearch = () => {
  //   searchRef.current.value = null;

  //   setState({
  //     ...state,
  //     search: "",
  //     searchResults: [],
  //     spage: 1,
  //   });
  // };

  async function btnAdd() {
    const title = titleRef.current.value;
    const quantity = unitQuantityRef.current.value || null;
    const description = descriptionRef.current.value || null;

    if(!title) {
      toast.error("Please enter title!");
      return;
    }

    if(!quantity) {
      toast.error("Please add quantity!");
      return;
    }

    if(!description) {
      toast.error("Please add description!");
      return;
    }

    try {
      toast.loading("Please wait...");
      const res = await addInventoryUnit(title, quantity, description);

      if(res.status == 200) {
        resetFormFields();
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


  return (
    <Page>
      <div className="flex flex-wrap gap-4 flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 mb-8">
          <a href="/dashboard/inventory"><h3 className="text-2xl text-gray-400" >Stock Management /</h3></a>
          <a href="/dashboard/inventory/units"><h4 className="text-2xl">Units</h4></a>
        </div>
      </div>

      {/* data */}
      {units.length == 0 ? (
        <div className="text-center w-full h-[50vh] flex flex-col items-center justify-center text-gray-500">
          <img
            src="/assets/illustrations/no-invoice.png"
            alt="no invoices"
            className="w-full md:w-60"
          />
          <p>No Results found!</p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="table table-sm table-zebra border w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {units.map((item, index)=>{
                const {
                  id,
                  title,
                  quantity
                } = item;

                return <tr key={index}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{quantity}</td>
                  <td className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        btnShowUpdate(id);
                      }}
                      className="mr-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition active:scale-95"
                    >
                      <IconPencil stroke={iconStroke} />
                    </button>
                    <button
                      onClick={() => {
                        btnDelete(id);
                      }}
                      className="mr-2 w-8 h-8 flex items-center justify-center text-red-500 hover:bg-gray-100 transition active:scale-95"
                    >
                      <IconEyeOff stroke={iconStroke} />
                    </button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      )}
      {/* data */}
      {/* Add Inventory unit */}
      <dialog id="modal-add" className="modal modal-bottom sm:modal-middle" onClose={() => resetFormFields()}>
        <div className="modal-box">
          <h3 className="font-bold text-lg"> {isEditing ? 'Update Item' : 'Add New Item' }</h3>
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
                htmlFor="quantity"
                className="mb-1 block text-gray-500 text-sm"
              >
                Unit Quantity
              </label>
              <input
                ref={unitQuantityRef}
                type="number"
                name="quantity"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
                placeholder="Enter Unit quantity"
                required={true}
              />
            </div>
          </div>

          <div className="flex gap-4 w-full my-4">
            <div className="flex-1">
              <label
                htmlFor="category"
                className="mb-1 block text-gray-500 text-sm"
              >
                Description
              </label>
              <textarea
                ref={descriptionRef}
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
                name="description"
                placeholder="Enter description"
                required={false}
               />
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
                  {isEditing ? btnUpdate() : btnAdd()}
                }}
                className="rounded-lg hover:bg-red-800 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-restro-green text-white ml-3"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* End Add Inventory unit */}
      <AddFab onclick={() => {
        setIsEditing(false);
        resetFormFields();
        document.getElementById("modal-add").showModal();
        }} />
    </Page>
  )
}
