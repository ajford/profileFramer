import React from 'react';
import {Image} from "react-konva";
import useImage from "use-image";

export default function ImageWithPlaceholder({...props}) {
  const [placeholderImage] = useImage("/profile_placeholder_female.png")

  return (
    <Image {...props} image={props.image===null?placeholderImage:props.image}/>
  )

}
