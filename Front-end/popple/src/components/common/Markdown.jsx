import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';

export default function Markdown(props){
  return(
    <MDEditor 
    className='w-auto h-auto'
    value={props.content}
    onChange={props.contentChange}
    />
  )
}