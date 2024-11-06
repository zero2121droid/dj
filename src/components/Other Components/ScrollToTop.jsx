import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to the top of the page
  }, [pathname]);  // Trigger when the path changes

  return null;
};
export default ScrollToTop