/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState } from "react";
import Books from "./Books";
import AddBook from "../components/forms/AddBook";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
export default function Home() {

  return (
    <React.Fragment>

      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>Available books</Tab>
          <Tab>Add books</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          <Books/>
          </TabPanel>
          <TabPanel>
          <AddBook/>
          </TabPanel>
        </TabPanels>
      </Tabs>
   </React.Fragment>


    
  )};

