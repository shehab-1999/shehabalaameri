// WeekDayInput.tsx
"use client"
import { formatArabicTime } from '@/app/util/dateFormat';
import React from 'react';
import { Controller } from 'react-hook-form';

interface WeekWork {
  day: string;
  startTime: string;
  endTime: string;
}

interface WeekDayInputProps {
  day: string;
  fields: WeekWork[];
  append: (value: WeekWork) => void;
  remove: (index: number) => void;
  control: any; // يجب تعديل هذا النوع حسب الهيكل الخاص بك
}

const WeekDayInput: React.FC<WeekDayInputProps> = ({
  day,
  fields,
  append,
  remove,
  control,
}) => {
  const index = fields.findIndex((work) => work.day === day);

  return (
    <div className="flex items-center p-2 h-[30px] hover:bg-gray-100">
      <input
        type="checkbox"
        className="mr-2"
        checked={index > -1}
        onChange={(e) => {
          if (e.target.checked) {
            append({ day, startTime: "", endTime: "" });
          } else if (index > -1) {
            remove(index);
          }
        }}
      />
      <label>{day}</label>
      {index > -1 && (
        <>
          <Controller
            name={`weekwork.${index}.startTime`}
            control={control}
            render={({ field }) => (
              <input
                type="time"
                className="ml-2 p-[10px] h-[20px] text-black"
                {...field}
              />
            )}
          />
          إلى
          <Controller
            name={`weekwork.${index}.endTime`}
            control={control}
            render={({ field }) => (
              <input
                type="time"
                className="ml-2 p-[10px] h-[20px] text-black"
                {...field}
              />
            )}
          />
        </>
      )}
    </div>
  );
};

export default WeekDayInput;