import React, {useState} from 'react'
import trash from "../assets/trash2.png"


const CertificatesUpdateForm = ({ onclose }) => {
      const [certificateFile, setCertificateFile] = useState(null);

        const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateFile(file); // ✅ Save raw file directly
    }
  };
    


    return (
        <div className='fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center trasnfrom ease-in-out duration-200'>
            <div className='w-[700px] h-[570px] bg-white flex flex-col shadow rounded-xl px-10 py-5 ' >

                <div className="flex justify-between w-full mt-3">
                    <h3 className='text-lg font-semibold'>Certificates & Courses</h3>
                    <p onClick={onclose} className='text-lg font-semibold cursor-pointer transform ease-in-out duration-200 hover:scale-95'>X</p>
                </div>

                <div className="flex gap-4 mt-7 mb-5 overflow-x-auto hide-scrollbar transform ease-linear duration-150 snap-x snap-mandatory">
                    <div className="flex-shrink-0  h-8 px-3 py-1.5 text-sm hover:text-white bg-gray-500/20 rounded snap-start hover:bg-[#2c6472] transform ease-in-out duration-200">Accenture Ui/Ux Design Course</div>
                    <div className="flex-shrink-0  h-8 px-3 py-1.5 text-sm hover:text-white bg-gray-500/20 rounded snap-start hover:bg-[#2c6472] transform ease-in-out duration-200">Accenture Ui/Ux Design Course</div>



                </div>

                <div className="form-fields flex flex-col gap-4">
                    <div className="flex flex-col w-full gap-4">
                        <label htmlFor="jobtitle" className='text-[15px] text-gray-500'>Certificate Name</label>
                        <input type="text" className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                    </div>


                    <div className='flex gap-4'>
                        <div className="flex flex-col w-full gap-3">
                            <label htmlFor="jobtitle" className='text-[15px] text-gray-500' >Company Name</label>
                            <div className="border h-16 rounded outline-none border-gray-500/30 text-center">
                                <input
                                    type="file"
                                    id="certificateUpload"
                                    onChange={handleFileChange}
                                    className="hidden "
                                />
                                {/* {certificateFile &&  ? ( */}
                                <label htmlFor="certificateUpload" className="cursor-pointer flex mt-5 flex-col items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="gray"
                                        opacity={0.5}
                                        viewBox="0 0 24 24"
                                        width="25"
                                        height="25"
                                        className="-mt-1"
                                    >
                                        <path d="M16 16h-2v-4h-4v4H8l4 4 4-4z" />
                                        <path d="M18.944 10.112a6.5 6.5 0 00-12.671-1.098A5.502 5.502 0 007 20h11a5 5 0 00.944-9.888zM18 18H7a3.5 3.5 0 010-7h.5l.1-.4a4.5 4.5 0 018.7 1.2l.2.9H18a3 3 0 010 6z" />
                                    </svg>
                                    <p className="text-xs text-gray-500 text-center">
                                        {certificateFile ? certificateFile.name : ''}
                                    </p>
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className='flex gap-4'>
                        <div className="flex flex-col w-full gap-3">
                            <label htmlFor="jobtitle" className='text-[15px] text-gray-500' >Certificate Number</label>
                            <input type="text" className='border border-gray-500/30 px-4 py-2 rounded outline-none' />
                        </div>

                   
                    </div>

                    <div className="flex justify-between w-full mt-2">
                        <button className='text-sm text-[#2c6472] font-medium hover:scale-95 transform ease-in-out duration-200'>+ Add Certificate</button>
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

export default CertificatesUpdateForm
