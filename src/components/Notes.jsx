import React from 'react'
import { Link } from 'react-router-dom'
import Form from "./Form";

const Notes = () => {
  return (
   <>
   <div>
<a href="/" class=" mx-auto block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Notes</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
<Link to='/' className='text-blue' />Back
</a>
</div>
</>

  )
}

export default Notes;
