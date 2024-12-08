
import React from 'react';
// Import other shared components as needed

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main>{children}</main>
      {/* Include Footer or other components here */}
    </>
  );
};

export default Layout;