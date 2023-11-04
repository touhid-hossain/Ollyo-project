import React, { forwardRef } from "react";

const Photo = ({ url, id, index, faded, ...props }, ref) => {
  const { selecteditems, onChange, style, listeners } = props;
  // console.log(props);
  const inlineStyles = {
    opacity: faded ? "0.2" : "1",
    transformOrigin: "0 0",
    // height: index === 0 ? 'demo_size': 200,
    gridRowStart: index === 0 ? "span 2" : null,
    gridColumnStart: index === 0 ? "span 2" : null,
    backgroundImage: `url("${url}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // width: index === 0 ? 100 + "%" : 200,
    border: "1px solid #b8b5b5",
    borderRadius: "10px",
    ...style,
  };

  return (
    <div
      className={`image-container ${
        index === 0 ? "conditional_image_size" : "default_image_size"
      } `}
      ref={ref}
      style={inlineStyles}
      {...listeners}
    >
      {selecteditems.includes(id) && (
        <div className="light_overlay">
          <input
            name="checkbox"
            className="custom-checkbox-for-all"
            value={id}
            checked={selecteditems.includes(id)}
            type="checkbox"
            onChange={onChange}
          />
        </div>
      )}

      <div className="overlay">
        <input
          name="checkbox"
          className="custom-checkbox-for-all"
          value={id}
          checked={selecteditems.includes(id)}
          type="checkbox"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

const forwardPhoto = forwardRef(Photo);

export default forwardPhoto;
