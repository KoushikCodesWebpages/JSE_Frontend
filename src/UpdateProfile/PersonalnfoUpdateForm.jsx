import React from 'react'
import trash from "../assets/trash2.png"


const PersonalnfoUpdateForm = ({ onclose }) => {
    return (
        <div className='fixed inset-0 bg-white overflow-y-auto hide-scrollbar bg-opacity-70 z-50 flex items-center justify-center trasnfrom ease-in-out duration-200'>
            <div className='w-[700px] mt-20  bg-white flex flex-col shadow rounded-xl px-10 py-5 ' >

                <div className="flex justify-between w-full mt-3">
                    <h3 className='text-lg font-semibold'>Personal Information</h3>
                    <p onClick={onclose} className='text-lg font-semibold cursor-pointer transform ease-in-out duration-200 hover:scale-95'>X</p>
                </div>



                <div className="form-fields flex flex-col gap-4 mt-5">
                    <div className="flex flex-col w-full gap-3">
                        <label htmlFor="jobtitle" className='text-[15px] text-gray-500'>Full Name</label>
                        <input type="text" className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <label htmlFor="jobtitle" className='text-[15px] text-gray-500'>Email</label>
                        <input type="email" className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <label htmlFor="jobtitle" className='text-[15px] text-gray-500'>Date Of Birth</label>
                        <input type="date" className='border border-gray-500/30 px-4 py-2 text-gray-500 rounded outline-none' />
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <label htmlFor="jobtitle" className='text-[15px] text-gray-500'>Current Address</label>
                        <input type="text" className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        <label htmlFor="jobtitle" className='text-[15px] text-gray-500'>Linkedin Profile</label>
                        <input type="text" className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                    </div>


                    <div className="flex justify-end w-full mt-2">
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

export default PersonalnfoUpdateForm
