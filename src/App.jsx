import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'; 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div class="relative flex min-h-screen flex-col overflow-hidden bg-gray-50 py-6 sm:py-12">
  <div class="grid grid-cols-8 border-2 justify-center items-center">
    <div class="col-span-8">
      <div class="my-center my-border">
      <img src="https://www.datwebdigital.com/DWD/wp-content/uploads/2012/06/logo-design.jpg" alt="Logo" width="80" height="80"/>
      </div>
      <div class="my-center my-border">
      <img src="https://www.datwebdigital.com/DWD/wp-content/uploads/2012/06/logo-design.jpg" alt="Logo" width="80" height="80"/>
      </div>
      <div class="grid grid-cols-7 my-border my-center">
        Inv

      </div>
      <div class="grid grid-cols-7 border-2">
        <div class="col-span-5 my-border">Address</div>
        <div class="col-span-2 my-border">G</div>
      </div>
      <div class="grid grid-cols-7 border-2">
        <div class="col-span-5 my-border">Address-1</div>
        <div class="grid grid-cols-2">
          <div class="my-border my-center">d</div>
          <div class="my-border my-center">f</div>
        </div>
      </div>
      <div class="grid grid-cols-7 border-2">
        <div class="col-span-5 my-border">Address-2</div>
        <div class="grid grid-cols-2">
         
        </div>
      </div>
      <div class="grid grid-cols-7 border-2">
        <div class="col-span-5 my-border">Address-3</div>
        <div class="grid grid-cols-2">
          <div class="my-border my-center">d</div>
          <div class="my-border my-center">f</div>
        </div>
      </div>
      <div class="grid grid-cols-7 border-2">
        <div class="col-span-5 my-border">Address-4</div>
    
      </div>
      <div class="grid grid-cols-7 border-2">
        <div class="col-span-5 my-border">Address-5</div>
      </div>
      <div class="grid grid-cols-9 border-2 gap-y-0">
        <div class="my-border my-center">S.No</div>
        <div class="my-border my-center col-span-3 ">Description</div>
        <div class="my-border my-center">Pack</div>
        <div class="my-border my-center">HSN</div>
        <div class="my-border my-center">Qty</div>
        <div class="my-border my-center">Rate</div>
        <div class="my-border my-center">Amount</div>
      </div>
      <div class="grid grid-cols-9 border-2 gap-0 gap-y-0 h-8">
        <div class="my-border my-center"></div>
        <div class="my-border my-center col-span-3 "></div>
        <div class="my-border my-center"></div>
        <div class="my-border my-center"></div>
        <div class="my-border my-center"></div>
        <div class="my-border my-center"></div>
        <div class="my-border my-center"></div>
      </div>
       <div class="grid grid-cols-9 border-2 gap-0 gap-y-0 h-8">
        <div class="border my-center"></div>
        <div class="border my-center col-span-3 "></div>
        <div class="border my-center"></div>
        <div class="border my-center"></div>
        <div class="border my-center"></div>
        <div class="border my-center"></div>
        <div class="border my-center"></div>
      </div>
      
      

    </div>
  </div>
</div>
    </>
  )
}

export default App
