import React from 'react';
import {Image} from "react-bootstrap";

export default function PreviewImage(
  {stageRef, ...props}
) {

  let imgSrc = stageRef.current?.toDataURL();

  return (
    <Image {...props} src={imgSrc}/>
  )
}
