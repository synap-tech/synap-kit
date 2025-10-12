import React from 'react';

const Wrapper: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className='w-full max-w-7xl mx-auto p-6'>
      {title && (
        <h1 className='text-3xl font-bold mb-6 text-center'>{title}</h1>
      )}
      <div className='bg-white rounded-lg shadow-sm'>{children}</div>
    </div>
  );
};

export default Wrapper;
