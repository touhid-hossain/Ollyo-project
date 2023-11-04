import React, { useState } from "react";
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

const GalleryMainLayout = () => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Enable sort function when dragging 10px   💡 here!!!
    },
  });

  const [items, setItems] = useState(galleryImages);
  const sensors = useSensors(mouseSensor);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const activeURL = items.find((photo) => photo.id === activeId)?.url;

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

  const deleteSelectedImages = () => {
    setItems(items.filter((photo) => !selectedItems.includes(photo.id)));
    setSelectedItems([]);
  };

  return (
    <div className="container">
      <div className="gallery_wrapper">
        {/* Gallery__Header -- Part */}
        <GalleryHeader
          deleteSelectedImages={deleteSelectedImages}
          selectedItems={selectedItems}
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
    // console.log(e);
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
