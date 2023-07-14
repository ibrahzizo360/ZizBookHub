/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState } from "react";
import Books from "./Books";
import AddBook from "../components/forms/AddBook";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
export default function Home() {

  return (
    <React.Fragment>

      <Tabs isFitted variant='unstyled'>
        <TabList mb='1em'>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Available books</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Add books</Tab>
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

