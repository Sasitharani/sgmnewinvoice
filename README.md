# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## start from adding address to the database

## Currently waiting for simple application to practice model 


## column names in database
  InvoiceNo INT,
  CompanyName CHAR(255),
  Date CHAR(10),
  Gst CHAR(15),
  DoorNo CHAR(50),
  Street1 CHAR(255),
  Street2 CHAR(255),
  Town CHAR(255),
  City CHAR(255),
  State CHAR(255),
  Pincode CHAR(10),
  Quantity CHAR(50),
  Rate CHAR(50),
  Amount CHAR(50),
  AmountWords CHAR(255)

## the entry point InvoiceEntry.jsx -->all values store in -->invoiceSlice.js



  21-11-2024
  not able to save the data i guess some data is missing
  so start with create a sweet alert showing all the values that will be entered in the database
  if required save it in a slice and retrive vlaue from there while inserting into the database

  the adress modal must sent the value to slice details


  #To Do
  check addItemRow i dont think so it is correct it is using array which we dont want now

25-11-2024
  #Company details in addressAddmodal 
   Date,CompanyName,  Gst, DoorNo, Street1, Street2, Town, City, State, Pincode,
   !!!!!!!!!!!!----------Data adding Sucessfully-----------!!!!!!!!!!!!
   --->TOmmoroow Inserting Item in database from running git in Render 
   ---->slice the value of itemName-----------DONE
   ---->these details needs to be shown in address modal-----------DONE
   ---->there is also amountInWords in Database which needs to be inserted----------DOne
   ---->When empty data is entered it throws error handle it---Yet to do




23-11-2024
  ----->Ctax and Stax not entering into database(C and S is  not capitalised which was fixed)
  ----->No need to Display Company details only name of Company to be Displayed ------------------Done
  --------->
   ---->Data is not selected properly ---- DOne
   ---->When empty data is entered it throws error handle it---Yet to do
   ---->Company Modal Opening CLosing displaying data--->Done
   ---->Company Name not entered into the database---->Done
   -------------->Problem is either is slice/state
   -------------->Resolved-In slice it was name and in selector it was companyName which was changed


   --------------------------------------------Next---------------------------------------------------------------------
    Company Model should be viewed

    
   --------------------------------------------27-11-2024---------------------------------------------------------------------
    1)Company Model should be viewed----Done
    2)Make design Changes


   --------------------------------------------29-11-2024---------------------------------------------------------------------

    Start with the writing a query for update in the server.js
    Design edit more---->Done
    Show loading until the database is displayed

   --------------------------------------------02-12-2024---------------------------------------------------------------------
   Update design
   Print Invoice-a new file is create as PrintInvoice values from slice not fetched properly-Instead of slice pick value from databse