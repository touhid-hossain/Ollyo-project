import React, { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import GalleryHeader from "../GalleryHeader/GalleryHeader";
import GalleryMainGridLayout from "../GalleryMainGridLayout/GalleryMainGridLayout";
import {
  DndContext,
  MouseSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import ForwardPhoto from "../Photo/Photo";
import { galleryImages } from "../../assets/photos";

// Only Initialize sort function when dragging 10px   💡 here!!!
// This function is "Must_required" for avoiding input checkbox clicking problem.
const GalleryMainLayout = () => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const [items, setItems] = useState(galleryImages); //stores all the initial images
  const sensors = useSensors(mouseSensor);
  const [selectedItems, setSelectedItems] = useState([]); //stores all the selected images ID
  const [activeId, setActiveId] = useState(null);
  const activeURL = items.find((photo) => photo.id === activeId)?.url;
  const [isChecked, setIsChecked] = useState(false); //For the big CheckBox on top also referred as All_CheckBox

  // Storing selected [ Gallery-Images ] in a state
  const onChange = (e) => {
    let isSelected = e.target.checked;
    let value = parseInt(e.target.value);

    if (isSelected) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  };

  //Removing selected Images from the gallery when Delete file is clicked
  const deleteSelectedImages = () => {
    setItems(items.filter((photo) => !selectedItems.includes(photo.id)));
    setSelectedItems([]);
  };

  //Removing all selected images from unchecking from top!!
  const removeAllCheckedPhotos = () => {
    if (isChecked) {
      setSelectedItems([]);
    } else {
      setIsChecked((prev) => !prev);
    }
  };

  //Showing the all checkBox on top if one or more image is selected
  useEffect(() => {
    if (selectedItems.length > 0) {
      setIsChecked(true);
    }
  }, [selectedItems]);

  return (
    <div className="container">
      <div className="gallery_wrapper">
        {/* Gallery__Dynamic-Header -- Part */}
        <GalleryHeader
          deleteSelectedImages={deleteSelectedImages}
          removeAllCheckedPhotos={removeAllCheckedPhotos}
          selectedItems={selectedItems}
          isChecked={isChecked}
          items={items}
        />
        {/* Gallery__Main_layout -- Part */}
        <div className="grid_component grid_style">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext items={items} strategy={rectSortingStrategy}>
              {items.map(({ url, id }, index) => (
                <GalleryMainGridLayout
                  key={url}
                  url={url}
                  id={id}
                  activeId={activeId}
                  index={index}
                  selecteditems={selectedItems}
                  onChange={onChange}
                />
              ))}
            </SortableContext>
            <DragOverlay adjustScale={true}>
              {activeId ? (
                <ForwardPhoto
                  url={activeURL}
                  index={items.findIndex(({ id }) => id === activeId)}
                  id={activeId}
                  key={activeURL}
                  selecteditems={selectedItems}
                  onChange={onChange}
                  isDraggable={true} // Remove hover effect when dragging a component from one place to another
                />
              ) : null}
            </DragOverlay>
          </DndContext>
          <div className="add_image_wrapper">
            <FaRegImage className="add_image_icon" />
            <p className="add_image_text">Add Images</p>
          </div>
        </div>
      </div>
    </div>
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }
};

export default GalleryMainLayout;
