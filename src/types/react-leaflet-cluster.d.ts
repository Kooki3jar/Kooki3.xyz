declare module 'react-leaflet-cluster' {
  import { FC, PropsWithChildren } from 'react';
  
  interface MarkerClusterGroupProps {
    chunkedLoading?: boolean;
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    zoomToBoundsOnClick?: boolean;
    removeOutsideVisibleBounds?: boolean;
    animate?: boolean;
    maxClusterRadius?: number;
  }

  const MarkerClusterGroup: FC<PropsWithChildren<MarkerClusterGroupProps>>;
  export default MarkerClusterGroup;
}