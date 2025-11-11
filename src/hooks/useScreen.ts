import { useMediaQuery } from '@uidotdev/usehooks';

function useScreen() {
  const isMobile = useMediaQuery('only screen and (max-width : 768px)');
  const isTablet = useMediaQuery('only screen and (max-width : 1024px)');
  const isLaptop = useMediaQuery('only screen and (max-width : 1366px)');
  const isDesktop = useMediaQuery('only screen and (min-width : 1520px)');

  return { isMobile, isTablet, isLaptop, isDesktop };
}

export default useScreen;
