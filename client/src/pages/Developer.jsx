import React from 'react'

const Developer = ({ userId }) => {
  return (
    <div className='flex justify-center items-center gap-10 w-full max-w-[1200px] mt-10'>
        {/* Content */}
        <div className="w-5/6 p-5 flex flex-col justify-center overflow-y-auto">
            <p>{userId}</p>
            <p>Welcome Developer, you can manage everything!</p>
        </div>
    </div>
  )
}

export default Developer