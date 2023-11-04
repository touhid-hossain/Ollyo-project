import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ForwardPhoto from "../Photo/Photo";

const GalleryMainGridLayout = (props) => {
  // console.log(props)
  const sortable = useSortable({ id: props.id });
  const {
    attributes,
    listeners,
    // isDragging,
    setNodeRef,
    transform,
    transition,
  } = sortable;
  // console.log(sortable)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ForwardPhoto
      ref={setNodeRef}
      style={style}
      {...props}
      attributes={attributes}
      listeners={listeners}
    />
  );
};
export default GalleryMainGridLayout;
