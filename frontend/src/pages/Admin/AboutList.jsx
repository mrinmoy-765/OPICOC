import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const AboutList = () => {
  const AxiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [aboutList, setAboutList] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch about sections
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const res = await AxiosSecure.get("/admin/get-about");
        setAboutList(res.data.about || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, [AxiosSecure]);

  // delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This content will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await AxiosSecure.delete(`/admin/delete-about/${id}`);

          if (!res.data.success) {
            toast.error(res.data.message);
            return;
          }

          setAboutList((prev) => prev.filter((item) => item._id !== id));
          Swal.fire("Deleted!", "Content removed successfully.", "success");
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 my-6">
      {/* header */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-black font-clash">Manage About</p>

        <Link
          to="/create-about"
          className="btn font-bold bg-green-500 text-white hover:bg-green-600"
        >
          + New
        </Link>
      </div>

      {/* empty state */}
      {aboutList.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No About content found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aboutList.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-md border">
              <div className="card-body">
                <h2 className="card-title font-bold text-lg">{item.heading}</h2>

                <p className="text-sm text-gray-600 line-clamp-5">
                  {item.content}
                </p>

                <div className="card-actions justify-end mt-4 gap-2">
                  {/* edit */}
                  <button
                    onClick={() => navigate(`/edit-about/${item._id}`)}
                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  {/* delete */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutList;
