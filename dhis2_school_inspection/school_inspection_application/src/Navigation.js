import { Menu, MenuDivider, MenuItem, MenuSectionHeader } from "@dhis2/ui";
import React from "react";
import "./css/common.css";
import Dashboard from "./icons/Dashboard.svg";
import log from "./icons/LOG.svg";
import create from "./icons/New Copy.svg";
import school from "./icons/School.svg";

const plussIcon =() => ( 

<svg viewBox="0 0 20 20" className="outlined" xmlns="http://www.w3.org/2000/svg">
<path  fill="#6E7A8A" d="M11 5H9V9H5V11H9V15H11V11H15V9H11V5ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" className="outlined"/>
</svg>
)

const createNewInspectionIcon =() => ( 
  <svg width="20" height="20" viewBox="0 0 20 20" className="outlined" xmlns="http://www.w3.org/2000/svg">
    <path fill="url(#a)" d="M0 0h20v20H0z"/>
    <defs>
      <pattern id="a" width="1" height="1" patternContentUnits="objectBoundingBox">
        <use href="#b" transform="scale(.01)"/>
      </pattern>
      <image id="b" width="20" height="20" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE6UlEQVR4nO2bS48WRRSGH4YIBj4TiELCBnGprhwUjQFWuiIxQkzcuBXR2aqQGEUCJmwgwG8wUS7CAvgPhh14wcRw0Y2AwkLGjJ8a2pykxrSVaqa//qr71O1NKuEyXf3Webqq65yugaKioqKiouFVRdb+Ad4iYWkHuCpQ4gdSpTxTtANbFSgPBxKqqlxmSuxAqtSgxArkb8ff3yQBxQrkDQeUJGZKrEBIFUrMQJKEEjuQ5KCkACQpKKkASQZKSkCSgJIakOihpAgkaiipAokWSspAooSSOpDooOQAJCoouQCJBkpOQKKAkhuQ4KHkCCRoKLkCCRZKzkCChBIrkKrnpgalAKERisycAiSQGaK2YqgbaKkCJFNV2g+ouoHApB4PdQOBST0e6gYCk3o81A0EJvV4qBsITOrxUDcQmNTjoW4gMKnHo6sBrUSt6jnjLkAoQMoMeYjKDKHMkLCeiMCkHg91A4FJPR7qBgKTejzUDQQm9XioGwhM6vFQNxCY1OOhbiAwqcdD3UBgUo9HqWX9XwUIJVP38kRoV2+rUu0tQAaR+poZmNTjoW4gMKnHQ93AgJoBtgD7gDPAFeAeMDbtriMecs2gygHIBuAQ8HOHzcCPwAfAuqHMpgxkLXAcWPCwS/sTOAys7tt0qkB2Abd72D7LLHutT+OpAVluZkVTQH8HvgDeBl4wS9Ejpq0z75jdwJfA/YY+HgAHgGV9DCAlII8CZxuC+Avw3oRLjvzsHHCroc+TwIpQgGhn1K6Zca5h7d8PjOiukZkRY0f/n/ueKakAOe7oS57sl/GnrQ3vpc883iMJILsc/XwLbGxx7WbgInABmG3x808C3znutwNPih3IWsdTe6slDNEPteuutrxGoNyx7vnTlMvif/K1ZGjphOOdMcky9aB2rfy5rbY53ilHyBzIBkfSJy/wocb/kXXtH8DjE/bh1ZC2Djm2tqMBx78SuG5dv3fCPrwa0tSMWbfr3iXPGHr871jX35x2GxwrkC2ODHy1wvhHjoz+2Q79eDOkpX2WbymHaI3/pNWHZPfZATlj+ZbalNb47WVLAGUH5BvLtyxhWuN/yerjUsd+vBnS0G+W7yccGfhVx/imbd87Mvr11s/cyBHI2PJtV10v9gBjsZ13bH/r/z+fI5D5JYBcUAQi1YLsgNxYYsmaNcuLbxhSWHxuiSXr1xyBXAr4pS6nWbIDcsryLZ9dtca/x+rjdMd+vBnS0JzlW76Ba43/tNXHhx378WZIQ89Yvu8rlk7sDcbzHfrxZkhLyxwv9jmF8b/rKC7O5AhE9L7jS+FjDDf+lQZA/fqDE/bh1ZC21jgqrZ8OOP5PrGsXzEezbIFgjnfW/Y/N6ZC+P+FuB/6y7n0MD4odyCrgmjWG2+YgQhvV612SSLbRJpP82culzFhyByJ6xXrSFzPqNlBmTSnkvCMDd+kpRwVA7v06nlQl3O6Y0yG+tN0xM6Qd9XgP9aBVPbexOR0yzRlc2U193HCU9CtzjNWbqkzadfNlb5JTKSOTZ9hb2zoMgeVVVWZt3nxilfrTi6ZSu8K09ebf9phamZ2B198ZR33PjNT1qmP35aPJbmqn9uBi1SqTpzT94s0kbcHkGV62trlrjSmz2KcM27SbphwydQZehFNPmxOOUq7/2gRczuQu/lr0ZVNOlxK6VG07FQr/BT3opSEeYs9NAAAAAElFTkSuQmCC"/>
    </defs>
  </svg>

)

export function Navigation(props) {
      return (
              <div> 
                  <Menu>
                      <MenuSectionHeader
                        label="Main Menu"
                        className="menu-header"
                      >
                      <style jsx>{`
                                  .menu-header {
                                    padding-left: 800px;
                                  }
                                `}</style>
                      </MenuSectionHeader>
                    <MenuDivider style={{ padding: "10px", color: "red" }} />
                    <MenuItem
                    icon={<img src={create} alt="create" className="icons" />}
                    label="Create an inspection"
                    active={props.activePage === "Create an event"}
                    onClick={() => {
                        props.activePageHandler("Create an event");
                      
                    }}
                    />
                    <MenuItem
                      icon={<img src={log} alt="log" className="icons" />}
                      label="Inspections log"
                      active={props.activePage === "Inspections log"}
                      onClick={() => {
                          props.activePageHandler("Inspections log");
                    
                      }}
                    />
                    <MenuItem
                      icon={<img src={Dashboard} alt="Dashboard" className="icons" />}
                      label="Dashboard"
                      active={props.activePage === "Dashboard"}
                      onClick={() => {
                          props.activePageHandler("Dashboard");
                
                      }}
                    />
                    <MenuItem
                      icon={<img src={school} alt="navigate to creating a new school page" className="icons" />}
                      label="Create a new school"
                      active={props.activePage == "Create a new school"}
                      onClick={() => props.activePageHandler("Create a new school")}
                    />
                          </Menu>
    </div>
  
  );
}
