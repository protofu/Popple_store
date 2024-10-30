import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';

export default function Markdown(props){
  return(
    <MDEditor 
    className='w-full h-full'
    value={props.content}
    onChange={props.contentChange}
    />
  )
}