import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Login from '../../Components/Modal/Login/Login';
import Sell from '../../Components/Modal/Sell/Sell';
import Card from '../../Components/Card/Card';
import { ItemContext } from '../../Context/item';
import { fetchFromFireStore } from '../../utils/firebase';
const Home = () => {

  const [openModal,setModal]=useState(false);
  const [openSellModal,setopenSellModal]=useState(false);
  const toggleModal=()=>{
    setModal(!openModal);
  }
  const toggleSellModal=()=>{
    setopenSellModal(!openSellModal)
  }

const itemsctx=ItemContext();//item context value

useEffect(()=>{
  const getItems=async()=>{
    const datas=await fetchFromFireStore();
    itemsctx?.setItems(datas);//fetched datas from firestore
  }
getItems();
},[]);

useEffect(()=>{
console.log('updated Items:',itemsctx.items);

},[itemsctx.items]);



  return (
    <div>
      <Navbar toggleModal={toggleModal} toggleSellModal={toggleSellModal}/>
      <Login toggleModal={toggleModal} status={openModal} />
      <Sell setItems={(itemsctx).setItems} toggleSellModal={toggleSellModal} status={openSellModal}/>
      <Card items={(itemsctx).items || []}/>
    
    </div>
  )
}

export default Home
