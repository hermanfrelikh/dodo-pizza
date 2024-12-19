import React from "react"
import ContentLoader from "react-content-loader"

const ItemSkeleton = (props) => (
  <div className="pizza-block-wrapper">
  <ContentLoader 
  
  className="pizza-block"
    speed={2}
    width={260}
    height={480}
    viewBox="0 0 260 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    
    <circle cx="130" cy="125" r="125" /> 
    <rect x="0" y="275" rx="10" ry="10" width="260" height="30" /> 
    <rect x="0" y="330" rx="10" ry="10" width="260" height="88" /> 
    <rect x="55" y="468" rx="0" ry="0" width="0" height="1" /> 
    <rect x="0" y="445" rx="10" ry="10" width="95" height="30" /> 
    <rect x="130" y="439" rx="20" ry="20" width="130" height="42" />
    
  </ContentLoader>
  </div>
)

export default ItemSkeleton