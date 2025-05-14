import React from 'react'
import trash from "../assets/trash2.png"


const EducationUpdateForm = ({onclose}) => {
  return (
    
         <div className='fixed inset-0 overflow-y-auto bg-white bg-opacity-70 z-50 flex items-center justify-center p-10 trasnfrom ease-in-out duration-200'>
                    <div className='w-full max-w-[700px] mt-20  bg-white flex flex-col shadow rounded-xl px-10 py-5 ' >
                        
                        <div className="flex justify-between w-full mt-3">
                            <h3 className='text-lg font-semibold'>Education</h3>
                            <p onClick={onclose} className='text-lg font-semibold cursor-pointer transform ease-in-out duration-200 hover:scale-95'>X</p>
                        </div>
        
                        <div className="flex gap-4 mt-7 mb-5 overflow-x-auto hide-scrollbar transform ease-linear duration-150 snap-x snap-mandatory">
                            <div className="flex-shrink-0 w-32 h-8 px-3 py-1.5 text-sm hover:text-white bg-gray-500/20 rounded snap-start hover:bg-[#2c6472] transform ease-in-out duration-200">UIUX Designer</div>
                        </div>
        
                        <div className="form-fields flex flex-col gap-4">
                            <div className="flex flex-col w-full gap-4">
                                <label htmlFor="jobtitle" className='text-[15px] text-gray-500'>Degree Title</label>
                                <input type="text" className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                            </div>
        
        
                            <div className='flex gap-4'>
                                <div className="flex flex-col w-1/2 gap-3">
                                    <label htmlFor="jobtitle" className='text-[15px] text-gray-500' >Institution Name</label>
                                    <input type="text" className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                                </div>
        
                                <div className="flex flex-col w-1/2 gap-3">
                                    <label htmlFor="jobtitle" className='text-[15px] text-gray-500' >Field of Study</label>
                                    <input type="text" className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                                </div>
                            </div>
        
                            <div className='flex gap-4'>
                                <div className="flex flex-col w-1/2 gap-3">
                                    <label htmlFor="jobtitle" className='text-[15px] text-gray-500' >Start Date</label>
                                    <input type="text" className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                                </div>
        
                                <div className="flex flex-col w-1/2 gap-3">
                                    <label htmlFor="jobtitle" className='text-[15px] text-gray-500'>End Date</label>
                                    <input type="text" className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                                </div>
                            </div>

                           <div className="flex flex-col w-full gap-4">
                                <label htmlFor="jobtitle" className='text-[15px] text-gray-500'>Achivements</label>
                                <textarea  className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                            </div>
        
                            <div className="flex justify-between w-full mt-2">
                                <button className='text-sm text-[#2c6472] font-medium hover:scale-95 transform ease-in-out duration-200'>+ Add Education</button>
                                <button className='text-sm flex text-red-500 font-medium hover:scale-95 transform ease-in-out duration-200 '> <img src={trash} alt="trash icon" className="w-4 h-3.5 mt-0.5 text-red-500 me-1 object-contain " />
                                    Remove</button>
                            </div>
        
                            <div className='flex justify-center items-center gap-4 mt-3'>
                                <button className='bg-[#2c6472] w-32 text-sm text-white px-2 py-2 rounded-xl'>Save Changes</button>
                            </div>
        
                        </div>
                    </div>
        
                </div>
      
  )
}

export default EducationUpdateForm
