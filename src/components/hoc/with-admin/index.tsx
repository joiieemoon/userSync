import Button from "../../common/button";
import { useState } from "react";

const withAdminAccess = (WrappedComponent: React.ComponentType) => {
  return (props) => {
    const [clickCount, setClickCount] = useState(0);
    const [normalCount, setnormalCount] = useState(0);
    const [canClick, setCanClick] = useState(true);

    const handleclick = () => {
      setnormalCount((prev) => prev + 1);
    };

    const handleThrottleClick = () => {
      if (!canClick) return;

      setClickCount((prev) => prev + 1);
      setCanClick(false);

      setTimeout(() => {
        setCanClick(true);
      }, 1000);
    };

    const isAdmin = "admin";

    return (
      <>
        <WrappedComponent {...props} />



        {isAdmin && (
          <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-xl shadow-lg">
            <h4 className="font-bold  ">Admin Controls</h4>

            <p className="mt-2  px-3 py-1 rounded bg-red-500">this is admin access only</p>

            <div className="flex w-full justify-evenly mt-3 m-3">
              <Button
                label={`Normal Clicks: ${normalCount}`}
                variant="secondary"
                onClick={handleclick}
              />
              <Button
                label={`Throttle Clicks: ${clickCount}`}
                variant="secondary"
                onClick={handleThrottleClick}
                disabled={!canClick}
              />
            </div>
          </div>
        )}
      </>
    );
  };
};

export default withAdminAccess;
