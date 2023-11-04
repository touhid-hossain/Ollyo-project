import React from "react";

const GalleryHeader = ({ deleteSelectedImages, selectedItems }) => {
  return (
    <div className="gallery_heading_wrapper">
      <div className="gallery_text_changing_wrapper">
        {selectedItems.length > 0 ? (
          <div className="selecting_heading_text">
            <input type="checkbox" />
            <p className="gallery_heading_text">{`${selectedItems.length} ${selectedItems.length === 1 ? "File Selected" : "Files Selected"}`}</p>
          </div>
        ) : (
          <p className="gallery_heading_text">Gallery</p>
        )}
      </div>
      {selectedItems.length > 0 ? (
        <button className="delete-button" onClick={deleteSelectedImages}>
          {" "}
          {selectedItems.length === 1 ? "Delete File" : "Delete Files"}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default GalleryHeader;
