import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const WriteReview = () => {
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <div className="bg-white p-5 md:p-10 rounded-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-clash mb-4">Write a review</h1>

      {/* Textarea + rating + submit inside the yellow area */}
      <div className="bg-[#FADD8A] rounded-lg p-5 flex flex-col gap-5">
        {/* Text input */}
        <textarea
          placeholder="Share Your Experience"
          className="w-full h-32 bg-transparent border-none focus:ring-0 resize-none text-black placeholder:text-black/50"
        ></textarea>

        {/* rating + submit row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Rating Box */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => setValue(newValue)}
              onChangeActive={(event, newHover) => setHover(newHover)}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>

          {/* Submit button */}
          <button className="group w-full md:w-auto px-8 py-3 bg-[#F5B400] text-black font-semibold rounded-lg hover:bg-yellow-600 transition">
            <span className="inline-block group-hover:translate-x-2 transition duration-300">
              Submit
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
