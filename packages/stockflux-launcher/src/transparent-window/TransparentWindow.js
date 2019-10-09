import React, { useState, useCallback, useEffect } from 'react';
import useChildWindow from '../search-results/helpers/useChildWindow';

export default ({
  htmlfile = 'transparent-window.html',
  children,
  position = { left: 100, top: 100 },
  size = { width: 300, height: 300 },
  display
}) => {
  const TRANSPARENT_WINDOW_NAME = 'transparent_window';
  const TRANSPARENT_CSS_PATCH = 'transparentWindow.css';

  const windowStatus = {
    show: 'SHOW',
    showing: 'SHOWING',
    hiding: 'HIDING',
    hide: 'HIDE',
    hidden: 'HIDDEN'
  };

  const childWindow = useChildWindow(
    TRANSPARENT_WINDOW_NAME,
    document,
    TRANSPARENT_CSS_PATCH
  );

  const { window, launch } = childWindow;

  const launchChildWindow = useCallback(
    () =>
      launch({
        name: TRANSPARENT_WINDOW_NAME,
        waitForPageLoad: true,
        opacity: 0.0,
        autoShow: false,
        showTaskbarIcon: false,
        defaultHeight: size.height,
        defaultWidth: size.width,
        url: htmlfile,
        frame: false,
        resizable: false,
        alwaysOnTop: true
      }),
    [launch]
  );

  const [popupStatus, setPopupStatus] = useState('');

  const showWindow = () => {
    if (window) {
      setPopupStatus(windowStatus.showing);
      window.show().then(() => {
        setPopupStatus(windowStatus.show);
        window.animate(
          { opacity: { opacity: 0.7, duration: 500 } },
          { tween: 'ease-in-out', interrupt: true }
        );
      });
    }
  };

  const hideWindow = () => {
    if (window) {
      setPopupStatus(windowStatus.hiding);
      window
        .animate(
          { opacity: { opacity: 0.0, duration: 500 } },
          { tween: 'ease-in-out', interrupt: true }
        )
        .then(() => setPopupStatus(windowStatus.hide));
    }
  };

  useEffect(() => {
    if (popupStatus === windowStatus.hide && display === false) {
      window.hide();
      setPopupStatus(windowStatus.hidden);
    }
  }, [popupStatus, window]);

  useEffect(() => {
    if (display) {
      !window && launchChildWindow();
      showWindow();
    } else {
      hideWindow();
    }
  }, [display, window]);

  useEffect(() => {
    window &&
      window.moveTo(position.left, position.top, { moveindependently: true });
  }, [position, window]);

  useEffect(() => {
    window &&
      window.resizeTo(size.width, size.height, 'top-left', {
        moveindependently: true
      });
  }, [size, window]);

  return <>{children}</>;
};
