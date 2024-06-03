import React from 'react'

const FormField = ({labelName, placeholder, inputType, isTextArea, value, handleChange }) => {
  return (
    <label className="flex-1 w-fll flex flex-col" htmlFor="">
        {labelName && (
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-neutral-600 mb-[10px]">{labelName}</span>
        )}
        {isTextArea ? (
            <textarea 
            required
            value={value}
            onChange={handleChange}
            rows={10}
            placeholder={placeholder}
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-pink-200 bg-transparent font-epilogue text-[14px] text-black placeholder:text-neutral-600 rounded-[10px] sm:min-w-[300px]"
            />

        ) : (
            <input 
            required
            value={value}
            onChange={handleChange}
            type={inputType} 
            step='0.1'
            placeholder={placeholder}
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-pink-200 bg-transparent font-epilogue text-[14px] text-black placeholder:text-neutral-600 rounded-[10px] sm:min-w-[300px]"
            />
        ) }
    </label>
  )
}

export default FormField
