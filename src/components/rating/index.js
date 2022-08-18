import React from "react";
import ReactStars from "react-rating-stars-component";

const Rating = (props) => {
  return (
    <div>
      <ReactStars
        size={18}
        value={Number(props.value)}
        edit={false}
        isHalf={true}
      />
    </div>
  );
};

export default Rating;
