import React, { useRef } from "react";
import Page from "../../components/Page";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { iconStroke } from "../../config/config";
import {  addNewTaxGroup,  deleteTaxGroup,  updateTaxGroup,  useTaxGroups } from "../../controllers/settings.controller";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { Link } from "react-router-dom";
import { AddFab } from "../../components/Fab";

export default function TaxGroupsPage() {
  const taxGroupsTitleRef = useRef();

  const taxGroupIdRef = useRef();
  const taxGroupTitleUpdateRef = useRef();

  const { APIURL, data: taxGroups, error, isLoading } = useTaxGroups();

  if (isLoading) {
    return <Page className="px-8 py-6">Please wait...</Page>;
  }

  if (error) {
    console.error(error);
    return <Page className="px-8 py-6">Error loading data, Try Later!</Page>;
  }

  async function btnAdd() {
    const title = taxGroupsTitleRef.current.value;

    if(!title) {
      toast.error("Please provide Tax Group Title!");
      return;
    }

    try {
      toast.loading("Please wait...");
      const res = await addNewTaxGroup(title);

      if(res.status == 200) {
        taxGroupsTitleRef.current.value = "";
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
  }

  const btnShowUpdate = async (id, title) => {
    taxGroupIdRef.current.value = id;
    taxGroupTitleUpdateRef.current.value = title;
    document.getElementById('modal-update').showModal();
  };

  const btnUpdate = async () => {
    const id = taxGroupIdRef.current.value
    const title = taxGroupTitleUpdateRef.current.value

    if(!title) {
      toast.error("Please provide title!");
      return;
    }

    try {
      toast.loading("Please wait...");
      const res = await updateTaxGroup(id, title);

      if(res.status == 200) {
        taxGroupIdRef.current.value = null;
        taxGroupTitleUpdateRef.current.value = null;

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

  const btnDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure! This process is irreversible!");

    if(!isConfirm) {
      return;
    }

    try {
      toast.loading("Please wait...");
      const res = await deleteTaxGroup(id);

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

  return (
    <Page className="px-8 py-6">
      <div className="flex items-center gap-6">
        <h3 className="text-3xl font-light">Tax Groups</h3>
        <Link
          to="../tax-setup"
          className="w-fit rounded-lg border bg-gray-50 hover:bg-gray-100 transition active:scale-95 hover:shadow-lg text-gray-500 px-3 py-1"
        >
          Tax Setup
        </Link>
      </div>

      <div className="mt-8 w-full">
        <table className="w-full border overflow-x-auto">
          <thead>
            <tr>
              <th className="px-3 py-2 bg-gray-100 font-medium text-gray-500 text-start w-20">
                #
              </th>
              <th className="px-3 py-2 bg-gray-100 font-medium text-gray-500 text-start w-96">
                Title
              </th>

              <th className="px-3 py-2 bg-gray-100 font-medium text-gray-500 text-start w-28">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {taxGroups.map((taxGroup, index) => {
              const { id, title } = taxGroup;

              return (
                <tr key={index}>
                  <td className="px-3 py-2 text-start">{index+1}</td>
                  <td className="px-3 py-2 text-start">{title}</td>
                  <td className="px-3 py-2 text-start flex gap-2 items-center">
                    <button
                      onClick={() => {
                        btnShowUpdate(id, title);
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition active:scale-95"
                    >
                      <IconPencil stroke={iconStroke} />
                    </button>
                    <button
                      onClick={()=>{
                        btnDelete(id);
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-gray-100 transition active:scale-95"
                    >
                      <IconTrash stroke={iconStroke} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <dialog id="modal-add" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Group</h3>
          
          <div className="my-4">
            <label htmlFor="title" className="mb-1 block text-gray-500 text-sm">Tax Group Title</label>
            <input ref={taxGroupsTitleRef} type="text" name="title" className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light" placeholder="Enter Tax Group Title..." />
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="rounded-lg hover:bg-gray-200 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-gray-200 text-gray-500">Close</button>
              <button onClick={()=>{btnAdd();}} className="rounded-lg hover:bg-red-800 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-restro-green text-white ml-3">Save</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="modal-update" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Group</h3>
          
          <div className="my-4">
            <input type="hidden" ref={taxGroupIdRef} />
            <label htmlFor="title" className="mb-1 block text-gray-500 text-sm">Group Title</label>
            <input ref={taxGroupTitleUpdateRef} type="text" name="title" className="text-sm w-full border rounded-lg px-4 py-2 bg-gray-50 outline-restro-border-green-light" placeholder="Enter Tax Group Title..." />
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="rounded-lg hover:bg-gray-200 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-gray-200 text-gray-500">Close</button>
              <button onClick={()=>{btnUpdate();}} className="rounded-lg hover:bg-red-800 transition active:scale-95 hover:shadow-lg px-4 py-3 bg-restro-green text-white ml-3">Save</button>
            </form>
          </div>
        </div>
      </dialog>
      <AddFab onclick={() => document.getElementById("modal-add").showModal()}/>
    </Page>
  );
}
