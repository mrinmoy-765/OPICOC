import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const About = () => {
  const AxiosPublic = useAxiosPublic();

  const [aboutList, setAboutList] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch about sections
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const res = await AxiosPublic.get("/admin/get-about");
        setAboutList(res.data.about || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, [AxiosPublic]);
  if (loading) return <Spinner></Spinner>;
  return (
    <div>
      <h1 className="lg:text-4xl md:text-2xl text-xl font-semibold font-clash ml-5 mt-2">
        About
      </h1>
      <div>
        {aboutList.map((item) => (
          <div
            key={item._id}
            className="card w-full bg-base-100 card-md shadow-sm"
          >
            <div className="card-body">
              <h2 className="card-title">{item.heading}</h2>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
