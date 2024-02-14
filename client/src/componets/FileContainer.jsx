import React from 'react'
import { MdDelete ,MdOutlineFileDownload} from "react-icons/md";
function FileContainer({fileData,deleteFileHandle,downloadFile}) {
  return (
    <>
    <div className='flex flex-col items-center bg-gray-100 m-4 p-3 h-48 w-52 gap-4'>
        <div className='w-full flex justify-between '>
        <MdDelete onClick={()=>deleteFileHandle(fileData._id)}/>
        <MdOutlineFileDownload onClick={()=>downloadFile(fileData)}/>
        </div>
        <div className=' border border-black text-center w-fit p-3 bg-white'>{fileData.mimetype}</div>
        <div className='flex flex-col text-center'>
          <span>{fileData.originalname}</span>
          <span>{fileData.size}</span>
        </div>
    </div>
    </>
  )
}

export default FileContainer