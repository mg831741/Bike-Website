// ScrollTop.jsx

import { useState, useEffect } from "react";

function ScrollTop() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const toggleVisible = () => {

      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }

    };

    window.addEventListener("scroll", toggleVisible);

    return () =>
      window.removeEventListener("scroll", toggleVisible);

  }, []);

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  return (
    <>
      {visible && (

        <button
          className="scroll-top"
          onClick={scrollToTop}
        >
          ↑
        </button>

      )}
    </>
  );
}

export default ScrollTop;