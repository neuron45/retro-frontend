import React, { useRef, useState } from "react";
import Page from "../components/Page";
import {
  IconPrinter,
  IconReceipt,
  IconBox,
  IconX,
  IconPencil,
  IconEyeOff,
  IconPlus,
  IconMinus,
} from "@tabler/icons-react";
import { iconStroke } from "../config/config";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import { searchInvoices } from "../controllers/invoices.controller";
import { addInventoryItem, addInventoryMovememt, updateInventoryItem, useInventoryItems, useInventoryUnits } from "../controllers/inventory.controller";
import { getImageURL } from "../helpers/ImageHelper";
import { AddFab } from "../components/Fab";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateTime } from "../utils/formatDate";




// Then in your JSX:

export default function InventoryItemsPage() {
  const [isEditing, setIsEditing] = useState(false); 
  const [currentId, setCurrentId] = useState(null);
  const [addingStock, setAddingStock] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [itemTitle, setItemTitle] = useState('');



  const searchRef = useRef(null);
  const titleRef = useRef(null);
  const minimumStockLevelRef = useRef();
  const stockQuantityRef = useRef();
  const remarksRef = useRef();
  const unitPriceRef = useRef();
  const imageUrlRef = useRef();
  const unitIdRef = useRef(null);

  const [state, setState] = useState({
    search: "",
    searchResults: [],
    spage: 1,
    fromDate: null,
    toDate: null,
    customer: null,

    printSettings: null,
    storeSettings: null,
    currency: null
  });

  const {APIURL, data: inventoryItems, error, isLoading} = useInventoryItems();

  const {
    data: units,
    error: errorUnits,
    isLoading: isLoadingUnits,
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
    const item = inventoryItems.find((item) => item.id == id);

    if (titleRef.current) {
      setItemTitle(item.title);
      titleRef.current.value = item.title;
    }
    if (minimumStockLevelRef.current) {
      minimumStockLevelRef.current.value = item.minimumStockLevel;
    }
    if (unitIdRef.current) {
      unitIdRef.current.value = item.unitId;
    }
    document.getElementById("modal-add").showModal();
  }

  const resetFormFields = () => {
    const refs = [titleRef, minimumStockLevelRef, unitIdRef];
    setItemTitle('');
    refs.forEach(ref => {
        if (ref.current) {
            ref.current.value = null;
        }
    });
};

const resetStockFormFields = () => {
  const refs = [unitPriceRef, stockQuantityRef, remarksRef];
  refs.forEach(ref => {
      if (ref.current) {
          ref.current.value = null;
      }
  });
};

const btnShowAddStock = (id, type) => {
  setAddingStock(type === "add");
  setCurrentId(id);
  const item = inventoryItems.find((item) => item.id == id);
  if (titleRef.current) {
    titleRef.current.value = item.title;
  }
  if (minimumStockLevelRef.current) {
    minimumStockLevelRef.current.value = item.minimumStockLevel;
  }
  if (unitIdRef.current) {
    unitIdRef.current.value = item.unitId;
  }
  document.getElementById("modal-add-stock").showModal();
}


  const btnUpdate = async() => {
    const title = titleRef.current ? titleRef.current.value : itemTitle || null;
    const minimumStockLevel = minimumStockLevelRef.current.value || null;
    const unitId = unitIdRef.current.value || null;
    const id = currentId;
    if(!id) {
      toast.error("Invalid item id!");
      return;
    }
    if(!title) {
      toast.error("Please enter title!");
      return;
    }

    if(!unitId) {
      toast.error("Please select a unit!");
      return;
    }
    if (!minimumStockLevel) {
      toast.error("Please select a minimum stock level!");
      return;
    }

    try {
      toast.loading("Please wait...");
      const res = await updateInventoryItem(id, title, minimumStockLevel, unitId);

      if(res.status == 200) {
        titleRef.current.value = null;
        minimumStockLevelRef.current.value = null;
        unitIdRef.current.value = null;
        setCurrentId(null);

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

  const btnSearch = async () => {
    const searchQuery = searchRef.current.value;
    if (!new String(searchQuery).trim()) {
      return;
    }

    try {
      toast.loading("Please wait...");
      const res = await searchInvoices(new String(searchQuery).trim());
      if(res.status == 200) {
        toast.dismiss();
        setState({
          ...state,
          search: searchQuery,
          searchResults: res.data,
          spage: 1,
        });
      } else {
        toast.dismiss();
        toast.error("No result found!");
      }

    } catch (error) {
      console.error(error);
      const message = error.response.data.message || "Something went wrong! Try later!";

      toast.dismiss();
      toast.error(message);
    }
  }

  const btnClearSearch = () => {
    searchRef.current.value = null;

    setState({
      ...state,
      search: "",
      searchResults: [],
      spage: 1,
    });
  };

  async function btnAdd() {
    const title = itemTitle || null;
    const minimumStockLevel = minimumStockLevelRef.current.value || null;
    const unitId = unitIdRef.current.value || null;

    if(!title) {
      toast.error("Please enter title!");
      return;
    }

    if(!unitId) {
      toast.error("Please select a unit!");
      return;
    }

    try {
      toast.loading("Please wait...");
      const res = await addInventoryItem(title, minimumStockLevel, unitId);

      if(res.status == 200) {
        titleRef.current.value = null;
        minimumStockLevelRef.current.value = null;
        unitIdRef.current.value = null;

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

  async function btnAddStock(type) {
    const unitPrice = unitPriceRef.current?.value || null;
    const stockQuantity = stockQuantityRef.current.value || null;
    const remarks = remarksRef.current.value || null;
    if(!currentId) {
      toast.error("Invalid item id!");
      return;
    }
    if(type === "add" && !unitPrice) {
      toast.error("Please enter unit price!");
      return;
    }
    if(!stockQuantity) {
      toast.error("Please enter stock quantity!");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a date!");
      return;
    }

    try {
      toast.loading("Please wait...");
      const res = await addInventoryMovememt(currentId, stockQuantity, remarks, type, unitPrice, formatDateTime(selectedDate));

      if(res.status == 200) {
        if (unitPriceRef.current) {
          unitPriceRef.current.value = null;
        }
        stockQuantityRef.current.value = null;
        remarksRef.current.value = null;
        setCurrentId(null);

        await mutate(APIURL);
        toast.dismiss();
        if (type === "add") {
          toast.success(res.data.message);
        } else {
          toast.success("Successfully removed stock");
        }
      }
    } catch (error) {
      console.log(error);
      const message = "Something went wrong!";
      console.error(error);
      toast.dismiss();
      toast.error(message);
    }
  }

  return (
    <Page>
      <div className="flex flex-wrap gap-4 flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 mb-8">
          <a href="/dashboard/inventory"><h3 className="text-2xl" >Stock Management /</h3></a>
          <a href="/dashboard/inventory/units"><h4 className="text-2xl text-gray-400">Units</h4></a>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="bg-gray-100 px-2 py-1 rounded-lg flex items-center">
            <input
              ref={searchRef}
              defaultValue={state.search}
              type="text"
              placeholder="Search Inventory"
              className="bg-transparent placeholder:text-gray-400 outline-none block"
            />
            {state.search && (
              <button onClick={btnClearSearch} className="text-gray-400">
                <IconX stroke={iconStroke} size={18} />
              </button>
            )}
          </div>
          <button
            onClick={btnSearch}
            className="text-white bg-restro-green transition hover:bg-restro-green/80 active:scale-95 rounded-lg px-4 py-1 outline-restro-border-green-light"
          >
            Search
          </button>
        </div>
      </div>

      {/* search result */}
      {state.searchResults.length > 0 && <div className="mt-6">
        <h3>Showing Search Result for "{state.search}"</h3>
        <div className="overflow-x-auto w-full">
          <table className="table table-sm table-zebra border w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Minimum Stock Level</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {state.searchResults.map((item, index)=>{
                const {
                  id,
                  title,
                  stockQuantity,
                  minimumStockLevel,
                  unitTitle
                } = item;


                return <tr key={index}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{stockQuantity}</td>
                  <td>{minimumStockLevel}</td>
                  <td>{unitTitle}</td>
                  <td className="flex items-center gap-2">
                    <button onClick={()=>{btnViewReceipt(orderIdsArr, tokens)}} className="btn btn-sm btn-circle text-slate-500">
                      <IconReceipt stroke={iconStroke} />
                    </button>
                    <button onClick={()=>{btnPrintReceipt(orderIdsArr, tokens)}} className="btn btn-sm btn-circle text-slate-500">
                      <IconPrinter stroke={iconStroke} /> 
                    </button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>}
      {/* search result */}

      {/* data */}
      {inventoryItems.length == 0 ? (
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
                <th></th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Minimum Stock Level</th>
                <th>Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item, index)=>{
                const {
                  id,
                  title,
                  stockQuantity,
                  minimumStockLevel,
                  unitTitle,
                  imageUrl,
                  unitQuantity,
                } = item;
                const imageURL = imageUrl ? getImageURL(imageUrl) : null;

                return <tr key={index}>
                  <td>{id}</td>
                  <td>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-gray-400">
                      {!imageURL && <IconBox stroke={iconStroke} /> }
                      { imageURL && <img src={imageURL} alt={title} className="top-0 left-0 rounded-lg" /> }
                    </div>
                  </td>
                  <td>{title}</td>
                  <td>{stockQuantity}</td>
                  <td>{minimumStockLevel}</td>
                  <td>{unitTitle} of {unitQuantity}</td>
                  <td className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        btnShowUpdate(id);
                      }}
                      className="mr-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition active:scale-95"
                    >
                      <IconPencil stroke={iconStroke} />
                    </button>
                    {/* <button
                      onClick={() => {
                        btnDelete(id);
                      }}
                      className="mr-2 w-8 h-8 flex items-center justify-center text-red-500 hover:bg-gray-100 transition active:scale-95"
                    >
                      <IconEyeOff stroke={iconStroke} />
                    </button> */}
                    <button
                      onClick={() => {
                        btnShowAddStock(id, "add");
                      }}
                      className="mr-2 w-8 h-8 flex items-center justify-center text-green-500 hover:bg-gray-100 transition active:scale-95 rounded-full border"
                    >
                      <IconPlus stroke={iconStroke} />
                    </button>
                    <button
                      onClick={() => {
                        btnShowAddStock(id, "remove");
                      }}
                      className="w-8 h-8  flex items-center justify-center text-red-500 hover:bg-gray-100 transition active:scale-95 items-center justify-center rounded-full border"
                    >
                      <IconMinus stroke={iconStroke} />
                    </button>
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      )}
      {/* data */}
      {/* Add Inventory Item */}
      <dialog id="modal-add" className="modal modal-bottom sm:modal-middle" onClose={() => resetFormFields()}>
        <div className="modal-box">
          <h3 className="font-bold text-lg"> {isEditing ? 'Update Item' : 'Add New Item' }</h3>
          <div className="mt-4">
            <label htmlFor="title" className="mb-1 block text-gray-500 text-sm">
              Title
            </label>
            <input
              ref={titleRef}
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              type="text"
              name="title"
              className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
              placeholder="Enter Item Title"
            />
          </div>

          <div className="flex gap-4 w-full my-4">
            <div className="flex-1">
              <label
                htmlFor="price"
                className="mb-1 block text-gray-500 text-sm"
              >
                Minimum stock level
              </label>
              <input
                ref={minimumStockLevelRef}
                type="number"
                name="minimumStockLevel"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
                placeholder="Enter Item Price"
              />
            </div>
          </div>

          <div className="flex gap-4 w-full my-4">
            <div className="flex-1">
              <label
                htmlFor="category"
                className="mb-1 block text-gray-500 text-sm"
              >
                Unit
              </label>
              <select
                ref={unitIdRef}
                name="category"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
                placeholder="Select Category"
              >
                {
                  (units || []).map(unit=>{
                    return <option value={unit.id} key={unit.id}>{unit.title} of {unit.quantity}</option>
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
      {/* Ed Add Inventory Item */}
      {/* Add stock */}
      <dialog id="modal-add-stock" className="modal modal-bottom sm:modal-middle" onClose={() => resetStockFormFields()}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{ addingStock ? 'Add Stock' : 'Remove Stock' }</h3>
          <div className="mt-4">
            <label htmlFor="title" className="mb-1 block text-gray-500 text-sm">
              Product
            </label>
            <input
              ref={titleRef}
              disabled
              type="text"
              name="title"
              className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
              placeholder="Enter Item Title"
            />
          </div>
          <div className="flex gap-4 w-full my-4">
          <div className="flex-1">
            <label
              htmlFor="datetime"
              className="mb-1 mr-2 text-gray-500 text-sm"
            >
              Date and Time 
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm:ss"
              className="text-sm border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
            />
          </div>
          </div>
          
          <div className="flex gap-4 w-full my-4">
            <div className="flex-1">
              <label
                htmlFor="quantity"
                className="mb-1 block text-gray-500 text-sm"
              >
                Enter Quantity
              </label>
              <input
                ref={stockQuantityRef}
                type="number"
                name="quantity"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
                placeholder="Enter Quantity"
              />
            </div>
          </div>
          { addingStock &&
          <div className="flex gap-4 w-full my-4">
            <div className="flex-1">
              <label
                htmlFor="unitPrice"
                className="mb-1 block text-gray-500 text-sm"
              >
                Unit Price
              </label>
              <input
                ref={unitPriceRef}
                type="number"
                name="unitPrice"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
                placeholder="Enter Unit Price"
              />
            </div>
          </div>
        }
          <div className="flex gap-4 w-full my-4">
            <div className="flex-1">
              <label
                htmlFor="remarks"
                className="mb-1 block text-gray-500 text-sm"
              >
                { addingStock ? 'Remarks' : 'Purpose' }
              </label>
              <textarea
                ref={remarksRef}
                type="text"
                name="remarks"
                className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light"
                placeholder={addingStock ? "Enter Remarks" : "Enter Purpose for using stock"}
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
                  {addingStock ? btnAddStock("add") : btnAddStock("remove")}
                }}
                className="rounded-lg hover:bg-red-800 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-restro-green text-white ml-3"
              >
                {addingStock ? "Add" : "Remove"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* End Add stock */}
      <AddFab onclick={() => {
        setIsEditing(false);
        document.getElementById("modal-add").showModal();
        }} />
    </Page>
  )
}
