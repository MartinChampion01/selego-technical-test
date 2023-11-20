import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";

import Loader from "../../components/loader";
import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";

export default () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const response = await api.get(`/user/${id}`);
      setUser(response.data);
    })();
  }, []);

  if (!user) return <Loader />;

  return (
    <div>
      <div className="appContainer pt-24">
        <Detail user={user} />
      </div>
    </div>
  );
};

const Detail = ({ user }) => {
  const history = useHistory();

  async function deleteData() {
    const confirm = window.confirm("Are you sure ?");
    if (!confirm) return;
    await api.remove(`/user/${user._id}`);
    toast.success("successfully removed!");
    history.push(`/user`);
  }

  return (
    <Formik
      initialValues={user}
      onSubmit={async (values) => {
        try {
          await api.put(`/user/${user._id}`, values);
          toast.success("Updated!");
        } catch (e) {
          console.log(e);
          toast.error("Some Error!");
        }
      }}>
      {({ values, handleChange, handleSubmit, isSubmitting }) => {
        return (
          <React.Fragment>
            <div className="flex justify-between flex-wrap mt-4">
              <div className="w-full md:w-[260px] mt-[10px] md:mt-0 ">
                <div className="text-[14px] text-[#212325] font-medium	">Name</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] bg-[#F9FBFD] rounded-[10px]"
                  name="name"
                  disabled
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-[260px] mt-[10px] md:mt-0">
                <div className="text-[14px] text-[#212325] font-medium	">Email</div>
                <input className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]" name="email" value={values.email} onChange={handleChange} />
              </div>
              <div className="w-full md:w-[165px] mt-[10px] md:mt-0">
                <div className="text-[14px] text-[#212325] font-medium	">Status</div>
                <select className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]" type="select" name="status" value={values.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap justify-between mt-4	space-x-3">
              <div className="w-full md:w-[260px] ">
                <div className="text-[14px] text-[#212325] font-medium">Job title</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px] bg-[#fff]"
                  name="job_title"
                  value={values.job_title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-between mt-4">
              <div className="w-full md:w-[260px] ">
                <div className="text-[14px] text-[#212325] font-medium	">Days worked</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                  type="number"
                  name="days_worked"
                  value={values.days_worked}
                  onChange={handleChange}
                />{" "}
              </div>
              <div className="w-full md:w-[260px] ">
                <div className="text-[14px] text-[#212325] font-medium	">Cost per day</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                  type="number"
                  name="costPerDay"
                  value={values.costPerDay}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-[260px] ">
                <div className="text-[14px] text-[#212325] font-medium	">Sell per day</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                  type="number"
                  name="sellPerDay"
                  value={values.sellPerDay}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full mt-3">
              <div className="text-[14px] text-[#212325] font-medium	">Description</div>
              <textarea
                className="w-full text-[14px] font-normal text-[#212325] border border-[#ced4da] mt-2 rounded-[10px] text-sm p-2  focus:outline-none focus:ring focus:ring-[#80bdff]"
                rows="12"
                name="description"
                value={values.description}
                onChange={handleChange}></textarea>
            </div>

            <div className="flex  mt-2">
              <LoadingButton className="bg-[#0560FD] text-[16px] font-medium text-[#FFFFFF] py-[12px] px-[22px] rounded-[10px]" loading={isSubmitting} onClick={handleSubmit}>
                Update
              </LoadingButton> 
              <button className="ml-[10px] bg-[#F43F5E] text-[16px] font-medium text-[#FFFFFF] py-[12px] px-[22px] rounded-[10px]" onClick={deleteData}>
                Delete
              </button>
            </div>
          </React.Fragment>
        );
      }}
    </Formik>
  );
};
//bug 1 : user/view.js l.135 : fix update button by replacing the onChange with an onClick, because we want data to be updated when we click on the button, otherwise it won't work, a button has a function linked to it by clicking with onClick, not onChange
//bug 2 : user/list.js l.132 : fix the name field in user details. Nothing was displaid inside because when creating an user, the string written in Name goes in an input named "username" in the HTML and in the detail view, the Name field, names "name" that should acces the name value couldn't find it. I renamed the input from the user creation form "name". Now we even have the name displaid on the user card.
//bug 3 : activity/index.js l.39-44 : wasn't possible to select a project and then to go back on all project because e was undefined so it wasn't possible to read a name. So if e is undefined, it means none of the project are selected so all projects is selected. I still don't understand why nothing change when I select a project it looks like a bug but I don't know what should happen so I don't know how to fix that.
//bug 4 : projects/view.js l.75 : toString() was used to display the name of the project but project.name already is a string. This was preventing us from navigate to the detail project window
//bug 5 : projects/views l.76+84+87+90 : the project we got was a table so we should put project[0]. to get values. I think the purpose of this bug was to understand why here the API was sending a table and to fix that but I don't have time anymore
//bug 6 (not sure) : user/view.js l.63 : I don't know if it's a bug but we can't edit the name. If we remove "disabled" on the input it would be possible to edit name
//other bug I've noticed : You can't edit a project, the page just keeps loading forever. If you create a new project, it won't be displaid immediately we must reload the page. If I update my email in my account it isn't saved and if I do it in the user interface, it won't be updated in my account.
//Inside project details, the grid corresponding to months isn't updated when you update the gris in activity.

