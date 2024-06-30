import React, { useEffect, useState } from 'react';
import RenderList from './RenderList';
import axios from 'axios';

const List: React.FC = () => {

  const userInfo=JSON.parse(localStorage.getItem('userInfo'))
  
  const userId=userInfo?.user?.id||userInfo?.userId
  console.log(userId)

    return (
        <RenderList userId={userId}/>
      );
}

export default List;